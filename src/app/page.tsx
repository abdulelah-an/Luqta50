import Link from "next/link";
import SavingsCalculator from "@/components/SavingsCalculator";
import { categories, productAlternatives, getProductById, formatSar } from "@/lib/data";

export default function HomePage() {
  const featuredAlternatives = productAlternatives
    .map((alternative) => ({
      relation: alternative,
      luxury: getProductById(alternative.luxury_product_id),
      smart: getProductById(alternative.alternative_product_id),
    }))
    .filter((item) => item.luxury && item.smart);

  return (
    <>
      <section className="relative overflow-hidden px-4 pb-10 pt-20 sm:px-6 lg:px-8 lg:pt-28">
        <div className="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-gradient-to-b from-emerald-100/70 via-blue-50/70 to-transparent" />
        <div className="mx-auto max-w-5xl text-center">
          <p className="mx-auto mb-6 inline-flex rounded-full border border-emerald-200 bg-white/80 px-5 py-2 text-sm font-black text-emerald-700 shadow-sm">
            مصمم للسوق السعودي، سريع، ذكي، ومربح بالعمولة
          </p>
          <h1 className="text-5xl font-black tracking-tight text-slate-950 sm:text-7xl lg:text-8xl">
            لقطة AI. المحرك الذكي لخياراتك الذكية.
          </h1>
          <p className="mx-auto mt-7 max-w-3xl text-xl leading-9 text-slate-600">
            اكتشف بدائل مطابقة للمنتجات الفاخرة، اقرأ خلاصة AI مختصرة، ثم انتقل للشراء عبر رابط موثوق بدون ضوضاء أو مبالغة.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="#calculator" className="rounded-full bg-slate-950 px-8 py-4 text-base font-black text-white shadow-2xl shadow-slate-900/20 transition hover:-translate-y-1">
              ابدأ بحساب التوفير
            </Link>
            <Link href="/sa/alternative/ysl-monogram-leather-bag-alternative" className="rounded-full border border-slate-200 bg-white px-8 py-4 text-base font-black text-slate-950 transition hover:-translate-y-1 hover:border-emerald-300">
              شاهد مثال بديل ذكي
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-4 md:grid-cols-4">
          {categories.map((category) => (
            <Link key={category.id} href={`/sa/price/${category.slug}-5000-sar`} className="premium-card rounded-[1.5rem] p-5 transition hover:-translate-y-1 hover:border-emerald-300">
              <span className="text-sm font-bold text-emerald-600">دليل أسعار</span>
              <h2 className="mt-2 text-xl font-black text-slate-950">{category.name}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">أفضل خيارات تحت ميزانيتك مع تقييمات قابلة للظهور في Google.</p>
            </Link>
          ))}
        </div>
      </section>

      <SavingsCalculator />

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black text-emerald-600">بدائل مختارة بالذكاء الاصطناعي</p>
            <h2 className="mt-2 text-4xl font-black tracking-tight text-slate-950">نفس الإحساس الفاخر. سعر أذكى.</h2>
          </div>
          <p className="max-w-xl leading-8 text-slate-600">كل بطاقة مصممة كصفحة pSEO قابلة للأرشفة، مع خلاصة AI وروابط تحويل نظيفة.</p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {featuredAlternatives.map(({ relation, luxury, smart }) => (
            <Link key={relation.id} href={`/sa/alternative/${luxury?.slug}-alternative`} className="premium-card rounded-[1.75rem] p-5 transition hover:-translate-y-1 hover:border-emerald-300">
              <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-black text-white">وفر {relation.saving_percentage}%</span>
              <h3 className="mt-5 text-lg font-black text-slate-950">بديل {luxury?.brand}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{smart?.title}</p>
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-sm text-slate-500">السعر الذكي</span>
                <strong className="text-slate-950">{smart ? formatSar(smart.price) : ""}</strong>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
