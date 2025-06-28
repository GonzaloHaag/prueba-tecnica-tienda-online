'use server';
const API_URL = process.env.API_URL;
type RegisterSuccessResponse = {
    success: true;
    message: string;
};

type RegisterErrorResponse = {
    success: false;
    message: string;
};

type RegisterResponse = RegisterSuccessResponse | RegisterErrorResponse;

export const userRegisterAction = async (email:string,password:string): Promise<RegisterResponse> => {
    console.log(API_URL)
    if(email.trim() === '') {
        return {
            success:false,
            message:'El email es requerido'
        }
    }
    if(password.trim().length < 6) {
        return {
            success:false,
            message:'La contraseña debe tener minimo 6 caracteres'
        }
    }
    try {
        const response = await fetch(`${API_URL}/auth/register`,{
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email,password})
        });
        
        const data = await response.json();
        
        if(!response.ok) {
            return {
                success:false,
                message: data.message || 'Error al crear usuario',
            }
        }
        return {
            success:true,
            message: data.message || 'Usuario creado con éxito'
        }
    } catch (error) {
        console.error(error)
        return {
            success:false,
            message:'Error de conexión al servidor',
        }
    }

}