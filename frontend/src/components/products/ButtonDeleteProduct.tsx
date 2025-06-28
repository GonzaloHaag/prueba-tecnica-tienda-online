'use client';

import { deleteProductAction } from "@/actions";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { LoaderCircleIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";

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
            toast.error(response.message,{ duration:3000 })
            return
          }
          toast.success(response.message,{ duration:3000 })
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
