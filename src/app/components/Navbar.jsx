
import Link from 'next/link'
import React from 'react'
import { createClient } from '../../../utils/supabase/client'
import { redirect } from 'next/navigation'

const Navbar = async() => {
  return (
    <div>
        <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <HandPlatterIcon className="h-6 w-6" />
          <span className="sr-only">Meal Planner</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Login
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Profile
          </Link>
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