import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const b = "https://free-generators.vercel.app";
  return [
    { url: b, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${b}/password`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${b}/qr`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${b}/name`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${b}/uuid`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${b}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];
}
