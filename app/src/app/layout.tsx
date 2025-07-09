import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import NextAuthSessionProvider from "@/providers/session-provider";
import MantineWrapper from "@/components/template/autenticado";
export const metadata: Metadata = {
  title: "Atendimentos seplan",
  description: "Desafio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>

        <NextAuthSessionProvider>
          <MantineWrapper>{children}</MantineWrapper>
        </NextAuthSessionProvider>

      </body>
    </html>
  );
}
