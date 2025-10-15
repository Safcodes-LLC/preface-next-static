import { ProtectedRoute } from '@/contexts/AuthContext'
import { redirect } from 'next/navigation'

// Dynamically import with no SSR

function DashboardPage() {
  redirect('/dashboard')
  return null
}

export default function Page() {
  return (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  )
}
