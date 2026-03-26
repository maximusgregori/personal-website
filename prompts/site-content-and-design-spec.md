# Site Content & Design Spec

*Complete blueprint for Claude Code. Each section includes exact copy + visual/design annotations.*
*Last updated: March 26, 2026*

---

## Global Design Notes

**Tech stack:** Vanilla HTML5 + CSS3 + JS. AOS library (6KB, CDN) for scroll animations. Google Fonts (Poppins + Inter). Hosted on GitHub Pages.

**Color palette:**

| Role | Hex | Usage |
|------|-----|-------|
| Dark base (hero + footer) | `#0F172A` | Hero background, footer background |
| Light base (content) | `#F4F4F4` | Projects + About backgrounds |
| Primary accent | `#22D3EE` | CTAs, section labels, metrics, interactive highlights |
| Secondary accent | `#034BDC` | Links, secondary interactive elements |
| Text on light | `#1E293B` | Primary body text on light backgrounds |
| Text on dark | `#E2E8F0` | Primary text on dark backgrounds |
| Muted text on dark | `#94A3B8` | Subheadlines, secondary text on dark |
| Muted text on light | `#64748B` | Secondary text, framing questions, metadata |
| Muted body on light | `#475569` | Summaries, expanded case study text |

**Typography:**

| Role | Font | Weight | Size (mobile) | Size (desktop) |
|------|------|--------|---------------|----------------|
| Hero headline | Poppins | 700 | 36–42px | 56–72px |
| Section headings | Poppins | 600 | 24–28px | 32–40px |
| Project titles | Poppins | 600 | 20–24px | 24–28px |
| Body text | Inter | 400 | 16px | 18px |
| Section labels | Inter or Poppins | 600 | 12–14px | 14px |
| Metrics | Poppins | 700 | 28–36px | 36–48px |
| Framing questions | Inter | 400 italic | 14px | 16px |

**Line height:** 1.6–1.7 for body text. 1.2–1.3 for headlines.

**Section transitions:** No hard lines between sections. Use subtle gradient fades or SVG curved dividers. Color flow: dark → light → light → light → dark. Each section's content fades in on scroll via AOS.

**Mobile-first:** Everything designed at 375px width first, then scaled up. Touch targets 48px min. No horizontal scroll. 8pt spacing grid.

**Animation philosophy:** Every animation must serve a purpose (guide the eye, reveal content, emphasize a metric). Nothing decorative. All animations under 600ms. Respect `prefers-reduced-motion`.

**Writing style (applies to ALL copy on this site):**
The copy in this spec has been carefully written in a specific voice. Do not rewrite, paraphrase, "improve," or punch up any of the text. Use it exactly as provided. The tone is intentionally understated, conversational, and plain. It avoids em dashes, avoids hype language ("revolutionary," "game-changing," "massive"), avoids the AI writing pattern of short punchy fragments followed by dramatic reveals, and avoids the "not just X, it's Y" construction. Sentences vary in length naturally. The writing trusts the reader to draw conclusions from specifics rather than telling them what to feel. If you need to write any additional microcopy (button hover states, ARIA labels, meta descriptions), follow this same voice.

---

## Section 1: Hero

### Copy

**Name line:** Max Gregori

**Headline:** I Build Systems That Solve Problems Others Work Around

**Subheadline:** I find where processes break down, build what fixes them, and scale the solution.

**CTA button:** See My Work

**Secondary link:** Get in Touch

### Design Spec

**Background:** Full-viewport dark (`#0F172A`). This section fills the entire screen on load — no scrolling needed to see the complete hero.

**Layout (mobile):**
1. Name in small caps or lighter weight at top (Poppins, 14–16px, `#64748B` or `#22D3EE`)
2. Headline as the dominant element — large, bold (Poppins, 36–42px mobile / 56–72px desktop, `#E2E8F0`, weight 700)
3. Subheadline below (Inter, 16–18px, `#94A3B8` — slightly muted so it doesn't compete)
4. CTA button (filled, `#22D3EE` background, `#0F172A` text, rounded corners, 48px height)
5. Secondary "Get in Touch" as text link below the button (`#64748B`, underline on hover)
6. Professional headshot — on mobile, positioned below the text block or as a subtle background element with overlay. On desktop, right side of a split layout.

**Layout (desktop):**
- Split layout: text content on left (~60%), headshot on right (~40%)
- Text vertically centered in its column
- Photo can be cropped in a rounded rectangle or have a subtle gradient overlay at edges

**Animation:**
- Name fades in first (200ms delay)
- Headline fades in + slides up slightly (400ms delay)
- Subheadline fades in (600ms delay)
- CTA fades in (800ms delay)
- Staggered entrance creates a cascading reveal effect

**Transition to next section:** Gradient fade from `#0F172A` to `#F4F4F4` over ~100px at the bottom of the hero. Optional: subtle SVG wave divider.

**Navigation:** Sticky nav bar appears on scroll (after hero). On mobile: hamburger icon top-right, opens full-screen overlay (`#0F172A` background) with centered nav links. On desktop: horizontal bar with name/logo left, text links right (Work · About · Contact). Subtle background blur effect.

---

## Section 2: Featured Projects

### Section Intro

**Section label:** What I Build

**Section intro statement (large, light-weight text, NOT a heading, more like a pull quote):**

> The best way to understand what's possible is to build it. Every project here started with a real problem, and my answer was always the same: go build the thing and find out.

### Section Design

**Background:** `#F4F4F4`

**Section label:** "What I Build" — small text, uppercase, letter-spaced (2–3px), `#22D3EE`, centered or left-aligned. Fades in on scroll.

**Intro statement:** Large, light-weight text (Poppins, 24–28px mobile / 32–40px desktop, weight 300–400, `#1E293B`). Generous whitespace above and below. Should feel like a thesis statement, not a heading.

**Project layout:** Vertical stack of 6 project cards on mobile. Each card is full-width with generous padding (24–32px). On desktop: single column centered (max-width ~800px) for readability, or 2-column grid.

**Card entrance:** Cards fade in + slide up on scroll, staggered (each card 100ms after the previous).

---

### Project 1: IT Field Services Practice

**Framing question:** What happens when a business needs something that doesn't exist?

**Project title:** Building a Healthcare IT Service Line from Zero

**Summary:** Physicians don't want to troubleshoot their own IT. They want someone on site who handles it, so they can focus on patients. That service didn't exist at Integrity Healthcare when I joined, so I built it. It became the company's largest revenue line.

**Key metric:** `#1 revenue line` at Integrity Healthcare

**Expanded case study:**

**The problem:**
Outpatient surgery centers had a consistent, unaddressed need. Physicians don't want to deal with broken hardware, network outages, or software lockouts. They want IT to work, and when it doesn't, they want someone physically there to fix it. When I joined Integrity Healthcare as Director of Business Development, the company was an IT staffing agency with no on-site capability. The gap was obvious.

**What I built:**
A full IT field services practice, grounded in one idea: be the person on site who makes IT someone else's problem. Network closet construction, Cisco rack-and-stack, structured cabling, fiber runs, server configuration. The scope covered the full facility lifecycle, from de novo buildouts through ongoing managed services.

**The outcome:**
It grew into Integrity's largest revenue-generating service line, serving over 100 healthcare facilities.

---

### Project 2: AI Agent Orchestrator

**Framing question:** What happens when that business outgrows its own operations?

**Project title:** Automating the Operations I Built

**Summary:** The field services practice grew fast enough that the coordination behind it couldn't keep up. Onboarding, scheduling, and invoicing were all bottlenecked. I built an AI agent to automate that operational layer so the team could stay focused on the actual work.

**Key metrics:** `70%+` efficiency gain · `30%+` pipeline growth

**Expanded case study:**

**The problem:**
The field services practice was growing, and that growth created a new problem. Too many clients onboarding at the same time, too many jobs competing for the same technicians, and no clean way to see who was available when. The service itself was solid. The coordination behind it wasn't keeping pace, and that was starting to affect quality.

**What I built:**
An AI agent that handles client intake, job scheduling, and invoicing across the field services operation. It matches technicians to jobs based on availability, triggers invoices on completion, and keeps the pipeline organized without someone manually tracking every moving piece.

**The outcome:**
Operational efficiency went up by over 70%, and the job pipeline grew by over 30%. The bigger win was that the team stopped spending time on logistics and went back to spending it on the work itself.

---

### Project 3: MediReport Implementation Tracker

**Framing question:** What happens when an entire team is drowning in spreadsheets?

**Project title:** Replacing Scattered Workflows with an AI-Powered Web App

**Summary:** A healthcare software company expanding fast across the US market had its implementation tracking split between Excel files, OneDrive folders, email threads, and PowerPoint decks. I built a web application that brought all of it into one place, with AI-assisted coordination built in.

**Key metric:** `20%+` implementation efficiency gain · Active `Constance IT` client engagement

**Expanded case study:**

**The problem:**
MediReport is a European cardiovascular information system that I helped bring into the American healthcare market. As they started implementing across outpatient OBLs, ASCs, and clinics doing cardiovascular procedures, the project management side couldn't keep up. Tracking was spread across Excel spreadsheets, multiple OneDrive instances, email chains, and weekly PowerPoint status decks. Different people were updating different files. Version conflicts were constant. There was no single source of truth, and bottlenecks were showing up at every stage.

**What I built:**
A React + Firebase web application that replaced all of those disconnected systems with one tool. It includes customizable implementation plans per site, role-based access for internal teams and customers, and an AI assistant that lets project managers log updates in plain English. Someone can say "I had a call with this vendor, there's going to be a delay interfacing these modalities," and the AI routes the information to the right fields, flags whether the task needs clinical or engineering involvement, tracks deadlines, and sends reminders.

**The outcome:**
Implementation efficiency improved by over 20%. That might sound modest, but these implementations typically take 8 to 16 weeks. Shaving 20% off a three- or four-month rollout means weeks of time recovered per site. The MediReport team now runs all of its US implementations through this single platform, and it's an active Constance IT engagement.

---

### Project 4: AI Content Engine

**Framing question:** When I want to understand something, I build it.

**Project title:** Automating a Full Creative Pipeline End-to-End

**Summary:** AI-generated content was everywhere, and I wanted to know what it actually takes to go from a one-line idea to a publish-ready video. So I built the full pipeline: script, voiceover, generated scenes, synced captions, published.

**Key detail:** Built with n8n · Claude API · ElevenLabs · Veo 3.1 · Kling 3.0 · Creatomate

**Expanded case study:**

**The problem:**
AI-generated content was taking off, and most of the conversation around it felt like hype. My girlfriend runs a wellness brand with regular sponsorship offers, so I had a real use case ready. But before building anything for her, I wanted to understand every step of the pipeline myself.

**What I built:**
The full pipeline from scratch, starting with automated YouTube content as my test case. You give it a one-line premise, and the system generates a scene-by-scene script, produces voiceover narration per scene, generates AI-animated video clips, and assembles everything into a finished video with word-synced captions, ready to publish. I built it on n8n for workflow orchestration, Claude API for script generation, ElevenLabs for voice synthesis, Veo 3.1 and Kling 3.0 for video generation, Creatomate for final assembly, and Blotato for multi-platform publishing.

**The outcome:**
Once I understood every step, I adapted the pipeline for my girlfriend's brand. She's now producing and publishing AI-assisted marketing content at a pace that wasn't realistic before. For me, the value was less about the pipeline itself and more about developing a clear picture of what AI content creation can actually do and where it falls short.

---

### Project 5: Weather Derivatives Trading Bot

**Framing question:** When I want to understand something, I build it.

**Project title:** An Autonomous Trading System Built from First Principles

**Summary:** Prediction market bots were supposedly easy money. That didn't add up to me. I wanted to find out what it actually takes, starting from how weather data is measured, where it's hosted, and how to price temperature markets with real statistical models.

**Key detail:** Processes `200+` markets daily across `20` US cities on AWS

**Expanded case study:**

**The problem:**
Prediction markets were taking off and people were claiming you could set up a trading bot overnight. I wanted to find out for myself what it actually takes to build one of these and whether there's a real edge behind the noise.

**What I built:**
I started from first principles. I researched how weather data is measured, where weather stations source their information, and how the data gets produced and hosted. I selected an AWS data center co-located in the same cluster as NOAA's weather data to minimize latency. Then I built the trading system: it ingests real-time NWP ensemble forecast data from NOAA, constructs empirical probability distributions with station-level bias correction, and executes trades on prediction exchanges with built-in risk controls like exposure ramps, drawdown circuit breakers, and per-market caps. It runs autonomously on AWS EC2, processing over 200 markets per cycle across 20 US cities, and sends me automated performance reports.

**The outcome:**
The system is fully operational. More useful to me, though, is the understanding I built along the way. The data engineering, the statistical modeling, the infrastructure decisions. The gap between the hype and the reality is significant, and the only way I could have known that was by building the thing.

---

### Project 6: Bella

**Framing question:** When the people I care about have a problem, I build the fix.

**Project title:** An AI Recipe App, from Concept to App Store

**Summary:** My girlfriend and my mom both love cooking, but their recipes were scattered across paper, social media, notes apps, and cookbooks. I'd never built an iOS app before. I built one anyway.

**Key detail:** Concept to App Store · built solo

**Expanded case study:**

**The problem:**
The two people in my life who cook the most had recipes saved in a dozen different places. Handwritten notes, Instagram saves, screenshots, bookmarked websites, physical cookbooks. They could never find what they needed when they needed it.

**What I built:**
Bella, an AI-powered recipe manager for iOS. You can import a recipe from anywhere: take a photo of a handwritten card, paste a web link, upload a screenshot. The AI extracts and organizes the recipe data, formats it cleanly, and saves it to your account. I'd never done iOS development before this project. I took it from concept to App Store launch on my own.

**The outcome:**
It's live on the App Store and used by my girlfriend, my mom, their family, and friends. It's the simplest project here, but it might be the most telling. I saw a problem, learned a new platform, and shipped a real product.

---

### Project Card Design Spec (applies to all 6)

**Card structure (collapsed):**
1. Framing question — small text, italic, `#64748B`, positioned above the title
2. Project title — Poppins, 20–24px, weight 600, `#1E293B`
3. Summary — Inter, 16px, `#475569`, 2–3 sentences max
4. Key metric/detail — large text (Poppins, 28–36px, weight 700, `#22D3EE`) with small descriptor below (Inter, 12–14px, `#64748B`)
5. "Read the full story ↓" link — `#22D3EE`, triggers expand

**Card structure (expanded):**
- Smooth accordion animation (300ms). Chevron or arrow rotates on expand.
- Sub-section labels ("The problem", "What I built", "The outcome") in uppercase, letter-spaced, `#22D3EE`, 12–14px
- Body text: Inter, 16px, `#475569`, line-height 1.7
- Short paragraphs only — no paragraph longer than 4 sentences
- Generous padding (24–32px)

**Card visual treatment:**
- Cards have subtle border or shadow to differentiate from background
- On hover (desktop): slight lift effect (translateY -2px, shadow increase)
- Each card separated by 24–32px of whitespace on mobile
- Consider alternating subtle background tints (e.g., `#FFFFFF` and `#F4F4F4`) for visual rhythm

---

## Section 3: About

### Copy

**Section label:** About Me

**Bio:**

I was born in Germany, raised in South Africa for six years, and moved to the United States, where I went to high school in New York and studied Management and Entrepreneurship at UT Austin's McCombs School of Business.

Growing up across three continents shaped how I think about problems. You develop an instinct for how different people experience the same situation, and you get comfortable operating in places where nothing feels familiar.

I co-founded my first company, a digital marketing agency, while still in school. That led to growth roles at startups, two summers in investment banking in New York, and eventually a deep dive into healthcare IT, where I managed large-scale projects and built service lines from scratch. The consistent thread across all of it was that the biggest problems I kept running into weren't technical. They were operational.

Today I run Constance IT. I build AI-powered workflow automation and managed IT services for small and medium-sized businesses. Enterprises have their consultancies and custom AI tools. Most SMBs don't have access to any of that. That's what I'm working on.

When I'm not building, I'm watching Formula One. I picked that up around four years old, watching races in my grandparents' basement in Germany. Some things stay with you.

**Recommendation quote:**

> "Max doesn't just identify opportunities. He creates them."
> — Dale Calvin, CEO, Integrity Healthcare IT Solutions

### Design Spec

**Background:** `#F4F4F4` continuing from projects, or a very subtle shift to `#FFFFFF` for distinction.

**Layout (mobile):**
1. Section label ("About Me") — same treatment as "What I Build": small, uppercase, letter-spaced, `#22D3EE`
2. Professional headshot — full-width on mobile, cropped tastefully
3. Bio text — Inter, 16–18px, `#1E293B`. Line-height 1.7. Paragraphs separated by whitespace.
4. Recommendation quote — styled as a pull quote: larger text (Inter, 20–24px, italic or weight 300), attribution in smaller accent-colored text. Subtle left border in `#22D3EE`.

**Layout (desktop):**
- Split: headshot on left (~40%), bio on right (~60%)
- Quote below the split, full-width, centered
- Or: single column, photo above text, quote below — depends on photo dimensions

**Animation:**
- Photo fades in on scroll
- Bio paragraphs fade in with slight stagger
- Quote fades in last

**Tone note:** This section should feel *warmer* than the projects section. Slightly larger type, slightly more generous spacing. It should feel like a conversation, not a data sheet.

---

## Section 4: Contact / Footer

### Copy

**Headline:** Let's Talk

**Subtext:** Whether you're a recruiter, a potential collaborator, or just want to say hello, I'd like to hear from you.

**Links:**
- Email: max@constanceit.com
- LinkedIn: linkedin.com/in/maxgregori
- Constance IT: constanceit.com

**Footer line:** Built by Max Gregori · 2026

### Design Spec

**Background:** Return to dark (`#0F172A`) — visual bookend with the hero. Site opens dark, flows through light content, closes dark. Creates a sense of completeness.

**Layout:**
1. "Let's Talk" — Poppins, 36–48px, `#E2E8F0`, weight 700. Centered.
2. Subtext — Inter, 16–18px, `#94A3B8`. Centered below headline.
3. Email as a prominent CTA button (`#22D3EE` background, `#0F172A` text, rounded corners). Centered.
4. LinkedIn and Constance IT as text links below the button, `#64748B`, hover → `#22D3EE`.
5. Footer line at very bottom — Inter, 12–14px, `#475569`, centered.

**Animation:**
- "Let's Talk" fades in on scroll
- Links stagger in below

**Transition from About:** Gradient fade from `#F4F4F4` to `#0F172A` or SVG curve divider. Mirror of the hero-to-projects transition, but reversed.

---

## Navigation Spec

**Behavior:** Hidden on initial hero load. Appears as a sticky bar when user scrolls past the hero section.

**Mobile (< 768px):**
- Hamburger icon, top-right, `#E2E8F0` on dark / `#1E293B` on light backgrounds
- Tap opens full-screen overlay (`#0F172A` background)
- Centered nav links: Work · About · Contact
- Links in Poppins, 24px, `#E2E8F0`
- Tap a link → overlay closes with fade, smooth scroll to section

**Desktop (≥ 768px):**
- Horizontal bar, subtle background blur (backdrop-filter)
- Name on left (Poppins, 16px, weight 600)
- Text links on right: Work · About · Contact (Inter, 14px)
- Active section highlighted with `#22D3EE` underline or color

**Smooth scroll:** CSS `scroll-behavior: smooth` + JS fallback. `scroll-padding-top` to account for sticky nav height.

---

## Animation Library Spec

**Library:** AOS (Animate on Scroll) — loaded via CDN (`https://unpkg.com/aos@2.3.1/dist/aos.css` + JS).

**Default animation:** `fade-up` with 400ms duration.

**Stagger pattern for project cards:** Each card gets +100ms delay (0, 100, 200, 300, 400, 500ms).

**Metric counters:** Lightweight custom JS or CountUp.js (~2KB). Numbers animate from 0 to final value over 1.5s when scrolled into view. Triggered once.

**Reduced motion:** All animations wrapped in `prefers-reduced-motion` check. If user prefers reduced motion, content is visible immediately.

---

## Performance Targets

- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Total page weight:** < 500KB (excluding headshot)
- **Headshot image:** WebP format, max 200KB, lazy-loaded if below fold
- **Fonts:** Preload Poppins 600+700 and Inter 400. Use `font-display: swap`.
- **JavaScript:** AOS + custom scroll/nav logic. No frameworks. Total JS < 20KB.
- **CSS:** Single stylesheet. CSS custom properties for color palette. No preprocessor needed.
- **HTML:** Semantic elements (`<header>`, `<main>`, `<section>`, `<footer>`, `<article>`). Accessible landmarks.

---

## File Structure (for Claude Code)

```
personal-site/
├── index.html          ← Single page, all sections
├── css/
│   └── style.css       ← All styles, mobile-first with media queries
├── js/
│   └── main.js         ← Nav, smooth scroll, AOS init, counters
├── images/
│   └── headshot.webp   ← Max's photo (to be added)
└── prompts/
    └── site-content-and-design-spec.md  ← This file
```
