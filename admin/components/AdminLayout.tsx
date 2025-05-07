import React, { ReactNode } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

type AdminLayoutProps = {
  children: ReactNode
  title?: string
}

const AdminLayout = ({ children, title = 'Admin Dashboard | Microcosm Log' }: AdminLayoutProps) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return (
      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-xl font-bold mb-4">Admin Access Required</h1>
        <p>You need to be logged in to access the admin area.</p>
        <Link href="/login" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded">
          Login
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      <Head>
        <title>{title}</title>
      </Head>
      
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <div className="text-xl font-bold mb-6">Admin Panel</div>
        <nav className="space-y-2">
          <Link href="/admin" className="block py-2 px-4 rounded hover:bg-gray-700">
            Dashboard
          </Link>
          <Link href="/admin/species" className="block py-2 px-4 rounded hover:bg-gray-700">
            Manage Species
          </Link>
          <Link href="/admin/users" className="block py-2 px-4 rounded hover:bg-gray-700">
            Manage Users
          </Link>
          <Link href="/admin/observations" className="block py-2 px-4 rounded hover:bg-gray-700">
            Review Observations
          </Link>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">{title}</h1>
        {children}
      </div>
    </div>
  )
}

export default AdminLayout 