import type { FC } from "react"
import { useForm, Controller } from "react-hook-form"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRightToBracket, faUser } from "@fortawesome/free-solid-svg-icons"
import { Field } from "../../components/FormControls"

export interface LoginCredentials {
  email: string
  password: string
}

interface LoginPageProps {
  onLogin: (credentials: LoginCredentials) => Promise<void> | void
  onContinueAsGuest: () => void
}

const LoginPage: FC<LoginPageProps> = ({ onLogin, onContinueAsGuest }) => {
  const { control, handleSubmit } = useForm<LoginCredentials>({
    defaultValues: { email: "", password: "" },
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafbfc] dark:bg-[#0f1117] px-4">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 flex items-center justify-center mb-3">
            <svg width="44" height="44" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2L28.5 9V23L16 30L3.5 23V9L16 2Z" stroke="currentColor" strokeWidth="1.5" className="text-blue-500" />
              <path d="M11 10H21M11 10V22M11 16H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-blue-500" />
              <circle cx="21" cy="10" r="1.5" fill="currentColor" className="text-blue-500" />
              <circle cx="18" cy="16" r="1.5" fill="currentColor" className="text-blue-500" />
              <circle cx="11" cy="22" r="1.5" fill="currentColor" className="text-blue-500" />
            </svg>
          </div>
          <h1 className="text-[22px] font-extrabold tracking-tight text-gray-900 dark:text-white">Portfolio CMS</h1>
          <p className="text-[13px] text-gray-400 dark:text-gray-500 mt-1">Sign in to manage your content</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-gray-200/80 dark:border-gray-700/50 bg-white dark:bg-[#1a1d24] p-7 shadow-sm">
          <form onSubmit={handleSubmit(onLogin)} className="space-y-5">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Field elevated label="Username" value={field.value} onChange={field.onChange} />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <label className="block">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2 block">
                    Password
                  </span>
                  <input
                    type="password"
                    className="w-full border rounded-xl px-4 py-3 text-sm dark:text-gray-100 bg-white dark:bg-[#1a1d24] border-gray-200 dark:border-gray-700 shadow-sm hover:border-gray-300 dark:hover:border-gray-600 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-400 dark:focus:border-blue-500 focus:shadow-[inset_0_1px_4px_rgba(99,102,241,0.05)] transition-all placeholder:text-gray-300 dark:placeholder:text-gray-600"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </label>
              )}
            />

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 text-xs font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-4 py-3 rounded-full transition-all shadow-md shadow-blue-200/40 dark:shadow-blue-900/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              <FontAwesomeIcon icon={faRightToBracket} className="text-[11px]" />
              Log in
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
            <span className="text-[11px] font-medium uppercase tracking-wider text-gray-300 dark:text-gray-600">or</span>
            <div className="flex-1 h-px bg-gray-100 dark:bg-gray-800" />
          </div>

          {/* Alternate actions */}
          <div>
            <button
              type="button"
              onClick={onContinueAsGuest}
              className="w-full inline-flex items-center justify-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 px-4 py-3 rounded-full transition-all"
            >
              <FontAwesomeIcon icon={faUser} className="text-[11px] opacity-60" />
              Continue as guest
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
