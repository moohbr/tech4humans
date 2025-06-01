import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/mutations/use-login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth";
import { SignInFormValues } from "./types";
import { signInSchema } from "./schema";


export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync, isPending } = useLogin();

  const onSubmit = async (data: SignInFormValues) => {
    try {
      const response = await mutateAsync({
        email: data.email,
        password: data.password,
      });

      login(response?.data?.token ?? "");
      toast.success("Login realizado com sucesso!");

      setTimeout(() => {
        navigate({ to: "/users/dashboard" });
      }, 500);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Erro ao fazer login");
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700/50 text-zinc-900 dark:text-zinc-100"
                    placeholder="seu@email.com"
                    type="email"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500">
                  {fieldState.error?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  Senha
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="bg-white dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700/50 text-zinc-900 dark:text-zinc-100"
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-300 focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-sm text-red-500">
                  {fieldState.error?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 focus:outline-none"
            >
              Esqueceu a senha?
            </button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-indigo-600 text-white hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
        >
          {isPending ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </Form>
  );
}
