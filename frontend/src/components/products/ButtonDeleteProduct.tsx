'use client';

import { deleteProductAction } from "@/actions";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { LoaderCircleIcon, Trash2Icon } from "lucide-react";

interface ButtonDeleteProductProps {
  productId: string;
}
export const ButtonDeleteProduct = ({
  productId,
}: ButtonDeleteProductProps) => {
    const [isLoading,startTransition] = useTransition();
    const handleDeleteProduct = async() => {
       startTransition(async() => {
          const response = await deleteProductAction(productId);
          if(!response.success) {
            console.log(response.message);
            return
          }
          console.log('Producto Borrado!')
       })
    }
  return (
    <Button
      type="button"
      title="Borrar"
      variant={"outline"}
      size={"icon"}
      onClick={handleDeleteProduct}
    >
      {isLoading ? (
        <LoaderCircleIcon className="animate-spin" />
      ) : (
        <Trash2Icon className="text-red-600" />
      )}
    </Button>
  );
};
