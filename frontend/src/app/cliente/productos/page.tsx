import { getProductsAction } from "@/actions";
import { Columns, DataTable } from "@/components";
import { redirect } from "next/navigation";

export default async function ClientProductsPage() {
    const response = await getProductsAction();
    
    if (!response.success) {
        if (response.redirectToLogin) {
            redirect('/login');
        }
        
        return (
          <div className="flex items-center justify-center">
            <span className="text-red-600 text-center my-6">{response.message}</span>
          </div>
        );
    }
    
    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            <DataTable columns={Columns} data={response.products} />
        </div>
    );
}
