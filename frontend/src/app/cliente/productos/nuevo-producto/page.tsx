import { FormProduct } from "@/components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewProductPage() {
  return (
    <div className="w-full max-w-6xl px-4 mx-auto">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
           Crear Nuevo Producto
        </CardTitle>
      </CardHeader>
      <CardContent>
         <FormProduct />
      </CardContent>
    </Card>
    </div>
  );
}
