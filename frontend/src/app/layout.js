"use client";
import localFont from "next/font/local";
import "./globals.css";
import ThemesProvider from "@/app/components/ThemesProvider"
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";

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

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const showNavbar = pathname === '/' || /^\/logs\/[\w-]+$/.test(pathname)

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
            {showNavbar ?
              (
                <>
                <div className='max-w-[800px] px-2 w-4/5 mx-auto'>
                  <Navbar />
                  <div>
                    {children}
                  </div>  
                </div>
                </>
              ): (
                <>
                  {children}
                </>
              )
            }
          </SessionProvider>
        </ThemesProvider>
      </body>
    </html>
  );
}
