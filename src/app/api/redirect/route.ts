import { NextRequest, NextResponse } from "next/server";
import { getProductById } from "@/lib/data";

function decodeTarget(value: string) {
  try {
    return atob(value.replace(/-/g, "+").replace(/_/g, "/"));
  } catch {
    try {
      return decodeURIComponent(value);
    } catch {
      return null;
    }
  }
}

function isSafeCommerceUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && ["amazon.sa", "www.amazon.sa", "noon.com", "www.noon.com", "jarir.com", "www.jarir.com", "extra.com", "www.extra.com", "sephora.sa", "www.sephora.sa"].includes(url.hostname);
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  const productId = request.nextUrl.searchParams.get("productId");
  const encodedTarget = request.nextUrl.searchParams.get("target");
  const product = productId ? getProductById(productId) : undefined;
  const decodedTarget = encodedTarget ? decodeTarget(encodedTarget) : null;
  const destination = product?.affiliate_url ?? decodedTarget;

  if (!destination || !isSafeCommerceUrl(destination)) {
    return NextResponse.redirect(new URL("/", request.url), 302);
  }

  console.info("affiliate_click", {
    productId: product?.id ?? "encoded-target",
    source: request.headers.get("referer") ?? "direct",
    clickedAt: new Date().toISOString(),
  });

  return NextResponse.redirect(destination, {
    status: 302,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "Referrer-Policy": "origin-when-cross-origin",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
