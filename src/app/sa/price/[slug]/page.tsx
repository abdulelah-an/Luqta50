import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type PricePageProps = {
  params: Promise<{ slug: string }>;
};

function parsePriceSlug(slug: string) {
> main
  };
}

export function generateStaticParams() {
  return categories.flatMap((category) => [3000, 5000, 10000].map((budget) => ({ slug: `${category.slug}-${budget}-sar` })));
}

export async function generateMetadata({ params }: PricePageProps): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parsePriceSlug(slug);
  const category = parsed ? getCategoryBySlug(parsed.categorySlug) : null;

  if (!parsed || !category) {
    return { title: "دليل أسعار غير متاح" };
  }

  return {
    title: `${category.name} تحت ${parsed.budget} ريال`,
    description: `أفضل منتجات ${category.name} في السعودية تحت ميزانية ${parsed.budget} ريال مع تقييمات وأسعار وروابط شراء موثوقة.`,
    alternates: { canonical: `/sa/price/${slug}` },
  };
}

export default async function PriceCategoryPage({ params }: PricePageProps) {
  const { slug } = await params;
  const parsed = parsePriceSlug(slug);

  if (!parsed) {
    notFound();
  }

  const category = getCategoryBySlug(parsed.categorySlug);
  const matchingProducts = getProductsByCategoryAndBudget(parsed.categorySlug, parsed.budget);

  if (!category) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${category.name} تحت ${parsed.budget} ريال`,
    itemListElement: matchingProducts.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.title,
        brand: { "@type": "Brand", name: product.brand },
        image: product.image_url,
        offers: {
          "@type": "Offer",
          priceCurrency: product.currency,
          price: product.price,
          availability: "https://schema.org/InStock",
          url: `https://luqta.ai/api/redirect?productId=${product.id}`,
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.reviews_count,
        },
      },
    })),
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="premium-card overflow-hidden rounded-[2rem] p-8 sm:p-12">
        <p className="text-sm font-black text-emerald-600">دليل أسعار السعودية</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">
          أفضل {category.name} تحت {formatSar(parsed.budget)}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-9 text-slate-600">
          صفحة مهيأة لمحركات البحث تجمع المنتجات الأعلى تقييماً ضمن ميزانيتك، مع روابط تحويل آمنة وتقييمات بنيوية تدعم الظهور الغني في نتائج Google.
        </p>
      </div>

      {matchingProducts.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {matchingProducts.map((product) => (
            <article key={product.id} className="premium-card overflow-hidden rounded-[1.75rem] transition hover:-translate-y-1 hover:border-emerald-300">
              <div className="relative aspect-[4/3] bg-slate-100">
                <Image src={product.image_url} alt={product.title} fill className="object-cover" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-bold text-emerald-600">{product.source_platform}</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 font-black text-slate-700">★ {product.rating}</span>
                </div>
                <h2 className="mt-4 text-xl font-black leading-8 text-slate-950">{product.title}</h2>
                <p className="mt-2 text-sm font-bold text-slate-500">{product.brand} · {product.reviews_count.toLocaleString("ar-SA")} مراجعة</p>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <strong className="text-2xl font-black text-slate-950">{formatSar(product.price)}</strong>
                  <Link href={`/api/redirect?productId=${product.id}`} className="rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-500">
                    عرض السعر
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-[1.75rem] border border-dashed border-slate-300 bg-white p-10 text-center">
          <h2 className="text-2xl font-black text-slate-950">لا توجد منتجات ضمن هذه الميزانية حالياً</h2>
          <p className="mt-3 text-slate-600">جرّب رفع الميزانية أو تصفح فئة أخرى من الفئات المقترحة.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {categories.map((item) => (
              <Link key={item.id} href={`/sa/price/${item.slug}-5000-sar`} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-emerald-100">
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
