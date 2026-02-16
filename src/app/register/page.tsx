import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";

export default function RegisterPage() {
  return (
    <div>
      <AuthForm mode="register" />
      <p className="mt-4 text-center text-sm text-slate-400">
        ¿Ya tienes cuenta? <Link href="/login" className="underline">Inicia sesión</Link>
      </p>
    </div>
  );
}
