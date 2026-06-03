import type { Metadata } from "next";
import Link from "next/link";
import { Cairo, Inter } from "next/font/google";
import "./globals.css";
import { categories } from "@/lib/data";

const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://luqta.ai"),
  title: {
    default: "لقطة AI | بدائل ذكية وتوفير حقيقي في السعودية",
    template: "%s | لقطة AI",
  },
  description: "منصة pSEO وأفلييت سعودية تقترح بدائل ذكية للمنتجات الفاخرة مع ملخصات AI وتوفير واضح بالريال السعودي.",
  openGraph: {
    title: "لقطة AI",
    description: "المحرك الذكي لخياراتك الذكية في السعودية.",
    locale: "ar_SA",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${inter.variable}`}>
      <body>
        <header className="sticky top-0 z-40 border-b border-white/60 bg-white/75 backdrop-blur-2xl">
          <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8" aria-label="التنقل الرئيسي">
            <Link href="/" className="group flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-2xl bg-slate-950 text-lg font-black text-emerald-300 shadow-lg shadow-slate-900/20 transition group-hover:-rotate-6">
                ل
              </span>
              <span className="text-xl font-black tracking-tight text-slate-950">لقطة AI</span>
            </Link>

            <div className="no-scrollbar hidden items-center gap-2 overflow-x-auto rounded-full border border-slate-200/80 bg-white/80 p-1 md:flex">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/sa/price/${category.slug}-5000-sar`}
                  className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-950 hover:text-white"
                >
                  {category.name}
                </Link>
              ))}
            </div>

            <Link
              href="/#calculator"
              className="rounded-full bg-emerald-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:bg-emerald-400"
            >
              احسب توفيرك
            </Link>
          </nav>
        </header>

        <main>{children}</main>

        <footer className="mt-24 border-t border-slate-200 bg-slate-950 text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-white text-lg font-black text-slate-950">ل</span>
                <span className="text-2xl font-black">لقطة AI</span>
              </div>
              <p className="mt-4 max-w-xl leading-8 text-slate-300">
                منصة سعودية خفيفة وسريعة تساعدك تقارن بين الفاخر والذكي، وتحوّل البحث إلى قرار شراء أوضح وأوفر.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {categories.map((category) => (
                <Link key={category.id} className="text-slate-300 transition hover:text-emerald-300" href={`/sa/price/${category.slug}-5000-sar`}>
                  {category.name}
                </Link>
              ))}
              <Link className="text-slate-300 transition hover:text-emerald-300" href="/sa/alternative/ysl-monogram-leather-bag-alternative">
                بدائل فاخرة
              </Link>
              <Link className="text-slate-300 transition hover:text-emerald-300" href="/#calculator">
                حاسبة التوفير
              </Link>
            </div>
          </div>
          <div className="border-t border-white/10 px-4 py-5 text-center text-sm text-slate-400">
            © 2026 لقطة AI. توصياتنا تعتمد على بيانات وأسعار قابلة للتحديث.
          </div>
        </footer>
      </body>
    </html>
  );
}
