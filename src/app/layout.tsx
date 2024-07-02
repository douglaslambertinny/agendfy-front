import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgendFy",
  description: "Appointment service app",
};

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body>
    <span>Teste do novo layout global</span>
      <AntdRegistry>{children}</AntdRegistry>
    </body>
  </html>
);

export default RootLayout;