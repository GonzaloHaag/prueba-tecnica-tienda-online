'use server';

import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

export const getProductAction = async (productId: string) => {
  if (!productId) {
    return {
      success: false,
      message: 'ID del producto no proporcionado',
    };
  }

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
    const response = await fetch(`${API_URL}/products/${productId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.status === 401 || response.status === 403) {
      return {
        success: false,
        message: 'Sesión expirada',
        redirectToLogin: true
      };
    }

    const data = await response.json();
    
    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Error al obtener el producto',
      };
    }

    return {
      success: true,
      product: data
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Error de conexión al servidor',
    };
  }
};