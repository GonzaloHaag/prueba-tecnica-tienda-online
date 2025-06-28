"use client";
import { useTransition, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button, buttonVariants } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";
import { createOrEditProductAction } from "@/actions";
import { Product } from "@/lib/definitions";
import Image from "next/image";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner";

interface FormProductProps {
  product?: Product;
}

export const FormProduct = ({ product }: FormProductProps) => {
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);

    if (product) {
      formData.append("productId", product._id);
    }

    startTransition(async () => {
      const res = await createOrEditProductAction(formData);
      if (!res.success) {
        setError(res.message);
        return;
      } else {
        toast.success(`Producto ${product ? 'editado' : 'creado' } exitosamente!`,{ duration:3000 })
        router.push("/cliente/productos");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {product && <input type="hidden" name="productId" value={product._id} />}
      <div className="space-y-2">
        <Label htmlFor="name">Nombre del Producto *</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Ej: iPhone 15 Pro"
          defaultValue={product?.name || ""}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Descripción *</Label>
        <Textarea
          id="description"
          placeholder="Describe las características principales del producto..."
          name="description"
          defaultValue={product?.description || ""}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Precio *</Label>
          <Input
            id="price"
            type="number"
            name="price"
            step="0.01"
            min="0"
            placeholder="0.00"
            defaultValue={product?.price || ""}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stock">Stock *</Label>
          <Input
            id="stock"
            type="number"
            min="0"
            placeholder="0"
            name="stock"
            defaultValue={product?.stock || ""}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">Categoría *</Label>
        <Select defaultValue={product?.category || ''} name="category">
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleccionar categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categorías</SelectLabel>
              <SelectItem value="Remeras">Remeras</SelectItem>
              <SelectItem value="Pantalones">Pantalones</SelectItem>
              <SelectItem value="Zapatillas">Zapatillas</SelectItem>
              <SelectItem value="Camperas">Camperas</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Imagen {!product && "*"}</Label>
        <Input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          required={!product}
        />
        {product && product?.image && (
          <div className="mt-2">
            <p className="text-sm text-gray-600 mb-2">Imagen actual:</p>
            <Image
              src={product.image}
              alt={product.name}
              width={80}
              height={80}
              className="object-cover rounded-md border"
            />
          </div>
        )}
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <div className="flex flex-col sm:flex-row gap-3 pt-6 justify-end">
        <Link
          href={"/cliente/productos"}
          title="Cancelar"
          className={`${buttonVariants({
            variant: "outline",
          })} flex-1 sm:flex-none bg-transparent`}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Cancelar
        </Link>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Guardando..." : product ? "Actualizar" : "Guardar"}
        </Button>
      </div>
    </form>
  );
};
