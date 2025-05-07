import React, { ReactNode, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import useUser from '@/hooks/useUser'

type LayoutProps = {
  children: ReactNode
  title?: string
}

const Layout = ({ children, title = 'Microcosm Log' }: LayoutProps) => {
  const router = useRouter()
  const { user, loading, signIn, signOut } = useUser()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [router.asPath])
  
  // Check if we're on the homepage
  const isHomePage = router.pathname === '/'
  
  // Determine if we should use the navbar or sidebar
  const shouldUseNavbar = isHomePage
  
  // Mobile menu toggle handler
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Discover the microcosm around you" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {shouldUseNavbar ? (
        // Render the top navbar for homepage
        <Navbar />
      ) : (
        // Render the sidebar for other pages
        <>
          {/* Desktop sidebar */}
          <div className="hidden md:block">
            <Sidebar 
              user={user}
              loading={loading}
              signIn={signIn}
              signOut={signOut}
            />
          </div>
          
          {/* Mobile header */}
          <div className="md:hidden flex items-center h-16 px-4 bg-white border-b border-gray-100 z-20 sticky top-0">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-500 hover:text-blue-500 hover:bg-gray-50"
            >
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="ml-4 flex-1">
              <span className="text-xl font-medium text-blue-400">Microcosm Log</span>
            </div>
            
            {/* Mobile user section */}
            <div className="ml-auto">
              {loading ? (
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
              ) : user ? (
                <button
                  onClick={() => router.push('/profile')}
                  className="flex items-center focus:outline-none"
                >
                  {user.avatar ? (
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                      {user.name.charAt(0)}
                    </div>
                  )}
                </button>
              ) : (
                <button
                  onClick={signIn}
                  className="px-3 py-1 text-sm text-blue-500 bg-white rounded-md border border-gray-200"
                >
                  Login
                </button>
              )}
            </div>
          </div>
          
          {/* Mobile sidebar overlay */}
          {isMobileMenuOpen && (
            <div 
              className="md:hidden fixed inset-0 bg-gray-600 bg-opacity-75 z-30"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>
          )}
          
          {/* Mobile sidebar */}
          <div className={`md:hidden fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-40`}>
            <Sidebar 
              user={user}
              loading={loading}
              signIn={signIn}
              signOut={signOut}
            />
          </div>
        </>
      )}
      
      {/* Main content */}
      <main 
        className={`min-h-screen transition-all duration-300 ${
          shouldUseNavbar ? '' : 'md:ml-64'
        }`}
      >
        <div className={`px-4 md:px-8 py-6 ${
          shouldUseNavbar ? 'pt-6' : 'pt-4 md:pt-8'
        }`}>
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout 