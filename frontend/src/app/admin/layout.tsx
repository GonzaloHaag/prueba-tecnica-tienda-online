import { Header } from "@/components";
import { requireAdmin } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Verificar que sea admin - si no lo es, redirect automático
  await requireAdmin();
  
  return (
    <>
      <Header />
      <main className="py-10">{children}</main>
    </>
  );
}
