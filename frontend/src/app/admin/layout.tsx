import { Header } from "@/components";
import { buttonVariants } from "@/components/ui/button";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  if(!cookieStore.has('token')) {
    redirect('/login');
  }
  return (
    <>
      <Header />
      {
        cookieStore.get('user_role')?.value === 'admin' ? (
          <main className="py-10">{children}</main>
        ) : (
          <div className="flex flex-col gap-y-4 items-center justify-center py-10">
            <span className="text-center text-primary">No tienes permisos para entrar a esta sección</span>
            <Link href={'/cliente/productos'} title="Volver" className={`${buttonVariants({variant:'outline'})}`}>
               Volver
            </Link>
          </div>
        )
      }
    </>
  );
}
