'use server';

import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

type SuccessResponse = {
    success: true;
    productsCount: number;
    lowStockProducts: Array<{
        id: string;
        name: string;
        stock: number;
    }>;
    lowStockCount: number;
};

type ErrorResponse = {
    success: false;
    message: string;
    redirectToLogin?: boolean;
};

type GetCountProductsResponse = SuccessResponse | ErrorResponse;

export const getCountProductsAdminAction = async(): Promise<GetCountProductsResponse> => {
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
        const response = await fetch(`${API_URL}/admin/count-products`,{
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
            productsCount: data.count,
            lowStockProducts:data.lowStockProducts,
            lowStockCount: data.lowStockProducts.length
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'Error de conexión al servidor'
        };
    }
}