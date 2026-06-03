import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatSar, getAlternativeByLuxurySlug, productAlternatives, getProductById } from "@/lib/data";

type AlternativePageProps = {
  params: Promise<{ slug: string }>;
};

function parseAlternativeSlug(slug: string) {
  if (!slug.endsWith("-alternative")) {
    return null;
  }

  return slug.replace(/-alternative$/, "");
}

export function generateStaticParams() {
  return productAlternatives
    .map((alternative) => getProductById(alternative.luxury_product_id))
    .filter(Boolean)
    .map((product) => ({ slug: `${product?.slug}-alternative` }));
}

export async function generateMetadata({ params }: AlternativePageProps): Promise<Metadata> {
  const { slug } = await params;
  const luxurySlug = parseAlternativeSlug(slug);
  const data = luxurySlug ? getAlternativeByLuxurySlug(luxurySlug) : null;

  if (!data) {
    return { title: "بديل غير متاح" };
  }

  return {
    title: `بديل ${data.luxuryProduct.brand} الذكي وفر ${data.relation.saving_percentage}%`,
    description: `مقارنة سعودية بين ${data.luxuryProduct.title} و${data.alternativeProduct.title} مع مميزات وعيوب وخلاصة AI واضحة.`,
    alternates: { canonical: `/sa/alternative/${slug}` },
  };
}

export default async function AlternativePage({ params }: AlternativePageProps) {
  const { slug } = await params;
  const luxurySlug = parseAlternativeSlug(slug);
  const data = luxurySlug ? getAlternativeByLuxurySlug(luxurySlug) : null;

  if (!data) {
    notFound();
  }

  const { luxuryProduct, alternativeProduct, relation, summary } = data;

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <p className="text-sm font-black text-emerald-600">مقارنة AI للسوق السعودي</p>
        <h1 className="mx-auto mt-3 max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">
          بديل ذكي لـ {luxuryProduct.brand} يوفر عليك {relation.saving_percentage}%
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-9 text-slate-600">
          مقارنة مباشرة توضح متى يستحق المنتج الفاخر سعره، ومتى يمنحك البديل نفس الإحساس بسعر أوفر.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <article className="premium-card order-2 overflow-hidden rounded-[2rem] lg:order-1">
          <div className="relative aspect-[4/3] bg-emerald-50">
            <Image src={alternativeProduct.image_url} alt={alternativeProduct.title} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
            <span className="absolute right-5 top-5 rounded-full bg-emerald-500 px-5 py-2 text-lg font-black text-white shadow-xl">وفر {relation.saving_percentage}%</span>
          </div>
          <div className="p-7">
            <p className="text-sm font-black text-emerald-600">البديل الذكي الموصى به</p>
            <h2 className="mt-3 text-3xl font-black text-slate-950">{alternativeProduct.title}</h2>
            <p className="mt-2 text-slate-500">{alternativeProduct.brand} · {alternativeProduct.source_platform}</p>
            <div className="mt-6 flex items-center justify-between rounded-2xl bg-emerald-50 p-5">
              <span className="font-bold text-slate-700">السعر</span>
              <strong className="text-3xl font-black text-emerald-700">{formatSar(alternativeProduct.price)}</strong>
            </div>
            <Link href={`/api/redirect?productId=${alternativeProduct.id}`} className="mt-6 block rounded-full bg-emerald-500 px-6 py-4 text-center font-black text-white shadow-lg shadow-emerald-500/25 transition hover:-translate-y-0.5 hover:bg-emerald-400">
              انتقل للعرض الآمن
            </Link>
          </div>
        </article>

        <article className="premium-card order-1 overflow-hidden rounded-[2rem] lg:order-2">
          <div className="relative aspect-[4/3] bg-slate-100">
            <Image src={luxuryProduct.image_url} alt={luxuryProduct.title} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
          <div className="p-7">
            <p className="text-sm font-black text-slate-500">المنتج الفاخر</p>
            <h2 className="mt-3 text-3xl font-black text-slate-950">{luxuryProduct.title}</h2>
            <p className="mt-2 text-slate-500">{luxuryProduct.brand} · {luxuryProduct.source_platform}</p>
            <div className="mt-6 flex items-center justify-between rounded-2xl bg-slate-50 p-5">
              <span className="font-bold text-slate-700">السعر</span>
              <strong className="text-3xl font-black text-slate-950">{formatSar(luxuryProduct.price)}</strong>
            </div>
          </div>
        </article>
      </div>

      <section className="premium-card mt-8 rounded-[2rem] p-6 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-black text-slate-950">المميزات</h2>
            <div className="mt-4 space-y-3">
              {summary.pros.slice(0, 3).map((pro) => (
                <div key={pro} className="flex gap-3 rounded-2xl bg-emerald-50 p-4 text-slate-800">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">✓</span>
                  <p className="font-bold leading-7">{pro}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-950">العيوب</h2>
            <div className="mt-4 space-y-3">
              {summary.cons.slice(0, 3).map((con) => (
                <div key={con} className="flex gap-3 rounded-2xl bg-amber-50 p-4 text-slate-800">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-amber-400 text-slate-950">!</span>
                  <p className="font-bold leading-7">{con}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-[1.5rem] bg-slate-950 p-6 text-white sm:p-8">
          <p className="text-sm font-black text-emerald-300">الخلاصة</p>
          <p className="mt-3 text-xl font-bold leading-10 text-slate-100">{summary.final_verdict}</p>
        </div>
      </section>
    </section>
  );
}
