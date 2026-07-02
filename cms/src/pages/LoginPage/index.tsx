import { useCallback, type FC } from "react"
import LoginPage, { type LoginCredentials } from "./LoginPage"
import { useAuth } from "../../providers/AuthProvider"
import { useNotification } from "../../providers/NotificationProvider"

const LoginPageBuilder: FC = () => {

  const { login, continueAsGuest } = useAuth()
  const { showNotification } = useNotification()

  const handleLogin = useCallback(async (credentials: LoginCredentials) => {
    try {
      await login(credentials)
    } catch {
      showNotification("Invalid username or password", "error")
    }
  }, [login, showNotification])

  const handleContinueAsGuest = useCallback(() => {
    continueAsGuest()
  }, [continueAsGuest])

  return (
    <LoginPage
      onLogin={handleLogin}
      onContinueAsGuest={handleContinueAsGuest}
    />
  )
}

export default LoginPageBuilder
