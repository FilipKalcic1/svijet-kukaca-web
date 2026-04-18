import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import ProductDetails from "@/components/ProductDetails";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ slug: string }> };

export const revalidate = 3600;

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const { data } = await supabase
    .from("creatures")
    .select("name_hr, name_science, description, creature_type")
    .eq("slug", slug)
    .maybeSingle();

  if (!data) return { title: "Proizvod - Svijet Kukaca" };

  const siteName = data.creature_type === "fish" ? "Svijet Riba" : "Svijet Kukaca";
  return {
    title: `${data.name_hr} Majica | ${siteName}`,
    description: data.description?.slice(0, 160) || `Kupi majicu s motivom ${data.name_hr} (${data.name_science})`,
  };
}

export default async function ProductPage(props: PageProps) {
  const { slug } = await props.params;
  const { data: product } = await supabase
    .from("creatures")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (!product) return notFound();

  return (
    <div data-theme={product.creature_type === "fish" ? "fish" : undefined}>
      <ProductDetails product={product} />
    </div>
  );
}
