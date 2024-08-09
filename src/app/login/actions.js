export async function login(formData) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (error) {
    console.error('Login error:', error.message)
    return { error: error.message }
  }

  console.log('Login success:', data)
  revalidatePath('/')
  redirect('/')
}

export async function signup(formData) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signUp({
    email: formData.get('email'),
    password: formData.get('password'),
    options: {
      data: {
        username: formData.get('username'),
      },
    },
  })

  if (error) {
    console.error('Signup error:', error.message)
    return { error: error.message }
  }

  console.log('Signup success:', data)
  revalidatePath('/')
  redirect('/')
}
