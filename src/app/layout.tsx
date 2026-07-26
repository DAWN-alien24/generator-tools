import type { Metadata } from "next";
import Script from "next/script";
import ClientShell from "@/components/ClientShell";
import "./globals.css";
export const metadata: Metadata = {
  title: { default: "Free Online Generators — Password, QR Code, Name, UUID", template: "%s | Free Generators" },
  description: "Free online generators: password, QR code, random names, UUID. Instant, no signup, no data collection.",
  keywords: ["password generator","QR code generator","random name generator","UUID generator","free online tools","密碼產生器","QR Code 產生器"],
  openGraph: { type: "website", title: "Free Online Generators", description: "Password, QR Code, Name, UUID generators. Free, instant, no signup." },
  robots: { index: true, follow: true },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2613042507827449" crossOrigin="anonymous" strategy="afterInteractive" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context":"https://schema.org","@type":"WebApplication","name":"Free Online Generators","applicationCategory":"UtilitiesApplication","operatingSystem":"Web","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"} }) }} />
      </head>
      <body className="antialiased min-h-screen flex flex-col items-center">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
