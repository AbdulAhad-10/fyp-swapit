import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import "react-datepicker/dist/react-datepicker.css";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { Providers } from "./providers";
import { ProfileProvider } from "@/context/ProfileContext";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: "normal",
});

export const metadata: Metadata = {
  title: "Swapit",
  description: "Skill Exchange Platform",
  // icons: {
  //   icon: "/icons/logo.svg",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>
          <ProfileProvider>
            <Providers>{children}</Providers>
          </ProfileProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
