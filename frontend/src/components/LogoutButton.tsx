"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { userLogoutAction } from "@/actions";

export const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await userLogoutAction();
    router.push("/login");
  };

  return (
    <Button type="button" onClick={handleLogout} variant="outline">
      Cerrar sesión
    </Button>
  );
};