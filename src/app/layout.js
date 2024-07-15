
import { Quicksand } from "next/font/google";
import "./globals.css";
import String from '@/Strings/english';
const inter = Quicksand({ subsets: ["latin"] });

export const metadata = {
  title: String.App,
  description: String.Description,
  image: '../../public/logo/hor_logo1.png',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
