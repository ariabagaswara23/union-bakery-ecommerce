// components/ProductCard.tsx

import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { getMockProductBadge } from "@/lib/mockBadges";
import { ProductBadge } from "./ProductBadge";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const badgeLabel = getMockProductBadge(product.handle);

  const formatPrice = (amount: string) => {
    return Math.round(parseFloat(amount) / 1000);
  };

  return (
    <Link href={`/products/${product.handle}`}>
      <Card className="bg-transparent border-0 shadow-none rounded-none group gap-y-2!">
        <div className="relative">
          {badgeLabel && <ProductBadge label={badgeLabel} />}
          <div className="overflow-hidden">
            {product?.media?.nodes[0] ? (
              <Image
                src={product.media.nodes[0].previewImage.url}
                alt={
                  product.media.nodes[0].previewImage.altText || product.title
                }
                width={300}
                height={300}
                className="rounded-none w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full aspect-square bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No image</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-row justify-between items-start mt-2">
          <h3 className="text-sm md:text-lg font-semibold text-[#211D1F] uppercase line-clamp-2 flex-1">
            {product.title}
          </h3>
          <span
            style={{ fontFamily: "var(--font-rozha)" }}
            className="text-base md:text-xl font-normal text-[#661419] w-1/4 text-end ml-2 flex-shrink-0"
          >
            {formatPrice(product.priceRange.maxVariantPrice.amount)}
          </span>
        </div>
      </Card>
    </Link>
  );
}
