'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getAuthToken, getCurrentUser, UserData } from '@/services/authService';

type AuthContextType = {
  isAuthenticated: boolean;
  user: UserData | null;
  isLoading: boolean;
  login: (token: string, userData: UserData) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  isLoading: true,
  login: () => {},
  logout: async () => {},
});

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const login = (token: string, userData: UserData) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    // Trigger storage event to update other tabs
    window.dispatchEvent(new Event('storage'));
  };

  const logout = async () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    // Trigger storage event to update other tabs
    window.dispatchEvent(new Event('storage'));
    router.push('/login');
  };

  useEffect(() => {
    const checkAuth = () => {
      const token = getAuthToken();
      const userData = getCurrentUser();
      
      // Update the auth state
      const newUser = userData || null;
      setUser(newUser);
      
      // Check if we need to redirect
      const isAuthPage = ['/login', '/signup'].includes(pathname);
      
      if (token) {
        // If we have a token but no user data, something went wrong
        if (!userData) {
          localStorage.removeItem('authToken');
          setUser(null);
          setIsLoading(false);
          return;
        }
        
        // Redirect away from auth pages if logged in
        if (isAuthPage) {
          router.push('/');
          return;
        }
      } else if (!isAuthPage) {
        // Redirect to login if not on an auth page and not logged in
        router.push('/login');
        return;
      }
      
      setIsLoading(false);
    };

    checkAuth();
    
    // Listen for storage changes to handle login/logout from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'authToken' || e.key === 'user') {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [pathname, router]);

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated: !!user, 
        user, 
        isLoading, 
        login, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Protected route component - for client-side route protection
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Store the current path to redirect back after login
      const redirectPath = pathname !== '/' ? `?redirect=${encodeURIComponent(pathname)}` : '';
      router.push(`/login${redirectPath}`);
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  if (isLoading) {
    return <div>Loading...</div>; // Or your custom loading component
  }

  // Only render children if not authenticated
  return !isAuthenticated ? <>{children}</> : null;
};
