import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { EditModeProvider } from "@/contexts/EditModeContext";

const notoSansJP = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: "女声コーラス 風 | 北九州市黒崎の合唱団",
  description: "北九州市八幡西区黒崎を拠点とする女声コーラス団体「風」の公式ホームページ。コムシティで毎週木曜日に練習。初心者歓迎。女性コーラス、合唱団、団員募集中。",
  keywords: [
    "女声コーラス風",
    "女声コーラス 風",
    "女性コーラス 風",
    "北九州 合唱団",
    "黒崎 合唱",
    "北九州市 女声コーラス",
    "八幡西区 合唱",
    "コムシティ 合唱",
    "北九州 女性コーラス",
    "黒崎 女声コーラス",
    "合唱団 団員募集",
    "女声合唱 北九州",
  ],
  openGraph: {
    title: "女声コーラス 風 | 北九州市黒崎の合唱団",
    description: "北九州市八幡西区黒崎を拠点とする女声コーラス団体「風」。コムシティで毎週木曜日に練習。初心者歓迎、団員募集中。",
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "女声コーラス 風 | 北九州市黒崎の合唱団",
    description: "北九州市八幡西区黒崎を拠点とする女声コーラス団体「風」。初心者歓迎、団員募集中。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://kaze-hp.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MusicGroup",
              "name": "女声コーラス 風",
              "alternateName": ["女性コーラス 風", "女声コーラス風"],
              "description": "北九州市八幡西区黒崎を拠点とする女声コーラス団体",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "北九州市",
                "addressRegion": "福岡県",
                "addressCountry": "JP",
                "streetAddress": "八幡西区黒崎",
              },
              "genre": ["合唱", "女声コーラス", "クラシック"],
              "memberOf": {
                "@type": "Organization",
                "name": "女声コーラス 風",
              },
              "location": {
                "@type": "Place",
                "name": "コムシティ",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "北九州市",
                  "addressRegion": "福岡県",
                  "streetAddress": "八幡西区黒崎",
                },
              },
              "event": {
                "@type": "Event",
                "name": "定期練習",
                "description": "毎週木曜日の定期練習",
                "startDate": "2025-01-01",
                "eventSchedule": {
                  "@type": "Schedule",
                  "repeatFrequency": "P1W",
                  "byDay": "Thursday",
                  "startTime": "10:00",
                  "endTime": "13:00",
                },
              },
            }),
          }}
        />
      </head>
      <body
        className={`${notoSansJP.variable} font-sans antialiased`}
      >
        <AuthProvider>
          <EditModeProvider>
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </EditModeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
