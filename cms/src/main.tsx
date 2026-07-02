import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "./providers/ThemeProvider"
import App from "./App"
import "./index.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AuthProvider } from "./providers/AuthProvider"
import { NotificationProvider } from "./providers/NotificationProvider"
import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'ap-southeast-2_94l6r983j',
      userPoolClientId: 'fr9fh8mapk227dgpsc6hc966u',
      loginWith: { email: true }
    }
  }
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider>
          <AuthProvider>
            <NotificationProvider>
              <App />
            </NotificationProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
)
