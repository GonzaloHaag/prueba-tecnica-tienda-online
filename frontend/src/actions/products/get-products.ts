'use server';

import { Product } from "@/lib/definitions";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

type GetProductsSuccessResponse = {
    success: true;
    products: Product[];
};

type GetProductsErrorResponse = {
    success: false;
    message: string;
    redirectToLogin?: boolean;
};

type GetProductsResponse = GetProductsSuccessResponse | GetProductsErrorResponse;

export const getProductsAction = async(): Promise<GetProductsResponse> => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) {
        return {
            success: false,
            message: 'No autorizado',
            redirectToLogin: true
        };
    }
    
    try {
        const response = await fetch(`${API_URL}/products`,{
            method:'GET',
            headers:{
                'Authorization':`Bearer ${token}`
            }
        });
        
        if (response.status === 401 || response.status === 403) {
            return {
                success: false,
                message: 'Sesión expirada',
                redirectToLogin: true
            };
        }
        
        if(!response.ok) {
            const data = await response.json();
            return {
                success: false,
                message: data.message || 'Error al obtener los productos'
            };
        }
        
        const data = await response.json();
        return {
            success: true,
            products: data
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'Error de conexión al servidor'
        };
    }
}
