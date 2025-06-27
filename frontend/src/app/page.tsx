import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const cookieToken = await cookies();
  const hasCookieToken = cookieToken.has('token'); // Verifico si en las cookies esta la clave token
  if(!hasCookieToken) {
    redirect('/login')
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        Hola
    </div>
  );
}
