import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { getSiteSettings } from "@/modules/settings/site-settings.service";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jidan Fatahillah — Full Stack Web Engineer",
  description:
    "Portfolio of Jidan Fatahillah, a Full Stack Web Engineer specializing in enterprise applications, business-process systems, SAP integration, and external API integration.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-1 flex-col">
            <Navbar />
            {children}
          </div>
          <Footer
            fullName="Jidan Fatahillah"
            githubUrl={siteSettings?.socialLinks?.github}
            linkedinUrl={siteSettings?.socialLinks?.linkedin}
            publicEmail={siteSettings?.publicEmail}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
