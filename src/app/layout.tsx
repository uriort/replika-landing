import type { Metadata } from "next";
import { Inter, Manrope, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Replika by Deeper Signals | Organizational Intelligence",
  description:
    "Build agent digital twins of every person in your organization. Run thousands of simulations. See what's coming before it arrives.",
  openGraph: {
    title: "Replika by Deeper Signals",
    description:
      "Your organization, simulated. Every decision, tested before it's made.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} ${spaceGrotesk.variable} ${geistMono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
