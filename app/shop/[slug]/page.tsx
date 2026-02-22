import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import ProductDetails from "@/components/ProductDetails";
import type { Metadata } from "next";

type PageProps = { params: Promise<{ slug: string }> };

export const revalidate = 3600;

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const { data } = await supabase
    .from("insects")
    .select("name_hr, name_science, description")
    .eq("slug", slug)
    .maybeSingle();

  if (!data) return { title: "Proizvod - Svijet Kukaca" };

  return {
    title: `${data.name_hr} Majica | Svijet Kukaca`,
    description: data.description?.slice(0, 160) || `Kupi majicu s kukcem ${data.name_hr} (${data.name_science})`,
  };
}

export default async function ProductPage(props: PageProps) {
  const { slug } = await props.params;
  const { data: product } = await supabase
    .from("insects")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (!product) return notFound();

  return <ProductDetails product={product} />;
}
