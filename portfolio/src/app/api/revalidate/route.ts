import { revalidateTag } from "next/cache";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { PORTFOLIO_CACHE_TAG } from "@/data/portfolio";

const DEFAULT_ALLOWED_ORIGINS = ["https://cms.frankji.com"];

const allowedOrigins = process.env.CMS_ALLOWED_ORIGINS
  ? process.env.CMS_ALLOWED_ORIGINS.split(",").map((origin) => origin.trim())
  : DEFAULT_ALLOWED_ORIGINS;

// Created lazily so a missing env var surfaces as a 500 response rather than a build failure.
let verifier: ReturnType<typeof CognitoJwtVerifier.create> | null = null;

function getVerifier() {
  const userPoolId = process.env.COGNITO_USER_POOL_ID;
  const clientId = process.env.COGNITO_CLIENT_ID;
  if (!userPoolId || !clientId) return null;

  verifier ??= CognitoJwtVerifier.create({ userPoolId, clientId, tokenUse: "access" });
  return verifier;
}

function corsHeaders(request: Request): HeadersInit {
  const origin = request.headers.get("origin");
  if (!origin || !allowedOrigins.includes(origin)) return {};

  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function jsonResponse(request: Request, status: number, body: object) {
  return Response.json(body, { status, headers: corsHeaders(request) });
}

export function OPTIONS(request: Request) {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

export async function POST(request: Request) {
  const jwtVerifier = getVerifier();
  if (!jwtVerifier) {
    console.error("Publish failed: COGNITO_USER_POOL_ID or COGNITO_CLIENT_ID is not set");
    return jsonResponse(request, 500, { msg: "Publishing is not configured" });
  }

  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) {
    return jsonResponse(request, 401, { msg: "Missing access token" });
  }

  try {
    await jwtVerifier.verify(token);
  } catch {
    return jsonResponse(request, 401, { msg: "Invalid access token" });
  }

  // expire: 0 makes the next visitor get fresh content, instead of one stale render
  // (stale-while-revalidate) that the recommended "max" profile would serve.
  revalidateTag(PORTFOLIO_CACHE_TAG, { expire: 0 });

  return jsonResponse(request, 200, { published: true, publishedAt: new Date().toISOString() });
}
