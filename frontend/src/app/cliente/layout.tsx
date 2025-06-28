import { Header } from "@/components";
import { requireCliente } from "@/lib/auth";

export default async function ClienteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Verificar que sea cliente - si no lo es, redirect automático
  await requireCliente();
  
  return (
    <>
      <Header />
      <main className="py-10">{children}</main>
    </>
  );
}
