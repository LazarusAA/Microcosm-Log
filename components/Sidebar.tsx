import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'

interface SidebarProps {
  user: { name: string; avatar?: string } | null
  loading: boolean
  signIn: () => void
  signOut: () => void
}

const Sidebar = ({ user, loading, signIn, signOut }: SidebarProps) => {
  const router = useRouter()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [textVisible, setTextVisible] = useState(!isCollapsed)

  const isActive = (path: string) => {
    return router.pathname === path || router.pathname.startsWith(`${path}/`)
  }
  
  // Handle text visibility with animation delay
  useEffect(() => {
    if (isCollapsed) {
      setTextVisible(false)
    } else {
      // Wait for sidebar to expand before showing text
      const timer = setTimeout(() => {
        setTextVisible(true)
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [isCollapsed])

  return (
    <aside 
      className={`fixed left-0 top-0 bottom-0 flex flex-col bg-white border-r border-gray-100 shadow-sm transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-64'
      } z-30 overflow-hidden`}
    >
      {/* Header with logo and hamburger */}
      <div className="flex items-center h-16 px-3 border-b border-gray-100">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-md text-gray-500 hover:text-blue-500 hover:bg-gray-50 transition-colors"
          aria-label="Toggle sidebar"
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
        <div className={`ml-2 overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
          <Link href="/" className="flex items-center">
            {!isCollapsed && (
              <div className="w-7 h-7 mr-2 flex-shrink-0">
                <Image 
                  src="/images/logo.svg"
                  alt="Microcosm Log Logo"
                  width={28}
                  height={28}
                  priority
                />
              </div>
            )}
            <span className="text-xl font-medium text-blue-400 whitespace-nowrap transition-opacity duration-200 ease-in-out">
              {textVisible && "Microcosm Log"}
            </span>
          </Link>
        </div>
      </div>

      {/* Create button */}
      <div className={`px-3 py-4 ${isCollapsed ? 'flex justify-center' : ''}`}>
        <button
          onClick={() => router.push('/create')}
          className={`flex items-center font-medium rounded-full transition-all ${
            isCollapsed 
              ? 'w-10 h-10 justify-center bg-blue-400 hover:bg-blue-500 text-white' 
              : 'w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-5 h-5 ${isCollapsed ? 'text-white' : 'text-blue-400'}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          {textVisible && <span className="ml-2 transition-opacity duration-200 ease-in-out opacity-100">Create</span>}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="py-2">
          <li>
            <Link
              href="/"
              className={`flex items-center px-3 py-2.5 mx-2 rounded-md ${
                isActive('/')
                  ? 'bg-gray-200 text-gray-900'
                  : 'text-gray-700 hover:bg-gray-100'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              {textVisible && <span className="ml-3 transition-opacity duration-200 ease-in-out opacity-100">Home</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/logbook"
              className={`flex items-center px-3 py-2.5 mx-2 rounded-md ${
                isActive('/logbook')
                  ? 'bg-gray-200 text-gray-900'
                  : 'text-gray-700 hover:bg-gray-100'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
              {textVisible && <span className="ml-3 transition-opacity duration-200 ease-in-out opacity-100">Logbook</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/threads"
              className={`flex items-center px-3 py-2.5 mx-2 rounded-md ${
                isActive('/threads')
                  ? 'bg-gray-200 text-gray-900'
                  : 'text-gray-700 hover:bg-gray-100'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
              </svg>
              {textVisible && <span className="ml-3 transition-opacity duration-200 ease-in-out opacity-100">Threads</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/projects"
              className={`flex items-center px-3 py-2.5 mx-2 rounded-md ${
                isActive('/projects')
                  ? 'bg-gray-200 text-gray-900'
                  : 'text-gray-700 hover:bg-gray-100'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
              </svg>
              {textVisible && <span className="ml-3 transition-opacity duration-200 ease-in-out opacity-100">Projects</span>}
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={`flex items-center px-3 py-2.5 mx-2 rounded-md ${
                isActive('/about')
                  ? 'bg-gray-200 text-gray-900'
                  : 'text-gray-700 hover:bg-gray-100'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
              {textVisible && <span className="ml-3 transition-opacity duration-200 ease-in-out opacity-100">About</span>}
            </Link>
          </li>
        </ul>
      </nav>

      {/* User section */}
      <div className={`border-t border-gray-100 p-3 ${isCollapsed ? 'flex justify-center' : ''}`}>
        {loading ? (
          <div className={`flex ${isCollapsed ? 'justify-center' : 'items-center'}`}>
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
            {textVisible && <div className="ml-3 w-24 h-4 bg-gray-200 animate-pulse rounded transition-opacity duration-200 ease-in-out opacity-100"></div>}
          </div>
        ) : user ? (
          <div className={`flex ${isCollapsed ? 'justify-center' : 'items-center'}`}>
            <button
              onClick={() => router.push('/profile')}
              className="flex items-center focus:outline-none"
            >
              {user.avatar ? (
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <Image 
                    src={user.avatar} 
                    alt={user.name} 
                    width={32} 
                    height={32}
                    className="rounded-full" 
                  />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                  {user.name.charAt(0)}
                </div>
              )}
              {textVisible && (
                <div className="ml-3 transition-opacity duration-200 ease-in-out opacity-100">
                  <p className="text-sm font-medium text-gray-700">{user.name}</p>
                </div>
              )}
            </button>
            {textVisible && (
              <button
                onClick={signOut}
                className="ml-auto text-gray-500 hover:text-gray-700 transition-opacity duration-200 ease-in-out opacity-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                </svg>
              </button>
            )}
          </div>
        ) : (
          <div className={`${isCollapsed ? 'flex justify-center' : ''}`}>
            {isCollapsed ? (
              <button
                onClick={signIn}
                className="p-1 text-blue-500 hover:bg-blue-50 rounded-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                </svg>
              </button>
            ) : (
              <button
                onClick={signIn}
                className="w-full flex justify-center px-3 py-2 text-sm font-medium text-blue-500 bg-white rounded-md hover:bg-blue-50 focus:outline-none border border-gray-200"
              >
                {textVisible && <span className="transition-opacity duration-200 ease-in-out opacity-100">Log in / Sign up</span>}
              </button>
            )}
          </div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar 