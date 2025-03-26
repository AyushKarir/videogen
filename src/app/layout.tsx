import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-provider";
import { poppins } from "@/lib/fonts";
import { TooltipProvider } from "@/components/ui/tooltip";
import CookieSetter from "@/components/cookie-setter";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/components/providers";
import { Suspense } from "react";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Imagen - playground",
  description: "Imagen Playground by ModelsLab",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Start of Tawk.to Script */}
        <Script type="text/javascript" id="tawk">
          {`
            var Tawk_API = Tawk_API || {},
              Tawk_LoadStart = new Date();
            (function () {
              var s1 = document.createElement("script"),
                s0 = document.getElementsByTagName("script")[0];
              s1.async = true;
              s1.src = "https://embed.tawk.to/6332cd5154f06e12d8971855/1gdv74273";
              s1.charset = "UTF-8";
              s1.setAttribute("crossorigin", "*");
              s0.parentNode.insertBefore(s1, s0);
            })();
          `}
        </Script>
        {/* End of Tawk.to Script */}
      </head>
      <body className={`${poppins.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          // disableTransitionOnChange
        >
          <Providers>
            <Suspense fallback={<div />}>
              <CookieSetter />
            </Suspense>
            <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
            <Toaster richColors />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
