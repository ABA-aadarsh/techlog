import localFont from "next/font/local";
import "./globals.css";
import ThemesProvider from "@/app/components/ThemesProvider"
import { SessionProvider } from "next-auth/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "ABA-TechLog",
  description: "Technical Log Website of Aadarsh Bandhu Aryal (aba-aadarsh)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemesProvider
          attribute="class"
          defaultTheme = "system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            {children}
          </SessionProvider>
        </ThemesProvider>
      </body>
    </html>
  );
}
