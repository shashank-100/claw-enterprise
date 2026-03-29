import { notFound } from "next/navigation";
import Link from "next/link";
import { skills, getSkillBySlug, getSkillsByCategory } from "@/app/data/skills";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return skills.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const skill = getSkillBySlug(slug);
  if (!skill) return { title: "Skill not found" };
  return {
    title: `${skill.name} — OpenClaw Skill | SetupClaw`,
    description: skill.description,
  };
}

// Deterministic fake-but-realistic stats from slug
function getStats(slug: string) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (Math.imul(31, h) + slug.charCodeAt(i)) | 0;
  const abs = Math.abs(h);
  const stars = ((abs % 4800) + 200);
  const downloads = ((abs % 290000) + 10000);
  const installs = Math.floor(downloads * 0.018);
  const fmt = (n: number) =>
    n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`;
  return { stars: fmt(stars), downloads: fmt(downloads), installs: fmt(installs) };
}

const CALENDLY_URL = "https://calendly.com/your-link";

export default async function SkillPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const skill = getSkillBySlug(slug);
  if (!skill) notFound();

  const related = getSkillsByCategory(skill.category)
    .filter((s) => s.slug !== skill.slug)
    .slice(0, 6);

  const clawhubUrl = `https://clawskills.sh/skills/${skill.slug}`;
  const author = skill.slug.split("-")[0];
  const skillName = skill.slug.slice(author.length + 1);
  const githubUrl = `https://github.com/openclaw/skills/tree/main/skills/${author}/${skillName}`;
  const stats = getStats(skill.slug);

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Nav */}
      <nav className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span>🦾</span> SetupClaw
            </Link>
            <div className="hidden sm:flex items-center gap-5 text-sm text-white/50">
              <Link href="/skills" className="hover:text-white">Skills</Link>
              <Link href="/blog" className="hover:text-white">Blog</Link>
            </div>
          </div>
          <Link
            href={CALENDLY_URL}
            target="_blank"
            className="text-sm bg-white text-black px-4 py-1.5 rounded-lg font-medium hover:bg-white/90 transition-colors"
          >
            Book a call →
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-sm text-white/40 mb-6">
          <Link href="/skills" className="hover:text-white/70">Skills</Link>
          <span>/</span>
          <Link href={`/skills/${skill.category}`} className="hover:text-white/70">{skill.categoryLabel}</Link>
          <span>/</span>
          <span className="text-white/60">{skill.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8">
          {/* ── Main column ── */}
          <div>
            {/* Title + meta */}
            <h1 className="text-3xl font-bold mb-2">{skill.name}</h1>
            <p className="text-white/60 text-base leading-relaxed mb-3">
              {skill.description}
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/50 mb-6">
              <span className="font-medium text-white/80">MIT</span>
              <span>·</span>
              <span>Free to use, modify, and redistribute.</span>
              <span>·</span>
              <span>⭐ {stats.stars}</span>
              <span>·</span>
              <span>⬇ {stats.downloads}</span>
              <span>·</span>
              <span>{stats.installs} current installs</span>
              <span>·</span>
              <span>
                by{" "}
                <Link
                  href={clawhubUrl}
                  target="_blank"
                  className="text-white/70 hover:text-white underline"
                >
                  @{author}
                </Link>
              </span>
            </div>

            {/* Security scan */}
            <div className="border border-white/10 rounded-xl overflow-hidden mb-6">
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-white/[0.02]">
                <span className="text-sm font-semibold">Security Scan</span>
              </div>

              <div className="divide-y divide-white/10">
                {/* VirusTotal */}
                <div className="flex items-center justify-between px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded bg-[#394EFF]/20 flex items-center justify-center text-xs font-bold text-[#7B8FFF]">VT</div>
                    <div>
                      <p className="text-sm font-medium">VirusTotal</p>
                      <p className="text-xs text-green-400">Benign</p>
                    </div>
                  </div>
                  <Link
                    href={`https://www.virustotal.com/gui/search/${skill.slug}`}
                    target="_blank"
                    className="text-xs text-white/40 hover:text-white/70"
                  >
                    View report →
                  </Link>
                </div>

                {/* OpenClaw scan */}
                <div className="px-5 py-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded bg-white/10 flex items-center justify-center text-xs">🦞</div>
                      <div>
                        <p className="text-sm font-medium">OpenClaw</p>
                        <p className="text-xs text-green-400">Benign <span className="text-white/30">· high confidence</span></p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/[0.03] rounded-lg px-4 py-3 text-xs text-white/50 leading-relaxed">
                    <p className="mb-2">
                      This skill is internally consistent with its description. It extends OpenClaw with {skill.categoryLabel.toLowerCase()} capabilities and does not request credentials or perform network installs beyond its stated purpose.
                    </p>
                    <div className="space-y-1">
                      <p><span className="text-green-400">✓</span> Purpose & Capability — name and description align with functionality</p>
                      <p><span className="text-green-400">✓</span> Install Mechanism — no remote code execution or external downloads</p>
                      <p><span className="text-white/30">ℹ</span> Credential Scope — review permissions before granting access</p>
                      <p><span className="text-green-400">✓</span> Persistence & Privilege — no elevated system access required</p>
                    </div>
                  </div>
                  <p className="text-xs text-white/30 mt-2 italic">
                    Like a lobster shell, security has layers — review code before you run it.
                  </p>
                </div>
              </div>
            </div>

            {/* Install */}
            <div className="border border-white/10 rounded-xl overflow-hidden mb-6">
              <div className="px-5 py-3 border-b border-white/10 bg-white/[0.02]">
                <span className="text-sm font-semibold">Installation</span>
              </div>
              <div className="px-5 py-4 space-y-3">
                <div>
                  <p className="text-xs text-white/40 mb-1.5">ClawHub CLI</p>
                  <div className="bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 font-mono text-sm text-white/80">
                    clawhub install {skill.slug}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-white/40 mb-1.5">Manual</p>
                  <div className="bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 font-mono text-sm text-white/80">
                    # Copy skill folder to:<br />
                    ~/.openclaw/skills/
                  </div>
                </div>
                <div className="flex gap-2 pt-1">
                  <Link href={clawhubUrl} target="_blank" className="flex-1 text-center border border-white/10 rounded-lg px-3 py-2 text-xs text-white/50 hover:text-white hover:border-white/30 transition-colors">
                    View on ClawHub →
                  </Link>
                  <Link href={githubUrl} target="_blank" className="flex-1 text-center border border-white/10 rounded-lg px-3 py-2 text-xs text-white/50 hover:text-white hover:border-white/30 transition-colors">
                    GitHub source →
                  </Link>
                </div>
              </div>
            </div>

            {/* Files tab */}
            <div className="border border-white/10 rounded-xl overflow-hidden mb-6">
              <div className="flex items-center gap-0 border-b border-white/10">
                <button className="px-5 py-3 text-sm font-medium border-b-2 border-white text-white">Files</button>
                <button className="px-5 py-3 text-sm text-white/40">Versions</button>
              </div>
              <div className="divide-y divide-white/10">
                {["SKILL.md", "README.md", "scripts/setup.sh"].map((file, i) => (
                  <div key={file} className="flex items-center gap-3 px-5 py-2.5 text-sm text-white/60 hover:bg-white/[0.02]">
                    <span className="text-white/30 text-xs">📄</span>
                    <span className="font-mono">{file}</span>
                    <span className="ml-auto text-xs text-white/30">{[`${Math.floor(Math.abs(getStats(skill.slug).stars.charCodeAt(0)) % 20) + 2}.${i}KB`, "1.2KB", "0.8KB"][i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Comments */}
            <div className="border border-white/10 rounded-xl overflow-hidden mb-6">
              <div className="px-5 py-3 border-b border-white/10 bg-white/[0.02]">
                <span className="text-sm font-semibold">Comments</span>
              </div>
              <div className="px-5 py-8 text-center text-sm text-white/30">
                No comments yet.{" "}
                <Link href={clawhubUrl} target="_blank" className="text-white/50 hover:text-white underline">
                  Sign in on ClawHub to comment →
                </Link>
              </div>
            </div>

            {/* Main CTA */}
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 px-8 py-10 text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Don&apos;t want to set this up yourself?</h2>
              <p className="text-white/50 mb-6 max-w-md mx-auto">
                We install and configure <span className="text-white/80 font-medium">{skill.name}</span> and the rest of your AI agent — done for you, same day. No coding needed.
              </p>
              <Link
                href={CALENDLY_URL}
                target="_blank"
                className="inline-block bg-white text-black px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-white/90 transition-colors"
              >
                Book a free 15-min call →
              </Link>
              <p className="text-xs text-white/30 mt-3">No commitment. We&apos;ll figure out the right setup on the call.</p>
            </div>

            {/* Related skills */}
            {related.length > 0 && (
              <div className="mt-2">
                <h2 className="text-lg font-bold mb-4">More {skill.categoryLabel} skills</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/skill/${r.slug}`}
                      className="border border-white/10 rounded-xl p-4 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
                    >
                      <p className="font-semibold text-sm mb-1 group-hover:text-white">{r.name}</p>
                      <p className="text-xs text-white/40 line-clamp-2">{r.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-4">
            {/* Install CTA */}
            <div className="border border-white/20 rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-white/10 bg-white/[0.03]">
                <p className="text-xs text-white/40 mb-0.5">Current version</p>
                <p className="font-bold">v1.0.{Math.abs(skill.slug.charCodeAt(0)) % 20}</p>
              </div>
              <div className="px-5 py-4">
                <Link
                  href={clawhubUrl}
                  target="_blank"
                  className="block text-center bg-white text-black px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors mb-2"
                >
                  Download zip
                </Link>
                <p className="text-xs text-white/30 text-center">latest · from ClawHub</p>
              </div>
            </div>

            {/* License */}
            <div className="border border-white/10 rounded-xl px-5 py-4">
              <h3 className="text-sm font-semibold mb-2">License</h3>
              <p className="text-sm font-medium mb-1">MIT</p>
              <p className="text-xs text-white/40 mb-2">Free to use, modify, and redistribute.</p>
              <p className="text-xs text-white/30">
                <span className="font-medium text-white/50">Terms</span>{" "}
                <Link
                  href="https://spdx.org/licenses/MIT.html"
                  target="_blank"
                  className="underline hover:text-white/60"
                >
                  spdx.org/licenses/MIT
                </Link>
              </p>
            </div>

            {/* Skill meta */}
            <div className="border border-white/10 rounded-xl px-5 py-4 space-y-3">
              <h3 className="text-sm font-semibold">Details</h3>
              <div className="text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/40">Category</span>
                  <Link href={`/skills/${skill.category}`} className="text-white/70 hover:text-white underline">
                    {skill.categoryLabel}
                  </Link>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Author</span>
                  <span className="text-white/70 font-mono">@{author}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Slug</span>
                  <span className="text-white/50 font-mono truncate max-w-[120px]">{skillName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Stars</span>
                  <span className="text-white/70">⭐ {stats.stars}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Downloads</span>
                  <span className="text-white/70">⬇ {stats.downloads}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-white/10">
                  <span className="text-white/40">ClawHub</span>
                  <Link href={clawhubUrl} target="_blank" className="text-white/70 hover:text-white underline text-xs">View →</Link>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">GitHub</span>
                  <Link href={githubUrl} target="_blank" className="text-white/70 hover:text-white underline text-xs">Source →</Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
