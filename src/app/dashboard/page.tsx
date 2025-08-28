import { redirect } from 'next/navigation'
import dynamic from 'next/dynamic'

// Dynamically import with no SSR
const ProtectedRoute = dynamic(
  () => import('@/contexts/AuthContext').then((mod) => mod.ProtectedRoute),
  { ssr: false }
)

function DashboardPage() {
  redirect('/dashboard/posts')
  return null
}

export default function Page() {
  return (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  )
}
