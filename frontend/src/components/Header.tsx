import { cookies } from "next/headers";
import { LogoutButton } from "./LogoutButton";

export const Header = async () => { 
  const cookieStore = await cookies(); 
  return (
    <header className="w-full flex items-center bg-primary py-4">
      <div className="w-full max-w-6xl mx-auto px-4 flex items-center justify-between">
        <h1 className="text-slate-100 text-lg">Bienvenido</h1>
        <div className="flex items-center gap-x-4">
          <span className="text-slate-100 text-sm font-medium">Rol: {cookieStore.get('user_role')?.value}</span>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
};
