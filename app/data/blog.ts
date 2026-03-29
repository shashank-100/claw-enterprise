export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "openclaw-tools-skills-tutorial",
    title: "OpenClaw Setup Guide: 26 Tools + 53 Skills Explained",
    description:
      "You've installed OpenClaw. Now what? This guide covers what each of the 26 Tools and 53 official bundled Skills does, whether to enable it, and how to configure it.",
    date: "February 5, 2026",
    readTime: "19 min read",
    category: "AI in Practice",
    content: `You've installed OpenClaw. Now what?

Tools are scattered across different docs. Skills auto-load by default — some are already active and you don't even know it. Enable everything and you're exposed. Disable everything and you've wasted the install. Piecing together the full picture from docs and source code takes real effort.

This is a research-based guide covering what each of the 26 Tools and 53 official bundled Skills does, whether to enable it, how to configure it, and why. Security analysis is covered separately. This article focuses on what each Tool and Skill does and how to configure them for your needs.

(There are 13,700+ third-party Skills on ClawHub — those are outside the scope of this guide.)

## What's the Difference Between Tools and Skills?

Many people confuse these two. It's actually straightforward.

**Tools are organs** — they determine whether OpenClaw can *do* something. \`read\` and \`write\` let it access files, \`exec\` lets it run system commands, \`web_search\` lets it search like Google, \`web_fetch\` lets it read web pages, \`browser\` lets it interact with pages (click buttons, fill forms, take screenshots). Without a Tool enabled, it's like having no hands — nothing gets done.

**Skills are textbooks** — they teach OpenClaw *how* to combine Tools to accomplish tasks. \`gog\` teaches it how to use Google Workspace for email and calendar, \`obsidian\` teaches it how to organize notes, \`github\` teaches it how to work with repos, \`slack\` teaches it how to send messages to channels. The 53 official Skills cover notes, email, social media, development, smart home, and more.

**Does installing a Skill give OpenClaw new permissions? No.**

Example: You install the \`obsidian\` Skill. OpenClaw now knows how to organize notes — but without the \`write\` Tool enabled, it can't write files at all. Skills are manuals. The real switches are in Tools.

For OpenClaw to actually do something via a Skill, three conditions must be met. Take "read your Gmail" as an example:

1. **Configuration**: Did you allow OpenClaw to run commands? (Without \`exec\`, it can't even launch a program)
2. **Installation**: Is the \`gog\` bridge tool installed on the machine? (Without it, OpenClaw knows what to do but can't connect to Google)
3. **Authorization**: Did you log into your Google account and grant access? (Without authorization, Google won't let it in)

All three are required. Skills are manuals — whether something actually works depends on these three conditions.

## How Are 26 Tools and 53 Skills Organized?

I organize them in concentric circles:

- **Layer 1 — Core Capabilities (8 Tools)**: File access, command execution, web access. Almost everyone enables these.
- **Layer 2 — Advanced Capabilities (18 Tools)**: Browser control, memory, multi-session, automation. Enable as needed.
- **Layer 3 — Knowledge Layer (53 Skills)**: Teaches OpenClaw to work with Google, Obsidian, Slack, etc. Install what you use.

## Layer 1: Core Capabilities (8 Tools)

These 8 Tools are OpenClaw's foundation. With only these enabled, OpenClaw is reactive — you ask, it responds. It can read files, run commands, and search the web, but it won't remember your preferences across sessions or proactively push you notifications.

**File Operations: \`read\`, \`write\`, \`edit\`, \`apply_patch\`**

\`read\` is read-only. \`write\` and \`edit\` can modify files, \`apply_patch\` applies code changes. These four are fundamental — most people enable all of them.

**Execution & Process Management: \`exec\`, \`process\`**

\`exec\` lets OpenClaw run any shell command — install packages, run scripts, manage the system. "Any" is the key word: it can install dependencies for you, but it can also \`rm -rf\` your entire machine. Without \`exec\`, most tasks fail. With \`exec\` and no safeguards, you've handed over root access.

That's why I strongly recommend enabling \`approval\` alongside \`exec\` — every command is shown to you first, and only runs after you confirm:

\`\`\`json
{
  "approvals": {
    "exec": { "enabled": true }
  }
}
\`\`\`

Is it annoying? Honestly, yes. But it's the most basic protection — if the AI ever misjudges or gets hit by a Prompt Injection attack, this gate is your last line of defense.

\`process\` manages background processes — list tasks, check output, kill stuck processes. Usually enabled alongside \`exec\`.

**Web Access: \`web_search\`, \`web_fetch\`**

\`web_search\` performs keyword searches, \`web_fetch\` reads web page content. Together, they let OpenClaw browse the internet for information.

## Layer 2: Advanced Capabilities (18 Tools)

Layer 1 is "can it work at all." Layer 2 is "does it work well." These Tools transform OpenClaw from a command executor into a real assistant — one that remembers your preferences, controls a browser, and sends scheduled notifications.

**Browser: \`browser\`, \`canvas\`, \`image\`**

\`browser\` lets OpenClaw control Chrome — click buttons, fill forms, take screenshots. I use it for price comparisons, spec research, and adding items to shopping carts. But I always check out myself. The "last mile" involving payments never goes to AI — that's my line.

**Memory: \`memory_search\`, \`memory_get\`**

Lets OpenClaw remember information across sessions. After a week of use, it knows your preferences — no need to re-explain every time. The longer you use it, the better it knows you.

**Multi-Session: sessions series (5 tools)**

Run multiple sessions for different tasks simultaneously — one discussing a product idea, another researching travel plans, without interference.

**Messaging: \`message\`**

Lets OpenClaw send messages to Discord, Slack, Telegram, WhatsApp, iMessage. I have this enabled but only for sending messages to myself — never for communicating with others on my behalf.

**Automation: \`cron\`, \`gateway\`**

\`cron\` sets up scheduled tasks. \`gateway\` lets OpenClaw restart itself. Every morning at 6:47, my Telegram receives a Daily Brief prepared by OpenClaw — that's \`cron\` plus \`message\` in action.

## Which of the 53 Official Skills Should You Install?

53 sounds like a lot, but after scanning them you'll find maybe a dozen are relevant to you.

**Important**: bundled Skills auto-load by default — if the corresponding CLI tool is installed on the system, the Skill activates automatically. Use \`skills.allowBundled\` in whitelist mode to control which Skills are active.

### Notes
4 note-taking Skills: \`obsidian\`, \`notion\`, \`apple-notes\`, \`bear-notes\`.

### Productivity
Two email Skills: \`gog\` and \`himalaya\`. \`gog\` integrates the entire Google Workspace (Gmail, Calendar, Tasks, Drive, Docs, Sheets). If you're on Google, go with \`gog\` — more complete, and you can revoke access from your Google account anytime.

### Messaging & Social Media
\`wacli\` (WhatsApp), \`imsg\` (iMessage), \`bird\` (X/Twitter), \`slack\`, \`discord\`. These Skills give OpenClaw deep access to each platform. Unlike the \`message\` tool (which only sends messages), installing these gives it full access to your data on that platform.

### Developer Tools
\`github\`: Operates GitHub via gh CLI, requires OAuth, permissions are controllable.
\`tmux\`: Manages multiple terminal sessions.
\`session-logs\`: Searches and analyzes past conversation logs.
\`coding-agent\`: Calls other AI coding assistants (Claude Code, Cursor, etc.) in the background.

### Password Management
\`1password\` lets OpenClaw access your 1Password vault. But the permission model is all-or-nothing: once authorized, it has access to the entire vault. Consider creating an "AI-only vault" if you use this.

## My Configuration

**Tools (22 of 26 enabled)**

\`\`\`json
{
  "tools": {
    "allow": [
      "read", "write", "edit", "apply_patch",
      "exec", "process",
      "web_search", "web_fetch",
      "browser", "image",
      "memory_search", "memory_get",
      "sessions_list", "sessions_history", "sessions_send", "sessions_spawn", "session_status",
      "tts",
      "message", "cron", "gateway", "agents_list"
    ],
    "deny": ["nodes", "canvas", "llm_task", "lobster"]
  },
  "approvals": {
    "exec": { "enabled": true }
  }
}
\`\`\`

22 enabled, 4 disabled: \`nodes\` (can't think of a scenario), \`canvas\` (don't need it), \`llm_task\` / \`lobster\` (not using workflow engine).

**Skills (9 of 53 enabled)**

\`\`\`json
{
  "skills": {
    "allowBundled": [
      "gog", "github", "tmux", "session-logs",
      "weather", "summarize", "clawhub",
      "healthcheck", "skill-creator"
    ]
  }
}
\`\`\`

In short: \`gog\` for email and calendar, \`github\` for repos, and the rest are utilities for Daily Brief and system management.

## How to Automate Tasks with Your AI Agent

This is where OpenClaw stops being a chatbot and starts being infrastructure. The combination of \`cron\` (scheduling) and \`message\` (push notifications) turns it into an automation engine that works while you sleep.

The pattern is always the same: **trigger + action + deliver**. Define when it runs, what it does, and where results go.

**Daily Brief** — Every morning at 6:47, Telegram receives a briefing: today's calendar, pending emails that need replies, weather forecast, and any CI/CD failures overnight. This single automation replaced checking five different apps before coffee.

**Email Triage** — Twice a day, OpenClaw scans the inbox, categorizes messages by urgency, and sends a summary. Newsletters get archived. Anything requiring action gets flagged with a one-line summary.

**CI/CD Monitoring** — When a GitHub Actions workflow fails, OpenClaw reads the error log, identifies the likely cause, and pushes a Telegram message with the diagnosis. Fix production issues from your phone while standing in line for coffee.

## How Do You Get Started?

Open your \`openclaw.json\` and start with three principles:

1. If you can't think of a use case, leave it off
2. More capability, more control — enable approval for \`exec\`, only message yourself
3. The last mile is always manual — checkout, sending messages, posting publicly — anything irreversible stays with you`,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
