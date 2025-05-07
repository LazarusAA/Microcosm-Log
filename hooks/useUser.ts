import { useState, useEffect } from 'react'

export interface User {
  name: string;
  avatar?: string;
}

export const useUser = () => {
  // For demo purposes, we'll simulate auth state
  const [user, setUser] = useState<null | User>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading auth state
    const timer = setTimeout(() => {
      setLoading(false)
      // Uncomment to simulate logged-in state
      // setUser({ name: 'Demo User', avatar: '/images/avatar-placeholder.jpg' })
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return {
    user,
    loading,
    signIn: () => setUser({ name: 'Demo User' }),
    signOut: () => setUser(null)
  }
}

export default useUser 