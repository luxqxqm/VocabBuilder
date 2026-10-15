import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "@/components/Providers/Providers";
import "./globals.css";

const fixelDisplay = localFont({
  src: [
    { path: "./fonts/MacPawFixelDisplay-Regular.otf", weight: "400" },
    { path: "./fonts/MacPawFixelDisplay-Medium.otf", weight: "500" },
    { path: "./fonts/MacPawFixelDisplay-SemiBold.otf", weight: "600" },
    { path: "./fonts/MacPawFixelDisplay-Bold.otf", weight: "700" },
  ],
  variable: "--font-fixel-display",
});

export const metadata: Metadata = {
  title: {
    default: "VocabBuilder",
    template: "%s | VocabBuilder",
  },
  description:
    "VocabBuilder helps you expand your English vocabulary, learn new words and track your progress.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className={fixelDisplay.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
