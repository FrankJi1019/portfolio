import { useCallback, type FC } from "react"
import LoginPage, { type LoginCredentials } from "./LoginPage"
import { useAuth } from "../../providers/AuthProvider"

const LoginPageBuilder: FC = () => {

  const {login, continueAsGuest} = useAuth()

  const handleLogin = useCallback(async (credentials: LoginCredentials) => {
    await login(credentials)
  }, [login])


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
