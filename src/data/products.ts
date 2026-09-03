import type { ArchitectureLayer } from "@/components/architecture-diagram";

export type ProductImage = {
  src: string;
  alt: string;
  caption: string;
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  url: string;
  ownership: "end-to-end" | "contributor";
  problem: string;
  role: string;
  stack: string[];
  features: string[];
  images: ProductImage[];
  architecture: ArchitectureLayer[];
};

export const products: Product[] = [
  {
    slug: "screenshotapi",
    name: "Screenshotapi",
    tagline: "Managed screenshot and page-capture API for teams who don't want to run their own browser infrastructure",
    url: "https://screenshotapi.net",
    ownership: "end-to-end",
    problem:
      "Teams that need website screenshots or PDFs at scale end up running and babysitting their own Puppeteer/Playwright fleets. Screenshotapi replaces that with a single API call.",
    role:
      "Built end to end: design, coding, deployment, content, SEO, and marketing all done personally.",
    stack: [
      "Next.js",
      "Node.js",
      "Express.js",
      "Playwright",
      "Puppeteer",
      "PostgreSQL",
      "AWS S3",
      "Wasabi",
      "Google Cloud Storage",
      "Stripe",
      "Creem",
    ],
    features: [
      "Full-page or viewport screenshots in PNG, JPG, WebP, PDF, MP4, or GIF",
      "Cron-based scheduling for recurring captures",
      "Bulk processing for thousands of URLs at once",
      "20,000+ built-in ad and cookie-blocking rules",
      "Device emulation across desktop, tablet, and mobile viewports",
      "Subscription billing via Stripe and Creem",
    ],
    images: [
      { src: "/products/screenshotapi-hero.png", alt: "Screenshotapi homepage hero", caption: "screenshotapi.net — Homepage" },
      { src: "/products/screenshotapi-features.png", alt: "Screenshotapi features section", caption: "screenshotapi.net — Features" },
      { src: "/products/screenshotapi-details.png", alt: "Screenshotapi product details section", caption: "screenshotapi.net — How it works" },
      { src: "/products/screenshotapi-pricing.png", alt: "Screenshotapi pricing page", caption: "screenshotapi.net — Pricing" },
      { src: "/products/screenshotapi-footer.png", alt: "Screenshotapi footer section", caption: "screenshotapi.net — Footer" },
    ],
    architecture: [
      { title: "Client", nodes: [{ label: "Client", detail: "API call or dashboard request", kind: "client" }] },
      {
        title: "API Layer",
        nodes: [
          { label: "API Gateway", detail: "Node.js / Express routing", kind: "service" },
          { label: "Rate Limiter", detail: "Per-plan request throttling", kind: "service" },
          { label: "Billing Check", detail: "Stripe / Creem subscription check", kind: "external" },
        ],
      },
      { title: "Queue", nodes: [{ label: "Job Queue", detail: "Capture jobs queued for workers", kind: "queue" }] },
      {
        title: "Render Workers",
        nodes: [
          { label: "Playwright Worker", detail: "Headless Chromium rendering", kind: "service" },
          { label: "Puppeteer Worker", detail: "Headless Chromium rendering", kind: "service" },
          { label: "Ad/Cookie Blocker", detail: "20,000+ blocking rules applied", kind: "service" },
        ],
      },
      {
        title: "Storage",
        nodes: [
          { label: "AWS S3", detail: "Primary object storage", kind: "datastore" },
          { label: "Wasabi", detail: "Cost-efficient archival storage", kind: "datastore" },
          { label: "Google Cloud Storage", detail: "Alternate storage target", kind: "datastore" },
        ],
      },
      {
        title: "Delivery",
        nodes: [
          { label: "Signed URL / File", detail: "Returned to client", kind: "output" },
          { label: "Webhook", detail: "Optional completion callback", kind: "output" },
        ],
      },
    ],
  },
  {
    slug: "verid",
    name: "Verid",
    tagline: "Developer-first web change detection API that monitors pages and notifies you only when it matters",
    url: "https://verid.dev",
    ownership: "end-to-end",
    problem:
      "Teams monitoring pages for changes either build brittle DIY scrapers or use screenshot-only tools that can't tell them what actually changed. Verid handles fetching, diffing, and alerting as one loop.",
    role:
      "Built end to end: design, coding, deployment, content, SEO, and marketing all done personally.",
    stack: [
      "REST API (OpenAPI 3.1)",
      "Node.js SDK",
      "Headless browser automation",
      "Residential proxies",
      "Webhooks (HMAC signed)",
      "Slack / Discord integrations",
    ],
    features: [
      "Six extraction methods: CSS, XPath, JSONPath, regex, full-page hash, and AI/LLM",
      "Predicate-based alerting that only fires when a rule actually matches",
      "Multi-destination delivery: HMAC-signed webhooks, Slack, Discord, email",
      "Automatic escalation ladder: static fetch → headless browser → residential proxy",
    ],
    images: [
      { src: "/products/verid-hero.png", alt: "Verid homepage hero", caption: "verid.dev — Homepage" },
      { src: "/products/verid-features.png", alt: "Verid features section", caption: "verid.dev — Features" },
      { src: "/products/verid-details.png", alt: "Verid product details section", caption: "verid.dev — How it works" },
      { src: "/products/verid-pricing.png", alt: "Verid pricing page", caption: "verid.dev — Pricing" },
      { src: "/products/verid-footer.png", alt: "Verid footer section", caption: "verid.dev — Footer" },
    ],
    architecture: [
      { title: "Client", nodes: [{ label: "Monitor Config", detail: "Selector + predicate defined", kind: "client" }] },
      {
        title: "Scheduler",
        nodes: [
          { label: "Scheduler", detail: "Triggers fetch on interval", kind: "service" },
          { label: "Retry Manager", detail: "Handles failed fetch retries", kind: "service" },
        ],
      },
      {
        title: "Escalation Ladder",
        nodes: [
          { label: "Static Fetch", detail: "Lightweight HTTP fetch first", kind: "service" },
          { label: "Headless Browser", detail: "Escalates for JS-heavy pages", kind: "service" },
          { label: "Residential Proxy", detail: "Escalates for bot-protected sites", kind: "external" },
        ],
      },
      {
        title: "Extraction & Diff",
        nodes: [
          { label: "Field Extractor", detail: "CSS / XPath / JSONPath / regex / AI", kind: "service" },
          { label: "Diff Engine", detail: "Compares against last known state", kind: "service" },
          { label: "State Store", detail: "Field-level diff history", kind: "datastore" },
        ],
      },
      { title: "Rules", nodes: [{ label: "Predicate Engine", detail: "Evaluates the user-defined rule", kind: "service" }] },
      {
        title: "Notification",
        nodes: [
          { label: "Webhook", detail: "HMAC-signed payload", kind: "output" },
          { label: "Slack / Discord", detail: "Chat integrations", kind: "output" },
          { label: "Email", detail: "Fallback delivery channel", kind: "output" },
        ],
      },
    ],
  },
  {
    slug: "whoisfreaks",
    name: "WhoisFreaks",
    tagline: "Real-time WHOIS, DNS, and IP intelligence API covering 940M+ domains",
    url: "https://whoisfreaks.com",
    ownership: "contributor",
    problem:
      "Security and brand-protection teams need live and historical domain, DNS, and IP data without building their own crawling and data pipeline.",
    role: "Contributed frontend and feature work as part of the JFreaks product team.",
    stack: ["REST API", "Python SDK", "Cloudflare"],
    features: [
      "Live, historical, and reverse WHOIS lookup",
      "DNS record access (A, MX, NS, SPF)",
      "IP geolocation and reputation analysis",
      "Subdomain discovery and domain reputation scoring",
      "Threat intelligence feeds",
    ],
    images: [
      { src: "/products/whoisfreaks-hero.png", alt: "WhoisFreaks homepage hero", caption: "whoisfreaks.com — Homepage" },
      { src: "/products/whoisfreaks-features.png", alt: "WhoisFreaks features section", caption: "whoisfreaks.com — Features" },
      { src: "/products/whoisfreaks-details.png", alt: "WhoisFreaks product details section", caption: "whoisfreaks.com — Data coverage" },
      { src: "/products/whoisfreaks-pricing.png", alt: "WhoisFreaks pricing section", caption: "whoisfreaks.com — Pricing" },
      { src: "/products/whoisfreaks-footer.png", alt: "WhoisFreaks footer section", caption: "whoisfreaks.com — Footer" },
    ],
    architecture: [
      { title: "Client", nodes: [{ label: "Client", detail: "REST request (JSON/XML)", kind: "client" }] },
      {
        title: "Edge",
        nodes: [
          { label: "Cloudflare", detail: "Edge network + DDoS protection", kind: "external" },
          { label: "API Gateway", detail: "Auth + rate limiting", kind: "service" },
        ],
      },
      { title: "Query Layer", nodes: [{ label: "Query Router", detail: "Routes to WHOIS / DNS / IP lookup", kind: "service" }] },
      {
        title: "Data Lake",
        nodes: [
          { label: "WHOIS Records", detail: "4.3B+ records", kind: "datastore" },
          { label: "DNS Records", detail: "18B+ records", kind: "datastore" },
          { label: "IP Reputation DB", detail: "Geolocation + reputation data", kind: "datastore" },
        ],
      },
      { title: "Response", nodes: [{ label: "Structured Response", detail: "JSON / XML domain, DNS, or IP data", kind: "output" }] },
    ],
  },
  {
    slug: "currencyfreaks",
    name: "CurrencyFreaks",
    tagline: "Real-time and historical exchange rate API for 1,000+ currencies, including crypto",
    url: "https://currencyfreaks.com",
    ownership: "contributor",
    problem:
      "Developers need low-latency, reliable exchange-rate data across fiat, crypto, and precious metals without stitching together multiple sources.",
    role: "Contributed frontend and feature work as part of the JFreaks product team.",
    stack: ["REST API", "Multi-language SDKs (Python, Node.js, PHP, Ruby, Java, Go)"],
    features: [
      "Live rates for 166 fiat currencies, 860 cryptocurrencies, and 4 precious metals",
      "Historical data back to November 1984",
      "Time-series and fluctuation endpoints for backtesting",
      "JSON and XML response formats",
      "~128ms average global latency via geolocation-based routing",
    ],
    images: [
      { src: "/products/currencyfreaks-hero.png", alt: "CurrencyFreaks homepage hero", caption: "currencyfreaks.com — Homepage" },
      { src: "/products/currencyfreaks-features.png", alt: "CurrencyFreaks features section", caption: "currencyfreaks.com — Features" },
      { src: "/products/currencyfreaks-details.png", alt: "CurrencyFreaks product details section", caption: "currencyfreaks.com — Coverage" },
      { src: "/products/currencyfreaks-pricing.png", alt: "CurrencyFreaks pricing page", caption: "currencyfreaks.com — Pricing" },
      { src: "/products/currencyfreaks-footer.png", alt: "CurrencyFreaks footer section", caption: "currencyfreaks.com — Footer" },
    ],
    architecture: [
      { title: "Client", nodes: [{ label: "Client", detail: "REST request", kind: "client" }] },
      { title: "Edge", nodes: [{ label: "Geo Router", detail: "Nearest-region routing (~128ms avg)", kind: "service" }] },
      {
        title: "Aggregation",
        nodes: [
          { label: "Rate Aggregator", detail: "Collects and normalizes source rates", kind: "service" },
          { label: "Source Feeds", detail: "Fiat, crypto, and precious metals feeds", kind: "external" },
        ],
      },
      {
        title: "Cache & Storage",
        nodes: [
          { label: "Rate Cache", detail: "Low-latency in-memory cache", kind: "datastore" },
          { label: "Historical Store", detail: "Data back to November 1984", kind: "datastore" },
        ],
      },
      { title: "Response", nodes: [{ label: "JSON / XML Response", detail: "Exchange-rate data returned", kind: "output" }] },
    ],
  },
  {
    slug: "webscrapeai",
    name: "Webscrape AI",
    tagline: "No-code web scraping: enter a URL and the fields you want, get structured data back",
    url: "https://webscrapeai.com",
    ownership: "contributor",
    problem:
      "Non-technical teams need scraped data without writing scrapers or managing proxies and anti-bot handling themselves.",
    role: "Designed and built the frontend, including scroll-based UX with the Intersection Observer API.",
    stack: ["Next.js", "Intersection Observer API", "Proxy rotation", "JS rendering engine"],
    features: [
      "No-code interface: just the URL and the fields to extract",
      "AI-assisted field detection",
      "Bulk scraping and pagination support",
      "Proxy support and JavaScript-wait handling on higher tiers",
    ],
    images: [
      { src: "/products/webscrapeai-hero.png", alt: "Webscrape AI homepage hero", caption: "webscrapeai.com — Homepage" },
      { src: "/products/webscrapeai-features.png", alt: "Webscrape AI features section", caption: "webscrapeai.com — Features" },
      { src: "/products/webscrapeai-details.png", alt: "Webscrape AI product details section", caption: "webscrapeai.com — How it works" },
      { src: "/products/webscrapeai-pricing.png", alt: "Webscrape AI pricing section", caption: "webscrapeai.com — Pricing" },
      { src: "/products/webscrapeai-footer.png", alt: "Webscrape AI footer section", caption: "webscrapeai.com — Footer" },
    ],
    architecture: [
      { title: "Client", nodes: [{ label: "Client", detail: "URL + target fields submitted", kind: "client" }] },
      { title: "Queue", nodes: [{ label: "Job Queue", detail: "Scrape request queued", kind: "queue" }] },
      {
        title: "Scraper Engine",
        nodes: [
          { label: "JS Renderer", detail: "Headless rendering for dynamic pages", kind: "service" },
          { label: "Proxy Rotator", detail: "Rotates IPs to avoid blocks", kind: "external" },
        ],
      },
      { title: "AI Extraction", nodes: [{ label: "Field Matcher", detail: "AI-assisted field detection", kind: "service" }] },
      { title: "Output", nodes: [{ label: "Structured Data", detail: "Delivered to client as JSON", kind: "output" }] },
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
