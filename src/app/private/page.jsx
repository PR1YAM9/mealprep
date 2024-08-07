import { redirect } from 'next/navigation'

import { createClient } from '../../../utils/supabase/server'
import {logout} from '@/app/logout/actions' 
export default async function PrivatePage() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return <div>
    Hello {data.user.email}
    <form action={logout}>
      <button type='submit'>Logout</button>
    </form>
  </div>
}