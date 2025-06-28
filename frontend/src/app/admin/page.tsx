import { getCountProductsAdminAction } from "@/actions";
import { MetricCard, SalesChart } from "@/components";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { mockSalesData } from "@/lib/mock-data";
import { AlertTriangle, DollarSign, Package } from "lucide-react";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const response = await getCountProductsAdminAction();
  if (!response.success) {
    return (
      <div className="w-full px-4 flex justify-center items-center py-10">
        <span className="text-red-600">{response.message}</span>
      </div>
    );
  }
  if (response.redirectToLogin) {
    redirect("/login");
  }

  // Datos para el gráfico
  const chartData = mockSalesData.monthlyData.map(item => ({
    name: item.month,
    ventas: item.sales
  }));

  return (
    <div className="w-full max-w-6xl mx-auto px-4 flex flex-col gap-y-6">
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Card de Productos Totales */}
        <MetricCard
          title="Productos Totales"
          value={response.productsCount.toLocaleString()}
          icon={<Package size={25} />}
          trend={{
            value: 12,
            isPositive: true,
          }}
        />

        {/* Card de Productos con Bajo Stock */}
        <MetricCard
          title="Productos con Bajo Stock"
          value={response.lowStockCount}
          icon={<AlertTriangle size={25} />}
          trend={{
            value: 5,
            isPositive: false,
          }}
          className="border-red-600"
        />

        {/* Card de Ventas Totales */}
        <MetricCard
          title="Ventas Totales"
          value={`$${mockSalesData.totalRevenue.toLocaleString("es-ES", {
            minimumFractionDigits: 2,
          })}`}
          icon={<DollarSign size={25} />}
          trend={{
            value: mockSalesData.monthlyGrowth,
            isPositive: true,
          }}
          className="md:col-span-2 lg:col-span-1"
        />
      </div>
      <Card>
         <CardHeader>
           <CardTitle className="text-xl mb-4">Ventas mensuales</CardTitle>
            <SalesChart data={chartData} />
         </CardHeader>
      </Card>
    </div>
  );
}
