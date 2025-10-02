import { createContext, useContext, useState, ReactNode } from 'react'

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (userData: User) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Try to get user from localStorage on initial load
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      return JSON.parse(savedUser)
    }

    // Default user (Kiki) - in production, user must be logged in to access
    const defaultUser = {
      id: 'default',
      firstName: 'Kiki',
      lastName: '',
      email: 'kiki@genextech.com',
    }
    localStorage.setItem('user', JSON.stringify(defaultUser))
    return defaultUser
  })

  const login = (userData: User) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const isAuthenticated = user !== null

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
