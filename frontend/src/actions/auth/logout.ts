'use server';

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const userLogoutAction = async() => {
    const cookieStore = await cookies();
    
    // Limpiar todas las cookies de autenticación
    cookieStore.delete('token');
    cookieStore.delete('user_role');
    
    // Limpiar cache de las paginas 
    revalidatePath('/', 'layout');
}