'use server';

import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

export const userLoginAction = async (email: string, password: string) => {
    if(email.trim() === '') {
        return {
            success: false,
            message: 'El email es requerido'
        }
    }
    if(password.trim().length < 6) {
        return {
            success: false,
            message: 'La contraseña debe tener minimo 6 caracteres'
        }
    }
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
        
        const data = await response.json();
        
        if(!response.ok) {
            return {
                success: false,
                message: data.message || 'Error al iniciar sesión'
            }
        }
        /** Guardar en las cookies el token y user */
        const cookieToken = await cookies();
        cookieToken.set('token',data.token,{
            httpOnly:true
        });
        const cookieUser = await cookies();
        cookieUser.set('user_role',data.user.role,{
            httpOnly:true
        })
        return {
            success: true,
            message: data.message || 'Usuario logueado!'
        }
    } catch (error) {
        console.error(error)
        return {
            success: false,
            message: 'Error de conexión al servidor'
        }
    }
} 