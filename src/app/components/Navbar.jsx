'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { createClient } from '../../../utils/supabase/client'

const Navbar = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.auth.getUser()
      if (data.user) {
        setUser(data.user)
      }
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <div>
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <HandPlatterIcon className="h-6 w-6" />
          <span className="sr-only">Meal Planner</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          {user ? (
            <>
              <Link href="/profile" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm font-medium hover:underline underline-offset-4"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
              Login
            </Link>
          )}
        </nav>
      </header>
    </div>
  )
}


function HandPlatterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3V2" />
      <path d="M5 10a7.1 7.1 0 0 1 14 0" />
      <path d="M4 10h16" />
      <path d="M2 14h12a2 2 0 1 1 0 4h-2" />
      <path d="m15.4 17.4 3.2-2.8a2 2 0 0 1 2.8 2.9l-3.6 3.3c-.7.8-1.7 1.2-2.8 1.2h-4c-1.1 0-2.1-.4-2.8-1.2L5 18" />
      <path d="M5 14v7H2" />
    </svg>
  )
}

export default Navbar