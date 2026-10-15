import { AuthLayout } from "@/components/AuthLayout/AuthLayout";

export default function AuthenticationLayout({ children }: LayoutProps<"/">) {
  return <AuthLayout>{children}</AuthLayout>;
}
