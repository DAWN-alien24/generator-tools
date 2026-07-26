import type { Metadata } from "next";
import ClientShell from "@/components/ClientShell";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Free Online Generators — Password, QR Code, Name, UUID",
    template: "%s | Generators",
  },
  description:
    "Free online generators: strong passwords, QR codes, random names, UUIDs. Instant, private, no signup required.",
  keywords: [
    "password generator", "QR code generator", "random name generator",
    "UUID generator", "free online tools", "secure password", "online generator",
    "密碼產生器", "QR Code 產生器", "隨機名字", "パスワード生成器",
  ],
  openGraph: {
    type: "website",
    title: "Free Online Generators",
    description: "Password, QR Code, Name, UUID — free, instant, private.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <meta name="google-site-verification" content="eUYbcSrqe4-RxfEYHv_jrv5DSoIItoTV_jiFq_U3hhY" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2613042507827449"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Free Online Generators",
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "Web",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            }),
          }}
        />
      </head>
      <body className="antialiased min-h-screen">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
