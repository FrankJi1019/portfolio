import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark, faPlus, faCircleQuestion, faFloppyDisk, faRotateLeft, faCheck } from "@fortawesome/free-solid-svg-icons"
import type { UserRole } from "../providers/AuthProvider";

export const SaveNotification = ({ isVisible, onDismiss }: { isVisible: boolean; onDismiss: () => void }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onDismiss, 3000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onDismiss])

  if (!isVisible) return null

  return (
    <div className="fixed top-6 right-6 z-50 animate-[slideIn_0.3s_ease-out] flex items-center gap-2.5 px-5 py-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/30 rounded-xl shadow-lg shadow-emerald-100/50 dark:shadow-emerald-900/20">
      <span className="w-5 h-5 flex items-center justify-center rounded-full bg-emerald-500 text-white">
        <FontAwesomeIcon icon={faCheck} className="text-[9px]" />
      </span>
      <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Changes saved</span>
      <button onClick={onDismiss} className="ml-2 text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-200 transition-colors">
        <FontAwesomeIcon icon={faXmark} className="text-xs" />
      </button>
    </div>
  )
}

export const PageHeader = ({ title, description, onAdd, onRevert, onSave, isSaveDisabled, userRole }: { title: string; description?: string; onAdd?: () => void; onRevert?: () => void; onSave?: () => void; isSaveDisabled?: boolean, userRole: UserRole }) => (
  <div className="mb-10">
    <div className="flex items-center justify-between">
      <h1 className="text-[26px] font-extrabold tracking-tight text-gray-900 dark:text-white">{title}</h1>
      {userRole === 'AUTHENTICATED' && <div className="flex items-center gap-2">
        {onAdd && (
          <button onClick={onAdd} className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98]">
            <FontAwesomeIcon icon={faPlus} className="text-[10px]" />
            Add
          </button>
        )}
        {onRevert && (
          <button onClick={onRevert} className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98]">
            <FontAwesomeIcon icon={faRotateLeft} className="text-[10px]" />
            Revert
          </button>
        )}
        {onSave && (
          <button onClick={onSave} disabled={isSaveDisabled} className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-4 py-2.5 rounded-full transition-all shadow-md shadow-blue-200/40 dark:shadow-blue-900/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100">
            <FontAwesomeIcon icon={faFloppyDisk} className="text-[10px]" />
            Save
          </button>
        )}
      </div>}
    </div>
    {description && <p className="text-[13px] text-gray-400 dark:text-gray-500 mt-1.5">{description}</p>}
    <div className="mt-4 h-px bg-gradient-to-r from-blue-200 via-blue-100 to-transparent dark:from-blue-800/50 dark:via-blue-800/30 dark:to-transparent" />
  </div>
)

export const SeoHint = () => (
  <div className="flex items-center gap-3 text-xs text-amber-700 dark:text-amber-300 bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/30 rounded-2xl px-5 py-3.5 mb-8 backdrop-blur-sm">
    <span className="text-base">💡</span>
    <span>These fields are not displayed on the page — they are used for SEO and metadata only.</span>
  </div>
)

export const EntryCard = ({ children, onRemove }: { children: React.ReactNode; onRemove: () => void }) => (
  <div className="relative rounded-2xl border border-gray-200/80 dark:border-gray-700/50 bg-white dark:bg-[#1a1d24] p-6 shadow-sm hover:shadow-md dark:hover:shadow-xl dark:hover:shadow-black/10 transition-all duration-200 border-l-[3px] border-l-blue-400 dark:border-l-blue-500">
    <button
      onClick={onRemove}
      className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full text-gray-300 dark:text-gray-600 hover:text-white hover:bg-red-500 hover:shadow-lg hover:shadow-red-200/50 dark:hover:shadow-red-900/20 transition-all duration-150 hover:scale-110"
      title="Remove"
    >
      <FontAwesomeIcon icon={faXmark} className="text-xs" />
    </button>
    {children}
  </div>
)

export const Tooltip = ({ text }: { text: string }) => (
  <span className="relative group inline-flex ml-1.5">
    <span className="w-5 h-5 inline-flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-300 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
      <FontAwesomeIcon icon={faCircleQuestion} className="text-[10px]" />
    </span>
    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-xl">
      {text}
      <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45"></span>
    </span>
  </span>
)

interface FieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  multiline?: boolean
  tall?: boolean
  hint?: string
  className?: string
  elevated?: boolean
}

export const Field = ({ label, value, onChange, multiline, tall, hint, className = "", elevated }: FieldProps) => {
  const bg = elevated
    ? "bg-white dark:bg-[#1a1d24] border-gray-200 dark:border-gray-700 shadow-sm"
    : "bg-gray-50/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
  return (
    <label className={`block ${className}`}>
      <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2 block">
        {label}
        {hint && <span className="normal-case tracking-normal font-normal text-gray-300 dark:text-gray-600 ml-1.5">— {hint}</span>}
      </span>
      {multiline ? (
        <textarea
          className={`w-full border rounded-xl px-4 py-3 text-sm resize-y dark:text-gray-100 hover:border-gray-300 dark:hover:border-gray-600 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-400 dark:focus:border-blue-500 focus:shadow-[inset_0_1px_4px_rgba(99,102,241,0.05)] transition-all placeholder:text-gray-300 dark:placeholder:text-gray-600 ${bg} ${tall ? "min-h-36" : "min-h-20"}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className={`w-full border rounded-xl px-4 py-3 text-sm dark:text-gray-100 hover:border-gray-300 dark:hover:border-gray-600 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-400 dark:focus:border-blue-500 focus:shadow-[inset_0_1px_4px_rgba(99,102,241,0.05)] transition-all placeholder:text-gray-300 dark:placeholder:text-gray-600 ${bg}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  )
}

export const Select = ({ label, value, options, onChange }: { label: string; value: string; options: { value: string; label: string }[]; onChange: (v: string) => void }) => (
  <label className="block">
    <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2 block">{label}</span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm bg-gray-50/50 dark:bg-gray-800/50 dark:text-gray-100 hover:border-gray-300 dark:hover:border-gray-600 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-400 dark:focus:border-blue-500 transition-all"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </label>
)

export const DateField = ({ label, value, onChange, className = "" }: { label: string; value: string; onChange: (v: string) => void; className?: string }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/[^\d]/g, "")
    if (raw.length > 6) raw = raw.slice(0, 6)
    if (raw.length >= 3) {
      raw = raw.slice(0, 2) + "/" + raw.slice(2)
    }
    onChange(raw)
  }

  return (
    <label className={`block ${className}`}>
      <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2 block">{label}</span>
      <input
        type="text"
        inputMode="numeric"
        placeholder="mm/yyyy"
        value={value}
        onChange={handleChange}
        maxLength={7}
        className="w-full border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm bg-gray-50/50 dark:bg-gray-800/50 dark:text-gray-100 hover:border-gray-300 dark:hover:border-gray-600 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-400 dark:focus:border-blue-500 focus:shadow-[inset_0_1px_4px_rgba(99,102,241,0.05)] transition-all placeholder:text-gray-300 dark:placeholder:text-gray-600"
      />
    </label>
  )
}

export const TagList = ({ label, items, onChange, className = "" }: { label: string; items: string[]; onChange: (items: string[]) => void; className?: string }) => {
  const [input, setInput] = useState("")

  const handleAdd = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    onChange([...items, trimmed])
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAdd()
    }
  }

  return (
    <div className={className}>
      <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2 block">{label}</span>
      <div className="flex gap-2 mb-3">
        <input
          className="flex-1 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm bg-gray-50/50 dark:bg-gray-800/50 dark:text-gray-100 hover:border-gray-300 dark:hover:border-gray-600 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-400 dark:focus:border-blue-500 transition-all placeholder:text-gray-300 dark:placeholder:text-gray-600"
          placeholder="Type and press Enter..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleAdd}
          disabled={!input.trim()}
          className="px-4 py-2.5 text-xs font-semibold bg-gradient-to-r from-blue-500 to-blue-500 text-white rounded-xl hover:from-blue-600 hover:to-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md shadow-blue-200/30 dark:shadow-blue-900/20 hover:scale-[1.02] active:scale-[0.98]"
        >
          Add
        </button>
      </div>
      {items.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {items.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 bg-white dark:bg-gray-800 text-blue-700 dark:text-blue-300 text-xs font-medium pl-3 pr-2 py-1.5 rounded-full border border-blue-200/80 dark:border-blue-700/50 shadow-sm hover:shadow-md hover:scale-[1.03] transition-all duration-150 cursor-default">
              {item}
              <button onClick={() => onChange(items.filter((_, j) => j !== i))} className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-red-500 hover:text-white text-blue-300 dark:text-blue-600 transition-all">
                <FontAwesomeIcon icon={faXmark} className="text-[8px]" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export function updateArr<T>(arr: T[], index: number, patch: Partial<T>, setter: (updated: T[]) => void) {
  const updated = [...arr]
  updated[index] = { ...updated[index], ...patch }
  setter(updated)
}
