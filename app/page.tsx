import Link from "next/link";

const CALENDLY_URL = "https://calendly.com/your-link"; // Replace with your Calendly link

const integrations = [
  { name: "Gmail", emoji: "📧" },
  { name: "Google Calendar", emoji: "📅" },
  { name: "Outlook", emoji: "📨" },
  { name: "Slack", emoji: "💬" },
  { name: "WhatsApp", emoji: "📱" },
  { name: "Notion", emoji: "📝" },
  { name: "Telegram", emoji: "✈️" },
  { name: "HubSpot", emoji: "🔶" },
  { name: "Salesforce", emoji: "☁️" },
  { name: "GitHub", emoji: "🐙" },
  { name: "Zoom", emoji: "🎥" },
  { name: "Google Drive", emoji: "💾" },
];

const testimonials = [
  {
    quote:
      "It feels like hiring an employee rather than opening another chat window.",
    author: "MacStories",
  },
  {
    quote: "Your slots are going insanely fast. Already sent referrals to friends.",
    author: "Nemke Kostic, BBQ Capital",
  },
  {
    quote:
      "You're solving a problem that people like me probably wouldn't take the time to solve ourselves.",
    author: "Andrew Blanchard, CEO, insurance & benefits technology",
  },
  {
    quote:
      "I could have set it up myself, but every self-install I've seen has security gaps. The hardening alone was worth it.",
    author: "SetupClaw customer, early-stage VC fund",
  },
];

const faqs = [
  {
    q: "What is an AI agent?",
    a: "An AI agent that runs 24/7 on dedicated infrastructure. It can triage email, schedule meetings, draft replies, monitor Slack, and automate workflows across your tools — proactively, without you asking. Think of it as a digital employee that never sleeps.",
  },
  {
    q: "Do I need to be technical?",
    a: "Not at all. We handle everything — you don't touch a terminal or write any code. Many of our customers are non-technical founders and executives. After setup, you talk to your bot through Telegram (or Slack/WhatsApp) just like texting an assistant.",
  },
  {
    q: "What's included in the setup?",
    a: "VPS provisioning, security hardening (Docker sandbox, firewall), email and calendar integration, up to 3 workflows, documentation, and 14-day support. You go live same day with a working bot.",
  },
  {
    q: "What happens after I pay?",
    a: "We reach out within 48 hours to schedule your kickoff call. The kickoff (20–45 min) covers your requirements. Then we do a live setup session (1–3 hrs) where your bot goes live. You're using it the same day.",
  },
  {
    q: "Can't I just set it up myself?",
    a: "You can — but every self-install we've seen has security gaps. The installation is straightforward; the configuration and hardening is where most people need help. Book a call and we'll handle it.",
  },
  {
    q: "What if I'm not happy?",
    a: "100% satisfaction guarantee. If you're not happy with the setup, we'll refund you — no questions asked.",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Top announcement bar */}
      <div className="bg-[#111] border-b border-white/10 text-center py-2 px-4 text-sm text-white/70">
        Limited spots available this week.{" "}
        <Link
          href={CALENDLY_URL}
          className="underline text-white hover:text-white/80"
          target="_blank"
        >
          Book now
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <span className="text-xl">🦾</span>
          <span className="font-semibold text-lg tracking-tight">SetupClaw</span>
        </div>
        <Link
          href={CALENDLY_URL}
          target="_blank"
          className="text-sm bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-white/90 transition-colors"
        >
          Book a call →
        </Link>
      </nav>

      <div className="max-w-4xl mx-auto px-6 w-full">
        {/* Hero */}
        <section className="pt-16 pb-20 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
            We set up your
            <br />
            AI employee
          </h1>
          <p className="text-lg text-white/60 max-w-xl mx-auto mb-4">
            Done-for-you AI agent setup. Automate your email, calendar, and
            workflows in 24 hours. No coding needed.
          </p>
          <p className="text-sm text-white/40 mb-10 italic">
            &ldquo;Genuinely the most incredible sci-fi takeoff-adjacent thing I have
            seen recently.&rdquo; — Andrej Karpathy, former Director of AI at Tesla
          </p>

          {/* Integration logos */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <span className="text-sm text-white/40 mr-1">Connects to</span>
            {integrations.map((i) => (
              <span
                key={i.name}
                title={i.name}
                className="text-xl"
                aria-label={i.name}
              >
                {i.emoji}
              </span>
            ))}
            <span className="text-sm text-white/40 ml-1">+10,000 more</span>
          </div>

          <Link
            href={CALENDLY_URL}
            target="_blank"
            className="inline-block bg-white text-black px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/90 transition-colors mb-4"
          >
            Book a free 15-min call →
          </Link>
          <p className="text-sm text-white/40">
            Next available: this week. Can&apos;t find a slot? DM us on Twitter.
          </p>
        </section>

        {/* Built for */}
        <section className="py-16 border-t border-white/10">
          <h2 className="text-2xl font-bold mb-8">Built for</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "Founders & CEOs",
                desc: "Drowning in email, calendar chaos, need leverage",
              },
              {
                title: "Exec teams",
                desc: "CFO, Head of Sales, EA — each gets their own agent",
              },
              {
                title: "Agencies & studios",
                desc: "Client workflows, reporting, project management",
              },
              {
                title: "Investors & VCs",
                desc: "Deal flow tracking, portfolio updates, LP comms",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border border-white/10 rounded-xl p-5 bg-white/[0.02]"
              >
                <p className="font-semibold mb-1">{item.title}</p>
                <p className="text-sm text-white/50">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Always on */}
        <section className="py-16 border-t border-white/10">
          <h2 className="text-2xl font-bold mb-3">Always on, always working</h2>
          <p className="text-white/60 mb-8 max-w-2xl">
            Your AI agent runs 24/7 on dedicated infrastructure. It wakes up
            every 30 minutes, checks your email, calendar, and connected tools —
            and takes action without you asking.
          </p>
          <div className="space-y-4">
            {[
              {
                time: "Every 30 min",
                desc: "Scans your inbox, flags urgent emails, drafts replies for your review",
              },
              {
                time: "9:00 AM daily",
                desc: "Sends you a briefing: today's meetings, attendee backgrounds, prep notes",
              },
              {
                time: "On demand",
                desc: '"I\'m running 10 min late" → bot emails your next meeting and reschedules',
              },
              {
                time: "Ongoing",
                desc: "Monitors Slack channels, summarizes threads, surfaces what matters",
              },
            ].map((item) => (
              <div key={item.time} className="flex gap-6 items-start">
                <span className="text-sm text-white/40 w-28 shrink-0 pt-0.5">
                  {item.time}
                </span>
                <p className="text-white/80 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-white/50">
            You talk to your bot through Telegram (or Slack, WhatsApp, Discord)
            — just like texting an assistant.
          </p>
        </section>

        {/* How it works */}
        <section className="py-16 border-t border-white/10">
          <h2 className="text-2xl font-bold mb-8">How it works</h2>
          <div className="space-y-6">
            {[
              {
                n: "1",
                title: "Book a call",
                desc: "We discuss your goals, map your integrations (email, calendar, CRM, messaging), and plan your agent's workflows. You tell us what to automate — we handle the rest.",
              },
              {
                n: "2",
                title: "We set everything up",
                desc: "We set up your server, install and configure the AI agent, connect your tools, set up automations, firewall rules, and workflows. You go live same day.",
              },
              {
                n: "3",
                title: "You get your AI employee",
                desc: "We tune workflows, fix edge cases, and make sure everything runs smoothly. Dedicated support channel for the first 14 days.",
              },
            ].map((step) => (
              <div key={step.n} className="flex gap-6">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold shrink-0">
                  {step.n}
                </div>
                <div>
                  <p className="font-semibold mb-1">{step.title}</p>
                  <p className="text-sm text-white/50">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 border-t border-white/10">
          <h2 className="text-2xl font-bold mb-8">What people are saying</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {testimonials.map((t) => (
              <div
                key={t.author}
                className="border border-white/10 rounded-xl p-5 bg-white/[0.02]"
              >
                <p className="text-white/80 text-sm mb-3 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-white/40 text-xs">— {t.author}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why hire us */}
        <section className="py-16 border-t border-white/10">
          <h2 className="text-2xl font-bold mb-4">Why hire us</h2>
          <p className="text-white/60 max-w-2xl mb-6">
            AI agents are open-source — you could set it up yourself. But most
            people need custom integrations beyond the defaults, and even
            experienced engineers spend several hours getting everything wired
            up. Then there&apos;s the ongoing maintenance: updates, drift, broken
            workflows. We handle all of it — deployed securely from day one.
            It&apos;s the <span className="text-white/80">Collison Install</span> —
            we show up and do it for you.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: "Security-first",
                desc: "Docker sandboxing, firewall hardening, read-only permissions by default. Your credentials stay secure.",
              },
              {
                title: "Same-day delivery",
                desc: "Book a call in the morning, have a working AI agent by end of day.",
              },
              {
                title: "100% satisfaction",
                desc: "If you're not happy with the setup, we'll refund you. No questions asked.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border border-white/10 rounded-xl p-5 bg-white/[0.02]"
              >
                <p className="font-semibold mb-2">{item.title}</p>
                <p className="text-sm text-white/50">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 border-t border-white/10">
          <h2 className="text-2xl font-bold mb-2">Pricing</h2>
          <p className="text-white/50 mb-8 text-sm">
            One-time setup fee. No subscriptions. No hidden costs.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              {
                name: "Basic Setup",
                desc: "1 AI agent, up to 3 workflows, email + calendar integration",
                price: "$299",
                highlight: false,
              },
              {
                name: "Advanced Setup",
                desc: "Custom workflows, multi-platform integrations, CRM + Slack",
                price: "$549",
                highlight: true,
              },
              {
                name: "Team Setup",
                desc: "Multiple agents, shared context, full org automation",
                price: "$999",
                highlight: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`border rounded-xl p-5 relative ${
                  plan.highlight
                    ? "border-white/40 bg-white/[0.05]"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-4 text-xs bg-white text-black px-2 py-0.5 rounded-full font-medium">
                    Recommended
                  </span>
                )}
                <p className="font-semibold mb-1">{plan.name}</p>
                <p className="text-sm text-white/50 mb-4">{plan.desc}</p>
                <p className="text-2xl font-bold">{plan.price}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              href={CALENDLY_URL}
              target="_blank"
              className="inline-block bg-white text-black px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/90 transition-colors mb-3"
            >
              Book a free call →
            </Link>
            <p className="text-sm text-white/40">
              Not sure which plan? Book a call — we&apos;ll figure it out together.
            </p>
          </div>
        </section>

        {/* After you purchase */}
        <section className="py-16 border-t border-white/10">
          <h2 className="text-2xl font-bold mb-8">After you book</h2>
          <div className="space-y-4">
            {[
              {
                time: "Within 48 hrs",
                desc: "We reach out to schedule your kickoff call",
              },
              {
                time: "Kickoff call",
                desc: "20–45 min requirements session: your integrations, workflows, and preferences",
              },
              {
                time: "Setup session",
                desc: "1–3 hr live build: you go live same day with a working AI agent",
              },
            ].map((item) => (
              <div key={item.time} className="flex gap-6 items-start">
                <span className="text-sm text-white/40 w-28 shrink-0 pt-0.5">
                  {item.time}
                </span>
                <p className="text-white/80 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Use cases */}
        <section className="py-16 border-t border-white/10">
          <h2 className="text-2xl font-bold mb-8">What your AI agent can do</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                title: "CEOs & Founders",
                desc: "Email triage, scheduling, investor updates",
              },
              {
                title: "Sales Teams",
                desc: "Follow-ups, CRM updates, meeting prep",
              },
              {
                title: "VCs & Investors",
                desc: "Deal flow, LP comms, portfolio monitoring",
              },
              {
                title: "Agencies",
                desc: "Client comms, reporting, project coordination",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border border-white/10 rounded-xl p-4 bg-white/[0.02]"
              >
                <p className="font-semibold text-sm mb-1">{item.title}</p>
                <p className="text-xs text-white/40">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 border-t border-white/10">
          <h2 className="text-2xl font-bold mb-8">FAQ</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q}>
                <p className="font-semibold mb-2">{faq.q}</p>
                <p className="text-sm text-white/50 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 border-t border-white/10 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Get your AI employee today
          </h2>
          <p className="text-white/50 mb-8 max-w-md mx-auto">
            Book a free 15-minute call. We&apos;ll understand your use case and get
            your AI agent running within 24 hours.
          </p>
          <Link
            href={CALENDLY_URL}
            target="_blank"
            className="inline-block bg-white text-black px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/90 transition-colors"
          >
            Book your setup call →
          </Link>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-8 py-8">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🦾</span>
            <span className="font-semibold">SetupClaw</span>
          </div>
          <div className="flex gap-6 text-sm text-white/40">
            <Link href="/terms" className="hover:text-white/70">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-white/70">
              Privacy Policy
            </Link>
            <Link
              href={CALENDLY_URL}
              target="_blank"
              className="hover:text-white/70"
            >
              Book a call
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
