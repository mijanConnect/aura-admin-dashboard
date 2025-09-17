import "./globals.css";
import { Inter } from "next/font/google";
import StoreProvider from "../components/providers/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin Dashboard",
  description: "Next.js Admin Dashboard with Redux",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
