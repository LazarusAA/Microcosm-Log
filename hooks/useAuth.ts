import { useState, useEffect } from 'react'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { User } from '@/types'

export function useAuth() {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState<User | null>(null)

  useEffect(() => {
    async function loadUserData() {
      if (user) {
        const { data, error } = await supabaseClient
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (error) {
          console.error('Error loading user data', error)
        } else if (data) {
          setUserData(data as User)
        }

        setLoading(false)
      } else {
        setUserData(null)
        setLoading(false)
      }
    }

    loadUserData()
  }, [user, supabaseClient])

  return {
    user,
    userData,
    loading,
    signIn: async (email: string, password: string) => {
      return await supabaseClient.auth.signInWithPassword({ email, password })
    },
    signUp: async (email: string, password: string) => {
      return await supabaseClient.auth.signUp({ email, password })
    },
    signOut: async () => {
      return await supabaseClient.auth.signOut()
    }
  }
} 