import { getProductAction } from "@/actions";
import { FormProduct } from "@/components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await getProductAction(id);

  if (!response.success) {
    if (response.redirectToLogin) {
      redirect("/login");
    }

    return (
      <div className="flex items-center justify-center py-10">
        <span className="text-red-600">Error al obtener el producto</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Editar Producto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormProduct product={response.product} />
        </CardContent>
      </Card>
    </div>
  );
}
