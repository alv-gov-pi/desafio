import type { Metadata } from "next";
import "./globals.css";
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import NextAuthSessionProvider from "@/providers/session-provider";
import MantineWrapper from "@/components/template/autenticado/MantineWrapper";
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
