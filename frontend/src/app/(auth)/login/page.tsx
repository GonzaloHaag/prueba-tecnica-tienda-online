import { LoginForm } from "@/components";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const cookieToken = await cookies();
  const hasCookieToken = cookieToken.has('token'); // Verifico si en las cookies esta la clave token
  if(hasCookieToken) {
    redirect('/')
  }
  return (
    <div className="flex min-h-svh w-full justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Iniciar sesión</CardTitle>
              <CardDescription className="text-pretty">
                Ingresá tus credenciales para acceder al sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
                <LoginForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
