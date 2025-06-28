"use client"

import { Product } from "@/lib/definitions"
import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image";
import Link from "next/link";
import { ButtonDeleteProduct } from "./ButtonDeleteProduct";
import { PencilIcon } from "lucide-react";
import { buttonVariants } from "../ui/button";

export const Columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "price",
    header: "Precio",
  },
  {
    accessorKey: "image",
    header: "Imagen",
    cell: ({ row }) => {
      const imageUrl = row.original.image;
      return (
        <Image
          src={imageUrl}
          alt={row.original.name}
          width={48}
          height={48}
          className="object-cover rounded-md aspect-square"
        />
      );
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    id:'actions',
    header:'Acciones',
    cell: ({row}) => {
      const product = row.original;
      return (
        <div className="flex items-center gap-x-2">
          <ButtonDeleteProduct productId={product._id} />
          <Link href={`/cliente/productos/editar/${product._id}`} title="Editar" className={`${buttonVariants({variant:'outline',size:'icon'})}`}>
              <PencilIcon />
          </Link>
        </div>
      )
    }
  }
]