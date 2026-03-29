import { notFound } from "next/navigation";
import Link from "next/link";
import { skills, categories, getSkillsByCategory } from "@/app/data/skills";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);
  if (!cat) return { title: "Category not found" };
  const count = getSkillsByCategory(category).length;
  return {
    title: `${cat.label} Skills (${count}) | SetupClaw`,
    description: `Browse ${count} OpenClaw skills in the ${cat.label} category.`,
  };
}

const CALENDLY_URL = "https://calendly.com/your-link";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);
  if (!cat) notFound();

  const categorySkills = getSkillsByCategory(category);

  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto border-b border-white/10">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">🦾</span>
          <span className="font-semibold tracking-tight">SetupClaw</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/skills" className="text-sm text-white/50 hover:text-white">
            All Skills
          </Link>
          <Link
            href={CALENDLY_URL}
            target="_blank"
            className="text-sm bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-white/90 transition-colors"
          >
            Book a call →
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
          <Link href="/skills" className="hover:text-white/70">
            Skills
          </Link>
          <span>/</span>
          <span className="text-white/60">{cat.label}</span>
        </div>

        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2">{cat.label}</h1>
          <p className="text-white/50">
            {categorySkills.length} skills in this category
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {categorySkills.map((skill) => (
            <Link
              key={skill.slug}
              href={`/skill/${skill.slug}`}
              className="border border-white/10 rounded-xl p-4 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
            >
              <p className="font-semibold text-sm mb-1 group-hover:text-white">
                {skill.name}
              </p>
              <p className="text-xs text-white/40 line-clamp-2">
                {skill.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center">
          <p className="text-white/40 text-sm mb-4">
            Need help installing and configuring these skills?
          </p>
          <Link
            href={CALENDLY_URL}
            target="_blank"
            className="inline-block bg-white text-black px-6 py-3 rounded-xl font-medium text-sm hover:bg-white/90 transition-colors"
          >
            Book a free call →
          </Link>
        </div>
      </div>
    </main>
  );
}
