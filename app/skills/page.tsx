import Link from "next/link";
import { skills, categories } from "@/app/data/skills";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "5,000+ OpenClaw Skills Directory | SetupClaw",
  description:
    "Browse 5,000+ community-built OpenClaw skills organized by category. Find skills for email, calendar, GitHub, Slack, and more.",
};

const CALENDLY_URL = "https://calendly.com/your-link";

export default function SkillsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  // Since this is a server component we use sync access via props
  // For filtering we'll use client-side with URL params
  return <SkillsContent />;
}

function SkillsContent() {
  const totalSkills = skills.length;

  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto border-b border-white/10">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">🦾</span>
          <span className="font-semibold tracking-tight">SetupClaw</span>
        </Link>
        <Link
          href={CALENDLY_URL}
          target="_blank"
          className="text-sm bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-white/90 transition-colors"
        >
          Book a call →
        </Link>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-3">
            {totalSkills.toLocaleString()}+ OpenClaw Skills
          </h1>
          <p className="text-white/50 max-w-xl">
            Community-built skills that extend your AI agent. Browse by
            category, install with one command.
          </p>
        </div>

        {/* Categories */}
        <div className="mb-10">
          <h2 className="text-sm text-white/40 uppercase tracking-wider mb-4">
            Browse by category
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const count = skills.filter((s) => s.category === cat.slug).length;
              return (
                <Link
                  key={cat.slug}
                  href={`/skills/${cat.slug}`}
                  className="border border-white/10 rounded-full px-3 py-1.5 text-sm text-white/60 hover:text-white hover:border-white/30 transition-colors flex items-center gap-1.5"
                >
                  {cat.label}
                  <span className="text-white/30 text-xs">{count}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* All skills grid — show first 60, rest via category pages */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">All Skills</h2>
          <span className="text-sm text-white/40">
            Showing 60 of {totalSkills.toLocaleString()}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          {skills.slice(0, 60).map((skill) => (
            <Link
              key={skill.slug}
              href={`/skill/${skill.slug}`}
              className="border border-white/10 rounded-xl p-4 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="font-semibold text-sm group-hover:text-white">
                  {skill.name}
                </p>
                <span className="text-xs text-white/30 bg-white/5 px-1.5 py-0.5 rounded shrink-0">
                  {skill.categoryLabel.split(" ")[0]}
                </span>
              </div>
              <p className="text-xs text-white/40 line-clamp-2">
                {skill.description}
              </p>
            </Link>
          ))}
        </div>

        <p className="text-center text-white/40 text-sm mb-12">
          Browse all {totalSkills.toLocaleString()} skills by selecting a
          category above.
        </p>

        {/* CTA */}
        <div className="border border-white/10 rounded-2xl p-8 bg-white/[0.02] text-center">
          <h2 className="text-2xl font-bold mb-3">
            Don&apos;t want to set it up yourself?
          </h2>
          <p className="text-white/50 mb-6 max-w-md mx-auto">
            We install and configure the right skills for your workflow — done
            for you, same day, no technical knowledge needed.
          </p>
          <Link
            href={CALENDLY_URL}
            target="_blank"
            className="inline-block bg-white text-black px-8 py-3 rounded-xl font-semibold hover:bg-white/90 transition-colors"
          >
            Book a free call →
          </Link>
        </div>
      </div>
    </main>
  );
}
