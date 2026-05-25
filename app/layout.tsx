import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Keerthi S — Senior ML Infrastructure Engineer",
  description:
    "Senior Software Engineer specializing in ML infrastructure, LLM serving optimization, and distributed training. Step into my virtual office.",
  openGraph: {
    title: "Keerthi S — Senior ML Infrastructure Engineer",
    description: "Step into my virtual office. Ask my AI assistant anything about my work.",
    type: "website",
  },
  metadataBase: new URL("https://keerthi.dev"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
