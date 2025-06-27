"use client";
import { FormEvent, useState, useTransition } from "react";
import { userLoginAction } from "@/actions";
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const { email, password } = form;

    startTransition(async () => {
      const response = await userLoginAction(email.value, password.value);
      if (!response.success) {
        setError(response.message);
        return;
      }
      console.log(response);
      form.reset();
      router.push("/");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div>
        <Button
          type="submit"
          disabled={isPending}
          title="Ingresar"
          className="w-full"
        >
          {isPending ? "Ingresando..." : "Ingresar"}
        </Button>
      </div>
      {error && <span className="text-red-600 pt-6">{error}</span>}
      <div className="mt-4 text-center text-sm">
        Aún no tienes cuenta?
        <Link
          href="/register"
          title="Registro"
          className="underline underline-offset-4 ml-2"
        >
          Registrarse
        </Link>
      </div>
    </form>
  );
};
