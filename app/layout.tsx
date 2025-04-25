import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StarsCanvas from "@/components/main/StarBackground";
import Navbar from "@/components/main/Navbar";
import Footer from "@/components/main/Footer";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Ansh Doshi",
//   description: "Ansh Doshi Full Stack Developer",
//   icons: {
//     icon: "/favicon.ico",
//   },
// };

export const metadata: Metadata = {
  title: "Ansh Doshi | Full Stack Developer",
  description:
    "Portfolio of Ansh Doshi - React, Node, Next.js, Prisma , MySQL , MongoDb ,Javascript Expert.",
  keywords: [
    "Ansh Doshi",
    "Full Stack Developer",
    "React",
    "Node.js",
    "Javascript Expert",
    "Next.js",
    "Portfolio",
  ],
  openGraph: {
    title: "Ansh Doshi | Portfolio",
    description:
      "Portfolio of Ansh Doshi - React, Node, Next.js, Prisma , MySQL , MongoDb ,Javascript Expert.",
    url: "https://anshdoshi.vercel.app",
    siteName: "Ansh Portfolio",
    images: [
      {
        url: "https://anshdoshi.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ansh Doshi Portfolio",
      },
    ],
    type: "website",
  },
  icons: {
        icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      
      <body
        className={`${inter.className} bg-[#030014] overflow-y-scroll overflow-x-hidden`}
      >
        {/* <StarsCanvas /> */}
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
