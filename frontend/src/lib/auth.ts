'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export interface AuthUser {
  role: 'admin' | 'cliente'
}

export interface AuthResult {
  isAuthenticated: boolean
  user: AuthUser | null
  token: string | null
}

export async function getAuthUser(): Promise<AuthResult> {
  const cookieStore = await cookies()
  
  const token = cookieStore.get('token')?.value
  const userRole = cookieStore.get('user_role')?.value
  
  if (!token || !userRole) {
    return {
      isAuthenticated: false,
      user: null,
      token: null
    }
  }
  
  return {
    isAuthenticated: true,
    user: {
      role: userRole as 'admin' | 'cliente'
    },
    token
  }
}
export async function requireAuth(): Promise<AuthUser> {
  const auth = await getAuthUser()
  
  if (!auth.isAuthenticated || !auth.user) {
    redirect('/login')
  }
  
  return auth.user
}

/**
 * Verificar si el usuario es admin y redirigr si no lo es
 */
export async function requireAdmin(): Promise<AuthUser> {
  const user = await requireAuth()
  
  if (user.role !== 'admin') {
    redirect('/cliente/productos')
  }
  
  return user
}

/**
 * Verificar si el usuario es cliente y redirigir si no lo es
 */
export async function requireCliente(): Promise<AuthUser> {
  const user = await requireAuth()
  
  if (user.role !== 'cliente') {
    redirect('/admin')
  }
  
  return user
} 