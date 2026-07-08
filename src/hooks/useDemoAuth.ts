import { useCallback, useEffect, useState } from "react"

export interface DemoUser {
  name: string
  email: string
}

/**
 * Демо-хук авторизации. Хранит пользователя в localStorage под своим namespace,
 * не обращается к реальному backend — только для демонстрации UX входа/регистрации.
 */
export function useDemoAuth(storageKey: string) {
  const key = `${storageKey}_user`
  const [user, setUser] = useState<DemoUser | null>(null)

  useEffect(() => {
    const raw = localStorage.getItem(key)
    if (raw) {
      try {
        setUser(JSON.parse(raw))
      } catch {
        localStorage.removeItem(key)
      }
    }
  }, [key])

  const login = useCallback(
    (email: string, _password: string) => {
      const name = email.split("@")[0]
      const newUser = { name: name.charAt(0).toUpperCase() + name.slice(1), email }
      localStorage.setItem(key, JSON.stringify(newUser))
      setUser(newUser)
      return newUser
    },
    [key]
  )

  const register = useCallback(
    (name: string, email: string, _password: string) => {
      const newUser = { name, email }
      localStorage.setItem(key, JSON.stringify(newUser))
      setUser(newUser)
      return newUser
    },
    [key]
  )

  const logout = useCallback(() => {
    localStorage.removeItem(key)
    setUser(null)
  }, [key])

  return { user, login, register, logout, isAuthenticated: !!user }
}
