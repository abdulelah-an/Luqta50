export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Product = {
  id: string;
  category_id: string;
  title: string;
  slug: string;
  brand: string;
  price: number;
  currency: "SAR";
  image_url: string;
  affiliate_url: string;
  source_platform: string;
  rating: number;
  reviews_count: number;
};

export type AiSummary = {
  id: string;
  product_id: string;
  pros: string[];
  cons: string[];
  final_verdict: string;
};

export type ProductAlternative = {
  id: string;
  luxury_product_id: string;
  alternative_product_id: string;
  saving_percentage: number;
};

export const categories: Category[] = [
  { id: "cat-bags", name: "الحقائب الفاخرة", slug: "luxury-bags" },
  { id: "cat-watches", name: "الساعات الذكية", slug: "smart-watches" },
  { id: "cat-perfumes", name: "العطور", slug: "perfumes" },
  { id: "cat-headphones", name: "السماعات", slug: "headphones" },
];

export const products: Product[] = [
  {
    id: "prd-ysl-bag",
    category_id: "cat-bags",
    title: "حقيبة جلد فاخرة مونوغرام",
    slug: "ysl-monogram-leather-bag",
    brand: "YSL",
    price: 9200,
    currency: "SAR",
    image_url: "https://images.unsplash.com/photo-1589999542157-712d03b1aa1b?auto=format&fit=crop&w=900&q=80",
    affiliate_url: "https://www.amazon.sa/dp/B0BAGLUX?tag=luqta-ai-21",
    source_platform: "أمازون السعودية",
    rating: 4.8,
    reviews_count: 386,
  },
  {
    id: "prd-charles-bag",
    category_id: "cat-bags",
    title: "حقيبة كتف جلدية بتصميم مونوغرام ذكي",
    slug: "charles-keith-monogram-smart-bag",
    brand: "Charles & Keith",
    price: 5980,
    currency: "SAR",
    image_url: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=80",
    affiliate_url: "https://www.amazon.sa/dp/B0BAGALT?tag=luqta-ai-21",
    source_platform: "نون السعودية",
    rating: 4.6,
    reviews_count: 1244,
  },
  {
    id: "prd-apple-watch-ultra",
    category_id: "cat-watches",
    title: "ساعة ذكية ألترا بهيكل تيتانيوم",
    slug: "apple-watch-ultra-titanium",
    brand: "Apple",
    price: 3199,
    currency: "SAR",
    image_url: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=900&q=80",
    affiliate_url: "https://www.amazon.sa/dp/B0WATCHLUX?tag=luqta-ai-21",
    source_platform: "أمازون السعودية",
    rating: 4.9,
    reviews_count: 2157,
  },
  {
    id: "prd-huawei-watch-gt",
    category_id: "cat-watches",
    title: "ساعة ذكية رياضية بعمر بطارية طويل",
    slug: "huawei-watch-gt-smart-value",
    brand: "Huawei",
    price: 1899,
    currency: "SAR",
    image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    affiliate_url: "https://www.amazon.sa/dp/B0WATCHALT?tag=luqta-ai-21",
    source_platform: "جرير",
    rating: 4.7,
    reviews_count: 983,
  },
  {
    id: "prd-niche-perfume",
    category_id: "cat-perfumes",
    title: "عطر نيش شرقي بتركيز عالٍ",
    slug: "niche-oriental-perfume",
    brand: "Maison Luxe",
    price: 1450,
    currency: "SAR",
    image_url: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80",
    affiliate_url: "https://www.amazon.sa/dp/B0PERFLUX?tag=luqta-ai-21",
    source_platform: "سيفورا السعودية",
    rating: 4.7,
    reviews_count: 604,
  },
  {
    id: "prd-arabian-perfume",
    category_id: "cat-perfumes",
    title: "عطر شرقي فاخر بثبات يوم كامل",
    slug: "arabian-oud-long-lasting-perfume",
    brand: "Arabian Oud",
    price: 890,
    currency: "SAR",
    image_url: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80",
    affiliate_url: "https://www.amazon.sa/dp/B0PERFALT?tag=luqta-ai-21",
    source_platform: "أمازون السعودية",
    rating: 4.5,
    reviews_count: 1740,
  },
  {
    id: "prd-bose-headphones",
    category_id: "cat-headphones",
    title: "سماعة عزل ضوضاء فاخرة للسفر والعمل",
    slug: "bose-noise-cancelling-luxury-headphones",
    brand: "Bose",
    price: 1499,
    currency: "SAR",
    image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    affiliate_url: "https://www.amazon.sa/dp/B0AUDLUX?tag=luqta-ai-21",
    source_platform: "إكسترا",
    rating: 4.8,
    reviews_count: 3271,
  },
  {
    id: "prd-sony-headphones",
    category_id: "cat-headphones",
    title: "سماعة لاسلكية بعزل ذكي وصوت غني",
    slug: "sony-wireless-smart-noise-cancelling-headphones",
    brand: "Sony",
    price: 999,
    currency: "SAR",
    image_url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80",
    affiliate_url: "https://www.amazon.sa/dp/B0AUDALT?tag=luqta-ai-21",
    source_platform: "أمازون السعودية",
    rating: 4.6,
    reviews_count: 4520,
  },
];

export const aiSummaries: AiSummary[] = [
  {
    id: "ai-charles-bag",
    product_id: "prd-charles-bag",
    pros: ["تصميم قريب جداً من الفئة الفاخرة", "جلد عملي مناسب للاستخدام اليومي", "سعر أقل مع حضور بصري أنيق"],
    cons: ["لا يحمل قيمة إعادة بيع عالية", "المساحة الداخلية محدودة", "الحواف تحتاج عناية مستمرة"],
    final_verdict: "الخيار الأنسب لمن يريد مظهراً فاخراً في الرياض أو جدة بدون دفع سعر العلامة الأصلية. المطابقة البصرية عالية والتوفير واضح.",
  },
  {
    id: "ai-huawei-watch",
    product_id: "prd-huawei-watch-gt",
    pros: ["بطارية طويلة تناسب السفر", "تصميم معدني أنيق", "تتبع صحي ورياضي متقدم"],
    cons: ["تكامل التطبيقات أقل من بعض المنافسين", "لا يناسب من يحتاج متجر تطبيقات ضخم", "الشاحن خاص بالجهاز"],
    final_verdict: "بديل ممتاز لمشتري الساعة الذكية الفاخرة عندما تكون الأولوية للبطارية والمظهر الراقي مقابل سعر أكثر ذكاءً.",
  },
  {
    id: "ai-arabian-perfume",
    product_id: "prd-arabian-perfume",
    pros: ["ثبات قوي في الأجواء السعودية", "طابع شرقي فاخر", "قيمة ممتازة مقابل الحجم"],
    cons: ["الافتتاحية قوية للبعض", "يحتاج رشات قليلة فقط", "ليس مناسباً لمن يفضل الروائح الخفيفة جداً"],
    final_verdict: "اختيار ذكي لمن يحب العطور الشرقية الفاخرة ويريد توفيراً ملموساً مع أداء يومي موثوق.",
  },
  {
    id: "ai-sony-headphones",
    product_id: "prd-sony-headphones",
    pros: ["عزل ضوضاء فعال", "صوت متوازن للموسيقى والبودكاست", "وزن مريح للاستخدام الطويل"],
    cons: ["اللمسة الخارجية حساسة", "الحافظة أكبر من المتوقع", "السعر يتغير كثيراً حسب العروض"],
    final_verdict: "بديل عملي وفاخر الإحساس لمن يريد جودة سفر ومكالمات ممتازة مع توفير واضح عن السماعات الأعلى سعراً.",
  },
];

export const productAlternatives: ProductAlternative[] = [
  { id: "alt-bag", luxury_product_id: "prd-ysl-bag", alternative_product_id: "prd-charles-bag", saving_percentage: 35 },
  { id: "alt-watch", luxury_product_id: "prd-apple-watch-ultra", alternative_product_id: "prd-huawei-watch-gt", saving_percentage: 41 },
  { id: "alt-perfume", luxury_product_id: "prd-niche-perfume", alternative_product_id: "prd-arabian-perfume", saving_percentage: 39 },
  { id: "alt-headphones", luxury_product_id: "prd-bose-headphones", alternative_product_id: "prd-sony-headphones", saving_percentage: 33 },
];

export function formatSar(price: number) {
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getSummaryByProductId(productId: string) {
  return aiSummaries.find((summary) => summary.product_id === productId);
}

export function getProductsByCategoryAndBudget(categorySlug: string, budget: number) {
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return [];
  }

  return products
    .filter((product) => product.category_id === category.id && product.price <= budget)
    .sort((first, second) => second.rating - first.rating || first.price - second.price);
}

export function getAlternativeByLuxurySlug(luxurySlug: string) {
  const luxuryProduct = getProductBySlug(luxurySlug);

  if (!luxuryProduct) {
    return null;
  }

  const relation = productAlternatives.find((alternative) => alternative.luxury_product_id === luxuryProduct.id);
  const alternativeProduct = relation ? getProductById(relation.alternative_product_id) : undefined;
  const summary = alternativeProduct ? getSummaryByProductId(alternativeProduct.id) : undefined;

  if (!relation || !alternativeProduct || !summary) {
    return null;
  }

  return { luxuryProduct, alternativeProduct, relation, summary };
}
