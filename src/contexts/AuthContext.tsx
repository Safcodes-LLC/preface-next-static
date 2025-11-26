'use client'

import { UserData, getAuthToken, getCurrentUser } from '@/services/authService'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

type AuthContextType = {
  isAuthenticated: boolean
  user: UserData | null
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  isLoading: true,
})

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = () => {
      let token = getAuthToken()
      const userData = getCurrentUser()

      // If token is missing but a backup exists, restore it (defensive fix for unexpected clears)
      if (typeof window !== 'undefined' && !token) {
        try {
          const backup = localStorage.getItem('authToken_backup')
          if (backup) {
            localStorage.setItem('authToken', backup)
            token = backup
            try {
              const se = new StorageEvent('storage', { key: 'authToken' })
              window.dispatchEvent(se)
            } catch (_) {}
          }
        } catch (_) {}
      }

      // Update the auth state
      setUser(userData || null)

      // Check if we're on an auth page and user is logged in
      const isAuthPage = ['/login', '/signup'].includes(pathname)
      if (token && isAuthPage) {
        // Only redirect if we're on an auth page and have a valid token
        router.push('/')
        return // Prevent further execution
      }

      setIsLoading(false)
    }

    checkAuth()

    // Listen for storage changes to handle login/logout from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'authToken' || e.key === 'user') {
        checkAuth()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [pathname, router])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

// Protected route component
export const ProtectedRoute = ({ children, lang }: { children: ReactNode; lang?: string }) => {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
      </div>
    )
  }

  return isAuthenticated ? <div dir={lang === 'ar' ? 'rtl' : 'ltr'}>{children}</div> : null
}

// Guest route component
export const GuestRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Only run this effect after initial load and when not loading
    if (isLoading) return

    // Get the token directly from localStorage to avoid stale state
    const token = getAuthToken()

    // If we have a token and we're on an auth page, redirect to home
    if (token && ['/login', '/signup'].includes(pathname)) {
      router.push('/')
    }
  }, [isAuthenticated, isLoading, router, pathname])

  if (isLoading) {
    return <div>Loading...</div> // Or your custom loading component
  }

  // Only render children if not authenticated
  return !isAuthenticated ? <>{children}</> : null
}
