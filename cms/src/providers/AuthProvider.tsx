import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { signIn, signOut, fetchAuthSession } from "aws-amplify/auth"
import type { LoginCredentials } from "../pages/LoginPage/LoginPage"

const AUTHENTICATED = "AUTHENTICATED"
const GUEST = "GUEST"
const UNRESOLVED = "UNRESOLVED"

export const USER_ROLE = { AUTHENTICATED, GUEST, UNRESOLVED }

export type UserRole = typeof AUTHENTICATED | typeof GUEST | typeof UNRESOLVED

interface AuthContextValue {
  userRole: UserRole,
  login: (crendential: LoginCredentials) => Promise<void>,
  logout: () => void,
  continueAsGuest: () => void,
  getAccessToken: () => Promise<string | undefined>
}

const AuthContext = createContext<AuthContextValue>({
  userRole: UNRESOLVED,
  login: async () => { },
  logout: () => { },
  continueAsGuest: () => { },
  getAccessToken: () => undefined
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: {
  children: React.ReactNode
}) => {

  const [userRole, setUserRole] = useState<UserRole>(UNRESOLVED)

  const login = useCallback(async (crendential: LoginCredentials) => {
    await signIn({
      username: crendential.email,
      password: crendential.password
    })
    setUserRole(AUTHENTICATED)
  }, [setUserRole, signIn, fetchAuthSession])

  const logout = useCallback(async () => {
    await signOut()
    setUserRole(UNRESOLVED)
  }, [setUserRole, signOut])

  const continueAsGuest = useCallback(async () => {
    setUserRole(GUEST)
  }, [setUserRole])

  const getAccessToken = useCallback(async () => {
    const authSession = await fetchAuthSession()
    return authSession.tokens?.accessToken?.toString()
  }, [fetchAuthSession])

  useEffect(() => {
    (async () => {
      if (!!await getAccessToken()) {
        setUserRole(AUTHENTICATED)
      }
    })()
  }, [getAccessToken, setUserRole])

  return (
    <AuthContext value={{
      userRole, login, logout, continueAsGuest, getAccessToken
    }}>
      {children}
    </AuthContext>
  )
}