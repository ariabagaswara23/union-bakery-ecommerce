import ProductDetail from "@/components/product/ProductDetail";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log("Product slug:", slug);
  return <ProductDetail slug={slug} />;
}
