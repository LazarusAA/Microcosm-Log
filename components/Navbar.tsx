import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import useUser from '@/hooks/useUser'

const Navbar = () => {
  const router = useRouter()
  const { user, loading, signIn, signOut } = useUser()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [router.asPath])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const isActive = (path: string) => {
    return router.pathname === path || router.pathname.startsWith(`${path}/`)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              {/* You can add a logo image here */}
              <span className="text-xl font-medium text-blue-400">Microcosm Log</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            <Link 
              href="/logbook" 
              className={`text-sm font-medium px-3 py-2.5 rounded-md transition-colors ${
                isActive('/logbook') ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Logbook
            </Link>
            <Link 
              href="/threads" 
              className={`text-sm font-medium px-3 py-2.5 rounded-md transition-colors ${
                isActive('/threads') ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Threads
            </Link>
            <Link 
              href="/projects" 
              className={`text-sm font-medium px-3 py-2.5 rounded-md transition-colors ${
                isActive('/projects') ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Projects
            </Link>
            <Link 
              href="/about" 
              className={`text-sm font-medium px-3 py-2.5 rounded-md transition-colors ${
                isActive('/about') ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              About
            </Link>
          </nav>

          {/* User Authentication - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
            ) : user ? (
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <button className="flex items-center space-x-2 focus:outline-none">
                    {user.avatar ? (
                      <div className="relative w-8 h-8 rounded-full overflow-hidden">
                        <Image 
                          src={user.avatar} 
                          alt={user.name} 
                          width={32} 
                          height={32}
                          className="rounded-full" 
                        />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-400 text-white flex items-center justify-center">
                        {user.name.charAt(0)}
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-700">My Account</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Settings
                    </Link>
                    <button
                      onClick={signOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={signIn}
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50 focus:outline-none border border-gray-200"
                >
                  Log in
                </button>
                <button
                  onClick={signIn}
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-400 rounded-md hover:bg-blue-500 focus:outline-none"
                >
                  Sign up
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-blue-500 hover:bg-gray-50 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              {!mobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                // X icon for closing
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          mobileMenuOpen ? 'max-h-96' : 'max-h-0'
        }`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-100">
          <Link
            href="/logbook"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/logbook')
                ? 'bg-gray-200 text-gray-900'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Logbook
          </Link>
          <Link
            href="/threads"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/threads')
                ? 'bg-gray-200 text-gray-900'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Threads
          </Link>
          <Link
            href="/projects"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/projects')
                ? 'bg-gray-200 text-gray-900'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Projects
          </Link>
          <Link
            href="/about"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive('/about')
                ? 'bg-gray-200 text-gray-900'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            About
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-100">
          {loading ? (
            <div className="flex items-center px-5">
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
              <div className="ml-3 w-24 h-4 bg-gray-200 animate-pulse rounded"></div>
            </div>
          ) : user ? (
            <div>
              <div className="flex items-center px-5">
                {user.avatar ? (
                  <div className="flex-shrink-0">
                    <Image 
                      src={user.avatar} 
                      alt={user.name} 
                      width={40} 
                      height={40}
                      className="rounded-full" 
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center">
                    {user.name.charAt(0)}
                  </div>
                )}
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user.name}</div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <Link
                  href="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </Link>
                <button
                  onClick={signOut}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <div className="px-5 py-2 space-y-2">
              <button
                onClick={signIn}
                className="w-full flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50 focus:outline-none border border-gray-200"
              >
                Log in
              </button>
              <button
                onClick={signIn}
                className="w-full flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-400 rounded-md hover:bg-blue-500 focus:outline-none"
              >
                Sign up
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar 