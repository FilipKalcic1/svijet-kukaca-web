import { supabase } from "@/lib/supabase";
import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://svijetkukaca.hr";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ data: creatures }, { data: articles }] = await Promise.all([
    supabase.from("creatures").select("slug, created_at, creature_type"),
    supabase.from("articles").select("slug, created_at"),
  ]);

  const creaturePages: MetadataRoute.Sitemap = (creatures ?? []).flatMap(
    (creature) => [
      {
        url: `${BASE_URL}/shop/${creature.slug}`,
        lastModified: new Date(creature.created_at),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      },
      {
        url: `${BASE_URL}/wiki/${creature.slug}`,
        lastModified: new Date(creature.created_at),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      },
    ]
  );

  const articlePages: MetadataRoute.Sitemap = (articles ?? []).map(
    (article) => ({
      url: `${BASE_URL}/clanci/${article.slug}`,
      lastModified: new Date(article.created_at),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })
  );

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/kukci`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/ribe`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/o-projektu`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/clanci`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...creaturePages,
    ...articlePages,
  ];
}
