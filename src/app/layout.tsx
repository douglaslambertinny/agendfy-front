import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgendFy",
  description: "Appointment service app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}


// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "AgendFy",
//   description: "Appointment service app",
// };

// const RootLayout = ({ children }: React.PropsWithChildren) => (
//   <html lang="en">
//     <body>
//       {children}
//     </body>
//   </html>
// );

// export default RootLayout;
