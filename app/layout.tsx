import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { languages, stackLayers } from "@/consts/skills";
import { email, github, instagram, linkedin } from "@/consts/socials";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const description =
  "Desenvolvedor Full-Stack em Brasília. Construo aplicações web completas com React, Next.js, NestJS, Prisma e PostgreSQL.";

const siteUrl = "https://gabriel-pimentel-portfolio.vercel.app";
const title = "Gabriel Pimentel | Desenvolvedor Full-Stack";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    type: "website",
    locale: "pt_BR",
    siteName: "Gabriel Pimentel",
  },
  twitter: { card: "summary_large_image", title, description },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Gabriel Pimentel",
  jobTitle: "Desenvolvedor Full-Stack",
  description,
  url: siteUrl,
  email: `mailto:${email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Brasília",
    addressCountry: "BR",
  },
  sameAs: [github.href, linkedin.href, instagram.href],
  knowsAbout: [...languages, ...stackLayers.flatMap(layer => layer.skills)].map(
    skill => skill.name,
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${bricolage.variable} overflow-x-hidden antialiased`}
      >
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD estático, montado só com constantes do repositório
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <a
            href="#conteudo"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-2000 focus:rounded-md focus:bg-primary focus:px-4 focus:py-3 focus:text-primary-foreground"
          >
            Pular para o conteúdo
          </a>
          <Toaster visibleToasts={2} expand />
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
