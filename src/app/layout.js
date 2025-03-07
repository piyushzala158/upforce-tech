import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

//third party
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "react-hot-toast";

//mui
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

//custom 
import ReactQueryProvider from "@/components/ReactQueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Product Management",
  description: "Product management platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppRouterCacheProvider>
          <ReactQueryProvider>
            <Toaster />
            <NuqsAdapter>{children} </NuqsAdapter>
          </ReactQueryProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
