import "./globals.css";
import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Schibsted_Grotesk } from "next/font/google";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Analytics } from "@vercel/analytics/react";

const grotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-grotesk",
});

// Only used for the readouts on the hero figure.
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://samyakraka.vercel.app"),
  title: "Samyak Raka | AI Systems Engineer @ Crowdera",
  description:
    "Associate Software Engineer, AI Systems at Crowdera. AI/ML, LLMs, RAG and AI agents. 4× hackathon winner from Nashik, India.",
  openGraph: {
    title: "Samyak Raka | AI Systems Engineer @ Crowdera",
    description: "AI/ML, LLMs, RAG and AI agents. 4× hackathon winner.",
    url: "https://samyakraka.vercel.app/",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#EDF1FA" },
    { media: "(prefers-color-scheme: dark)", color: "#0A1330" },
  ],
};

const themeScript = `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${grotesk.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
