import { useMutation } from "@tanstack/react-query"
import { useHttpClient } from "./axios"

interface PublishResponse {
  published: boolean
  publishedAt: string
}

// Absolute URL, so axios skips the API Gateway baseURL but still attaches the Cognito token.
const PUBLISH_URL = `${import.meta.env.VITE_PORTFOLIO_URL}/api/revalidate`

export const usePublishPortfolio = () => {
  const apiClient = useHttpClient()
  return useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.post<PublishResponse>(PUBLISH_URL)
      return data
    },
  })
}
