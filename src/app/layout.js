import { Inter } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/utils/providers/QueryProvider";
import AuthProvider from "@/utils/providers/AuthProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://legitcheck.vercel.app"),

  title: {
    default: "LegitCheck — AI Contract Risk Analysis",
    template: "%s | LegitCheck",
  },
  description: "Upload any contract and get instant risk analysis, clause explanations, and negotiation suggestions in plain English.",

  keywords: [
    "contract analysis",
    "ai contract review",
    "legal tech",
    "freelancer contracts",
    "nda review",
    "employment contracts",
    "startup legal tools",
    "risk analysis"
  ],
  authors: [
    {
      name:"Rising Devs"
    }
  ],
  creator:"Rising Devs",

  publisher: "Rising Devs",
  
  robots:{
      index:true,
      follow:true,
      googleBot:{
          index:true,
          follow:true
      }
  },

  icons:{
    icon:"/icon.png",
    shortcut:"/icon.png",
    apple:"/icon100.png",
  },

  openGraph:{
    title:
      "LegitCheck — Understand Contracts Before You Sign",
    description:
      "AI-powered contract review for freelancers, agencies, startups, and creators.",
    url:"https://legitcheck.vercel.app",
    siteName:"LegitCheck",
    locale:"en_US",
    type:"website",
    images:[
      {
        url:"https://legitcheck.vercel.app/og-image.png",
        width:1092,
        height:563,
        alt:"LegitCheck"
      }
    ]
  },

  twitter:{
    card:"summary_large_image",
    title:
      "LegitCheck — AI Contract Risk Analysis",
    description:
      "Spot hidden risks and negotiate smarter before signing contracts.",
    images:[
      "https://legitcheck.vercel.app/og-image.png"
    ]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${mono.variable} font-sans antialiased`}
      >
        <QueryProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </QueryProvider>
        <Toaster position="top-right"/>
      </body>
    </html>
  );
}
