import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "forastero · LMS",
  description:
    "Plataforma de formación para arquitectos. De CAD a BIM, sin modificar tu forma de trabajar.",
  metadataBase: new URL("https://forastero.studio"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#1C1C1A",
          colorText: "#1C1C1A",
          colorBackground: "#FAFAF9",
          colorInputBackground: "#FAFAF9",
          colorInputText: "#1C1C1A",
          borderRadius: "0px",
          fontFamily: "Inter, sans-serif",
        },
      }}
    >
      <html lang="es" className={`${inter.variable} ${jetbrainsMono.variable}`}>
        <body className="font-body">{children}</body>
      </html>
    </ClerkProvider>
  );
}
