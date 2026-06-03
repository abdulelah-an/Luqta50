"use client";

import { useMemo, useState } from "react";
import { categories, formatSar } from "@/lib/data";

const categoryBaselines: Record<string, number> = {
  "luxury-bags": 8200,
  "smart-watches": 3100,
  perfumes: 1350,
  headphones: 1500,
};

export default function SavingsCalculator() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].slug);
  const [plannedPurchases, setPlannedPurchases] = useState(2);

  const calculation = useMemo(() => {
    const annualSpend = categoryBaselines[selectedCategory] * plannedPurchases;
    const savings = Math.round(annualSpend * 0.3);
    const matchPercentage = Math.min(98, 89 + plannedPurchases * 2);

    return { annualSpend, savings, matchPercentage };
  }, [plannedPurchases, selectedCategory]);

  const shareText = encodeURIComponent(
    "لقطة AI وفرت لي آلاف الريالات باقتراح بدائل ذكية ومطابقة بنسبة 95%! شيك على حجم توفيرك مجاناً هنا: https://luqta.ai",
  );

  return (
    <section id="calculator" className="relative mx-auto mt-16 max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-x-10 top-16 -z-10 h-56 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="premium-card grid overflow-hidden rounded-[2rem] lg:grid-cols-[1.1fr_0.9fr]">
        <div className="p-6 sm:p-10">
          <p className="mb-3 inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
            حاسبة التوفير السنوية الذكية
          </p>
          <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
            اكتشف كم ريال ممكن توفره قبل أول عملية شراء.
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            اختر الفئة وعدد مشترياتك المتوقعة، وسيحسب محرك لقطة AI بدائل سعودية ذكية بتوفير متوسط 30% ومطابقة عالية في الشكل والجودة.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-700">الفئة الفاخرة</span>
              <select
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold text-slate-700">عدد المشتريات السنوية</span>
              <input
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                type="number"
                min="1"
                max="12"
                value={plannedPurchases}
                onChange={(event) => setPlannedPurchases(Number(event.target.value))}
              />
            </label>
          </div>

          <input
            aria-label="عدد المشتريات السنوية"
            className="mt-8 w-full accent-emerald-500"
            type="range"
            min="1"
            max="12"
            value={plannedPurchases}
            onChange={(event) => setPlannedPurchases(Number(event.target.value))}
          />
        </div>

        <div className="bg-slate-950 p-6 text-white sm:p-10">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 shadow-2xl">
            <p className="text-sm font-bold text-emerald-300">توفيرك المتوقع</p>
            <strong className="mt-3 block text-5xl font-black tracking-tight text-white sm:text-6xl">
              {formatSar(calculation.savings)}
            </strong>
            <p className="mt-3 text-slate-300">من إنفاق سنوي تقريبي: {formatSar(calculation.annualSpend)}</p>

            <div className="mt-8 rounded-2xl bg-white p-4 text-slate-950">
              <div className="flex items-center justify-between gap-4">
                <span className="font-bold">نسبة المطابقة الذكية</span>
                <span className="rounded-full bg-emerald-500 px-3 py-1 text-sm font-black text-white">
                  {calculation.matchPercentage}%
                </span>
              </div>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${calculation.matchPercentage}%` }} />
              </div>
            </div>

            <a
              className="mt-6 flex items-center justify-center rounded-2xl bg-emerald-500 px-5 py-4 text-center font-black text-white shadow-lg shadow-emerald-950/30 transition hover:-translate-y-0.5 hover:bg-emerald-400"
              href={`https://wa.me/?text=${shareText}`}
              target="_blank"
              rel="noreferrer"
            >
              شارك نتيجتك على واتساب
            </a>
          </div>
        </div>
      </div>

      <a
        aria-label="مشاركة لقطة AI على واتساب"
        className="fixed bottom-6 left-6 z-50 rounded-full bg-emerald-500 px-5 py-4 text-sm font-black text-white shadow-2xl shadow-emerald-900/30 transition hover:-translate-y-1 hover:bg-emerald-400"
        href={`https://wa.me/?text=${shareText}`}
        target="_blank"
        rel="noreferrer"
      >
        واتساب
      </a>
    </section>
  );
}
