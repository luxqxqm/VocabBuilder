"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { api, getErrorMessage } from "@/lib/api";
import { loginSchema, type LoginValues } from "@/lib/schemas";
import type { AuthResponse } from "@/lib/types";
import { PasswordInput } from "./PasswordInput";
import styles from "./AuthForm.module.css";

export function LoginForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({ resolver: yupResolver(loginSchema) });

  const loginMutation = useMutation({
    mutationFn: async (values: LoginValues) => {
      const { data } = await api.post<AuthResponse>("/users/signin", values);
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      queryClient.setQueryData(["user"], { name: data.name, email: data.email });
      router.replace("/dictionary");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });

  return (
    <section className={styles.formSection}>
      <h1 className={styles.title}>Login</h1>

      <p className={styles.description}>
        Please enter your login details to continue using our service:
      </p>

      <form
        className={styles.form}
        noValidate
        onSubmit={handleSubmit((values) => loginMutation.mutate(values))}
      >
        <div className={styles.field}>
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            aria-label="Email"
            autoComplete="email"
            {...register("email")}
          />
          {errors.email && <p className={styles.error}>{errors.email.message}</p>}
        </div>

        <PasswordInput
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
        />

        <button
          type="submit"
          className={styles.submitButton}
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? "Please wait..." : "Login"}
        </button>
      </form>

      <Link href="/register" className={styles.switchLink}>
        Register
      </Link>
    </section>
  );
}
