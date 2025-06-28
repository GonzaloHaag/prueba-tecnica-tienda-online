'use server';

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL;
type DeleteProductSuccessResponse = {
    success: true;
    message: string;
};

type DeleteProductErrorResponse = {
    success: false;
    message: string;
};

type DeleteProductResponse = DeleteProductSuccessResponse | DeleteProductErrorResponse;

export const deleteProductAction = async(productId:string): Promise<DeleteProductResponse> => {
    if(!productId) {
        return {
            success:false,
            message:'Product id no proporcionado'
        }
    }
    try {
        const cookieStore = await cookies();
        const response = await fetch(`${API_URL}/products/delete/${productId}`,{
            method:'DELETE',
            headers: {
                'Authorization': `Bearer ${cookieStore.get('token')?.value}`
            }
        });
        const data = await response.json();
        if(!response.ok) {
            return {
                success:false,
                message: data.message || 'Error al eliminar el producto'
            }
        }
        revalidatePath('/cliente/productos');
        return {
            success:true,
            message: data.message || 'Producto eliminado correctamente'
        }
    } catch (error) {
        console.error(error);
        return {
            success:false,
            message:'Error de conexión al servidor'
        }
    }
}