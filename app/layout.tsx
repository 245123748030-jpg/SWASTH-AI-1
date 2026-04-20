import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SwasthAI – Indian Lifestyle Intelligence",
  description: "AI-powered platform for Indian lifestyle guidance, diet planning, and fitness.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-full bg-background text-foreground antialiased`}>
        <div className="min-h-full bg-[radial-gradient(circle_at_top,_rgba(255,122,0,0.22),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(255,122,0,0.16),_transparent_40%)]">
          <nav className="sticky top-0 z-50 border-b border-white/10 bg-card-bg/95 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 px-6 py-4">
              <Link href="/" className="text-accent text-3xl font-black tracking-tight">
                SwasthAI
              </Link>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-foreground/90">
                <Link href="/" className="transition hover:text-accent">Home</Link>
                <Link href="/diet" className="transition hover:text-accent">Diet Planner</Link>
                <Link href="/fitness" className="transition hover:text-accent">Fitness</Link>
                <Link href="/profile" className="transition hover:text-accent">Profile</Link>
              </div>
            </div>
          </nav>
          <main className="min-h-screen pb-16">{children}</main>
        </div>
      </body>
    </html>
  );
}
