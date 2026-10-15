"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { api, getErrorMessage } from "@/lib/api";
import { registerSchema, type RegisterValues } from "@/lib/schemas";
import type { AuthResponse } from "@/lib/types";
import { PasswordInput } from "./PasswordInput";
import styles from "./AuthForm.module.css";

export function RegisterForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({ resolver: yupResolver(registerSchema) });

  const registerMutation = useMutation({
    mutationFn: async (values: RegisterValues) => {
      const { data } = await api.post<AuthResponse>("/users/signup", values);
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
      <h1 className={styles.title}>Register</h1>

      <p className={styles.description}>
        To start using our services, please fill out the registration form
        below. All fields are mandatory:
      </p>

      <form
        className={styles.form}
        noValidate
        onSubmit={handleSubmit((values) => registerMutation.mutate(values))}
      >
        <div className={styles.field}>
          <input
            className={styles.input}
            type="text"
            placeholder="Name"
            aria-label="Name"
            autoComplete="name"
            {...register("name")}
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>

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
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />

        <button
          type="submit"
          className={styles.submitButton}
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending ? "Please wait..." : "Register"}
        </button>
      </form>

      <Link href="/login" className={styles.switchLink}>
        Login
      </Link>
    </section>
  );
}
