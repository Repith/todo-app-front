import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/components/providers/modal-provider";

const sora = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TODO App",
  description: "Simple TODO app for job purposes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={sora.className}>
        <ModalProvider />
        {children}
      </body>
    </html>
  );
}
