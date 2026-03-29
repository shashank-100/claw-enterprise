import Link from "next/link";
import { blogPosts } from "@/app/data/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | SetupClaw",
  description: "Guides, tutorials, and insights on OpenClaw and AI agents.",
};

const CALENDLY_URL = "https://calendly.com/your-link";

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <nav className="flex items-center justify-between px-6 py-4 max-w-4xl mx-auto border-b border-white/10">
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

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-2">Blog</h1>
        <p className="text-white/50 mb-10">
          Guides and insights on OpenClaw, AI agents, and automation.
        </p>

        <div className="space-y-4">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block border border-white/10 rounded-xl p-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
            >
              <div className="flex items-center gap-2 text-xs text-white/40 mb-2">
                <span>{post.category}</span>
                <span>·</span>
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="text-xl font-bold mb-2 group-hover:text-white">
                {post.title}
              </h2>
              <p className="text-white/50 text-sm leading-relaxed">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
