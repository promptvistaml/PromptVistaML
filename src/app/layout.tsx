import type { Metadata } from "next";

const siteUrl = "https://promptvistaml.com";
const title = "Prompt VistaML — Apps, Websites & Business Consulting";
const description =
  "Prompt VistaML builds high-performance apps and websites tailored to business needs. Expert software engineering, UX design, and digital consulting.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Prompt VistaML",
  },
  description,
  keywords: [
    "Prompt VistaML",
    "web development",
    "mobile app development",
    "business consulting",
    "software engineering",
    "digital agency",
    "high performance websites",
    "Next.js developers",
    "React apps",
  ],
  authors: [{ name: "Prompt VistaML", url: siteUrl }],
  creator: "Prompt VistaML",
  publisher: "Prompt VistaML",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/assets/images/PJqBGXIf1Z2Mf0JgEFIiAcpVu8-8fa774c6.avif",
    apple: "/assets/images/PJqBGXIf1Z2Mf0JgEFIiAcpVu8-8fa774c6.avif",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title,
    description,
    siteName: "Prompt VistaML",
    images: [
      {
        url: "/assets/images/PJqBGXIf1Z2Mf0JgEFIiAcpVu8-8fa774c6.avif",
        width: 1200,
        height: 630,
        alt: "Prompt VistaML — Apps, Websites & Business Consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/assets/images/PJqBGXIf1Z2Mf0JgEFIiAcpVu8-8fa774c6.avif"],
    creator: "@promptvistaml",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Prompt VistaML",
      url: siteUrl,
      logo: `${siteUrl}/assets/images/PJqBGXIf1Z2Mf0JgEFIiAcpVu8-8fa774c6.avif`,
      email: "promptvistaml@gmail.com",
      sameAs: [
        "https://www.linkedin.com/company/promptvistaml/",
        "https://x.com/",
        "https://www.instagram.com/",
      ],
      description:
        "Prompt VistaML builds apps and websites around business needs. We understand how a business works and recommend practical digital tools.",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Prompt VistaML",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html dir="ltr" lang="en-US">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link
          rel="modulepreload"
          fetchPriority="low"
          href="/assets/js/rolldown-runtime.Bi-D_2cA-4b950d10.js"
        />
        <link
          rel="modulepreload"
          fetchPriority="low"
          href="/assets/js/react.Dxe_2v0O-9f8d587b.js"
        />
        <link
          rel="modulepreload"
          fetchPriority="low"
          href="/assets/js/framer.BOchsRVo-e73ce05d.js"
        />
        <link
          rel="modulepreload"
          fetchPriority="low"
          href="/assets/js/motion.uuI6oBln-f97e378a.js"
        />
        <link
          rel="modulepreload"
          fetchPriority="low"
          href="/assets/js/toplevel-deps.S21e7Jjg-35ca8526.js"
        />
        <link
          rel="modulepreload"
          fetchPriority="low"
          href="/assets/js/K0Y3DARLH9p3O-lHGzsp2QcB9fmJAwHwjc2MySEHPzU.BD4Iv-z6-ea784c8c.js"
        />
        <link
          rel="modulepreload"
          fetchPriority="low"
          href="/assets/js/Yeg_RsUmk.BF_2qa7z-3fab8c3d.js"
        />
        <link
          rel="modulepreload"
          fetchPriority="low"
          href="/assets/js/shared-lib.3X3NJPWs-2d9a4cc0.js"
        />
        <link
          rel="modulepreload"
          fetchPriority="low"
          href="/assets/js/AwardImage.CDSKYCRL-55c85f92.js"
        />
        <link
          rel="modulepreload"
          fetchPriority="low"
          href="/assets/js/InteractiveHeadline.w5GQ_Y_L-5786dea3.js"
        />
        <link
          rel="modulepreload"
          fetchPriority="low"
          href="/assets/js/LiveTime.BGLvU4kT-2a4c4c71.js"
        />
        <link
          rel="modulepreload"
          fetchPriority="low"
          href="/assets/js/augiA20Il.CPvsRX_6-e333d7a6.js"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
