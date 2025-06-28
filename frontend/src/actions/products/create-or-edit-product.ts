'use server';

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

export const createOrEditProductAction = async (formData: FormData) => {
  const productId = formData.get('productId')?.toString();
  const name = formData.get('name')?.toString().trim();
  const description = formData.get('description')?.toString().trim();
  const price = formData.get('price');
  const stock = formData.get('stock');
  const category = formData.get('category')?.toString().trim();
  const image = formData.get('image') as File | null;

  if (!name || !description || !price || !stock || !category) {
    return {
      success: false,
      message: 'Todos los campos son requeridos',
    };
  }

  const isEditing = !!productId;
  if (!isEditing && (!image || image.size === 0)) {
    return {
      success: false,
      message: 'La imagen es requerida al crear un producto',
    };
  }

  if (isNaN(Number(price)) || Number(price) < 0) {
    return {
      success: false,
      message: 'El precio no puede ser negativo',
    };
  }
  if (isNaN(Number(stock)) || Number(stock) < 0) {
    return {
      success: false,
      message: 'El stock no puede ser negativo',
    };
  }

  try {
    const cookieStore = await cookies();
    const url = isEditing 
      ? `${API_URL}/products/edit/${productId}`
      : `${API_URL}/products/new`;
    
    // Si estoy editando y no hay nueva imagen, remuevo el campo image del FormData
    const formDataToSend = new FormData();
    for (const [key, value] of formData.entries()) {
      if (key === 'image' && isEditing && (!value || (value as File).size === 0)) {
        continue;
      }
      formDataToSend.append(key, value);
    }
    
    const response = await fetch(url, {
      method: isEditing ? 'PUT' : 'POST',
      headers: {
        'Authorization': `Bearer ${cookieStore.get('token')?.value}`
      },
      body: formDataToSend,
    });
    
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message || `Error al ${isEditing ? 'actualizar' : 'crear'} el producto`,
      };
    }
    
    revalidatePath('/cliente/productos');
    return {
      success: true,
      message: data.message || `Producto ${isEditing ? 'actualizado' : 'creado'} exitosamente`,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Error de conexión al servidor',
    };
  }
};
