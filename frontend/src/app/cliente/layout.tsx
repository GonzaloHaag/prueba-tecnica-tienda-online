import { Header } from "@/components";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ClienteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const hasCookieToken = cookieStore.has("token"); // Verifico si en las cookies esta la clave token
  const hasCookieUser = cookieStore.has("user_role");
  if (!hasCookieToken || !hasCookieUser) {
    redirect("/login");
  }
  if(cookieStore.get('user_role')?.value === 'admin') {
    redirect('/admin')
  }
  return (
    <>
      <Header />
      <main className="py-10">{children}</main>
    </>
  );
}
