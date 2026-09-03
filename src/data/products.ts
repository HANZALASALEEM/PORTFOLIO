export type ArchitectureStep = {
  label: string;
  detail: string;
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
  architecture: ArchitectureStep[];
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
    architecture: [
      { label: "Client", detail: "API call or dashboard request" },
      { label: "API Layer", detail: "Node.js / Express request handling" },
      { label: "Render Engine", detail: "Playwright / Puppeteer capture" },
      { label: "Storage", detail: "AWS S3, Wasabi, or Google Cloud Storage" },
      { label: "Delivery", detail: "Signed URL or file returned to client" },
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
    architecture: [
      { label: "Monitor Config", detail: "Client defines selector + predicate" },
      { label: "Scheduler", detail: "Triggers fetch on interval" },
      { label: "Escalation Ladder", detail: "Static fetch → headless browser → proxy" },
      { label: "Diff Engine", detail: "Compares state, evaluates predicate" },
      { label: "Notification", detail: "HMAC-signed webhook, Slack, Discord, or email" },
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
    architecture: [
      { label: "Client", detail: "REST request (JSON/XML)" },
      { label: "Edge", detail: "Cloudflare-fronted API gateway" },
      { label: "Data Lake", detail: "940M+ domains, 4.3B+ WHOIS records" },
      { label: "Response", detail: "Structured domain / DNS / IP data" },
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
    architecture: [
      { label: "Client", detail: "REST request" },
      { label: "Geo Routing", detail: "Nearest-region edge routing" },
      { label: "Rate Aggregator", detail: "Collects and normalizes source rates" },
      { label: "Cache Store", detail: "Low-latency rate cache" },
      { label: "Response", detail: "JSON / XML exchange-rate data" },
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
    architecture: [
      { label: "Client", detail: "URL + target fields submitted" },
      { label: "Job Queue", detail: "Scrape request queued" },
      { label: "Scraper Engine", detail: "JS rendering + proxy rotation" },
      { label: "AI Extraction", detail: "Fields matched from rendered page" },
      { label: "Output", detail: "Structured data delivered to client" },
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
