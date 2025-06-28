'use server';

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const userLogoutAction = async() => {
    const cookieStore = await cookies();
    cookieStore.delete('token');
    cookieStore.delete('user_role');
    
    // Limpiar cache de las paginas 
    revalidatePath('/', 'layout');
}