import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts, getBlogPostBySlug } from "@/app/data/blog";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: `${post.title} | SetupClaw Blog`,
    description: post.description,
  };
}

const CALENDLY_URL = "https://calendly.com/your-link";

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-2xl font-bold mt-10 mb-4">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-xl font-bold mt-8 mb-3">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("```")) {
      const lang = line.slice(3);
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre
          key={i}
          className="bg-black/40 border border-white/10 rounded-xl p-4 overflow-x-auto my-4"
        >
          <code className="text-sm text-white/80 font-mono">
            {codeLines.join("\n")}
          </code>
        </pre>
      );
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(
        <p key={i} className="font-bold mt-4 mb-1">
          {line.slice(2, -2)}
        </p>
      );
    } else if (line.trim() === "") {
      // skip blank
    } else {
      // Inline formatting
      const formatted = line
        .split(/(`[^`]+`)/)
        .map((part, j) => {
          if (part.startsWith("`") && part.endsWith("`")) {
            return (
              <code
                key={j}
                className="bg-white/10 text-white/80 px-1.5 py-0.5 rounded text-sm font-mono"
              >
                {part.slice(1, -1)}
              </code>
            );
          }
          // Bold within paragraph
          const boldParts = part.split(/(\*\*[^*]+\*\*)/);
          return boldParts.map((bp, k) => {
            if (bp.startsWith("**") && bp.endsWith("**")) {
              return <strong key={k}>{bp.slice(2, -2)}</strong>;
            }
            return bp;
          });
        });

      elements.push(
        <p key={i} className="text-white/70 leading-relaxed mb-3">
          {formatted}
        </p>
      );
    }
    i++;
  }

  return elements;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-4xl mx-auto border-b border-white/10">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">🦾</span>
          <span className="font-semibold tracking-tight">SetupClaw</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/blog" className="text-sm text-white/50 hover:text-white">
            Blog
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

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
          <Link href="/blog" className="hover:text-white/70">
            Blog
          </Link>
          <span>/</span>
          <span className="text-white/60 line-clamp-1">{post.title}</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs text-white/40 mb-4">
            <span className="bg-white/10 px-2 py-0.5 rounded-full">
              {post.category}
            </span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight mb-4">{post.title}</h1>
          <p className="text-white/50 text-lg leading-relaxed">
            {post.description}
          </p>
        </div>

        {/* Content */}
        <article className="prose-custom">
          {renderContent(post.content)}
        </article>

        {/* CTA */}
        <div className="mt-16 border border-white/10 rounded-2xl p-8 bg-white/[0.02] text-center">
          <h2 className="text-2xl font-bold mb-3">
            Don&apos;t want to configure this yourself?
          </h2>
          <p className="text-white/50 mb-6 max-w-md mx-auto">
            We set up OpenClaw with the right tools, skills, and automations for
            your workflow — done for you, same day.
          </p>
          <Link
            href={CALENDLY_URL}
            target="_blank"
            className="inline-block bg-white text-black px-8 py-3 rounded-xl font-semibold hover:bg-white/90 transition-colors"
          >
            Book a free call →
          </Link>
        </div>

        {/* Back to blog */}
        <div className="mt-8 text-center">
          <Link href="/blog" className="text-sm text-white/40 hover:text-white/70">
            ← All posts
          </Link>
        </div>
      </div>
    </main>
  );
}
