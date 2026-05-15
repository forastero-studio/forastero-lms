import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Forastero · LMS",
  description:
    "Plataforma de cursos para arquitectos. De CAD a BIM, sin romper tu manera de trabajar.",
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
          colorPrimary: "#7d3a2c",
          colorText: "#111111",
          colorBackground: "#f7f5ef",
          colorInputBackground: "#fffdfa",
          colorInputText: "#111111",
          borderRadius: "0px",
          fontFamily: "Inter, sans-serif",
        },
      }}
    >
      <html lang="es" className={`${inter.variable} ${jetbrainsMono.variable}`}>
        <body className="font-sans">{children}</body>
      </html>
    </ClerkProvider>
  );
}
