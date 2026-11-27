#!/usr/bin/env bun

import { access, readFile } from "node:fs/promises";
import path from "node:path";

const SITE_ORIGIN = "https://zhuojg.github.io";
const DEVTO_API_BASE = "https://dev.to/api";
const POSTS_DIR = path.resolve(process.cwd(), "src/posts");

interface CliOptions {
  target: string;
  published: boolean;
  dryRun: boolean;
  keyFile?: string;
  tagsOverride?: string[];
}

interface ParsedFrontmatter {
  title?: string;
  summary?: string;
  description?: string;
  tags?: string[];
  publishedAt?: string;
  slug?: string;
}

interface DevtoArticleSummary {
  id: number;
  title: string;
  published: boolean;
  url?: string;
  canonical_url?: string | null;
}

interface DevtoArticleResponse {
  id: number;
  title: string;
  published: boolean;
  url?: string;
  canonical_url?: string | null;
  slug?: string;
}

function printUsage(): void {
  console.log(
    [
      "Usage:",
      "  bun run scripts/publish-devto.ts <slug-or-mdx-path> [--draft | --publish] [--dry-run] [--key-file <path>] [--tags <t1,t2,...>]",
      "",
      "Options:",
      "  --draft             Publish as draft (default)",
      "  --publish           Publish live on Dev.to",
      "  --dry-run           Parse and validate without calling Dev.to API",
      "  --key-file <path>   Read Dev.to API key from file (fallback: DEV_TO_API_KEY env)",
      "  --tags <csv>        Override frontmatter tags (max 4, sanitized for Forem)",
      "  -h, --help          Show this help message",
    ].join("\n"),
  );
}

function parseCliArgs(argv: string[]): CliOptions {
  let target: string | undefined;
  let hasDraft = false;
  let hasPublish = false;
  let dryRun = false;
  let keyFile: string | undefined;
  let tagsOverride: string[] | undefined;

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "-h" || arg === "--help") {
      printUsage();
      process.exit(0);
    } else if (arg === "--draft") {
      hasDraft = true;
    } else if (arg === "--publish") {
      hasPublish = true;
    } else if (arg === "--dry-run") {
      dryRun = true;
    } else if (arg === "--key-file") {
      const next = argv[i + 1];
      if (!next || next.startsWith("-")) {
        throw new Error("Missing value for --key-file");
      }
      keyFile = next;
      i += 1;
    } else if (arg.startsWith("--key-file=")) {
      keyFile = arg.slice("--key-file=".length);
      if (!keyFile) {
        throw new Error("Missing value for --key-file");
      }
    } else if (arg === "--tags") {
      const next = argv[i + 1];
      if (!next || next.startsWith("-")) {
        throw new Error("Missing value for --tags");
      }
      tagsOverride = next.split(",");
      i += 1;
    } else if (arg.startsWith("--tags=")) {
      tagsOverride = arg.slice("--tags=".length).split(",");
    } else if (arg.startsWith("-")) {
      throw new Error(`Unknown option: ${arg}`);
    } else if (!target) {
      target = arg;
    } else {
      throw new Error(`Unexpected positional argument: ${arg}`);
    }
  }

  if (hasDraft && hasPublish) {
    throw new Error("Cannot specify both --draft and --publish");
  }

  if (!target) {
    printUsage();
    throw new Error("Missing required <slug-or-mdx-path> argument");
  }

  return {
    target,
    published: hasPublish,
    dryRun,
    keyFile,
    tagsOverride,
  };
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function resolveMdxPath(target: string): Promise<string> {
  const directPath = path.resolve(process.cwd(), target);
  if (await fileExists(directPath)) {
    return directPath;
  }

  const normalizedSlug = target.replace(/\.mdx$/i, "");
  const postPath = path.join(POSTS_DIR, `${normalizedSlug}.mdx`);
  if (await fileExists(postPath)) {
    return postPath;
  }

  throw new Error(
    `Could not find MDX file for "${target}" (checked ${directPath} and ${postPath})`,
  );
}

function unquoteScalar(raw: string): string {
  const trimmed = raw.trim();
  if (trimmed.length >= 2 && trimmed.startsWith('"') && trimmed.endsWith('"')) {
    try {
      return JSON.parse(trimmed) as string;
    } catch {
      return trimmed.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
    }
  }
  if (trimmed.length >= 2 && trimmed.startsWith("'") && trimmed.endsWith("'")) {
    return trimmed.slice(1, -1).replace(/''/g, "'");
  }
  return trimmed;
}

function parseInlineArray(raw: string): string[] {
  const trimmed = raw.trim();
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    const inner = trimmed.slice(1, -1).trim();
    if (!inner) {
      return [];
    }
    const items: string[] = [];
    let current = "";
    let quote: '"' | "'" | null = null;
    for (let i = 0; i < inner.length; i += 1) {
      const ch = inner[i];
      if (quote) {
        if (ch === "\\" && quote === '"' && i + 1 < inner.length) {
          current += ch + inner[i + 1];
          i += 1;
        } else if (ch === quote) {
          current += ch;
          quote = null;
        } else {
          current += ch;
        }
      } else if (ch === '"' || ch === "'") {
        quote = ch;
        current += ch;
      } else if (ch === ",") {
        if (current.trim()) {
          items.push(unquoteScalar(current));
        }
        current = "";
      } else {
        current += ch;
      }
    }
    if (current.trim()) {
      items.push(unquoteScalar(current));
    }
    return items;
  }

  const scalar = unquoteScalar(trimmed);
  if (!scalar) {
    return [];
  }
  return scalar
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseMdx(rawContent: string): {
  frontmatter: ParsedFrontmatter;
  body: string;
} {
  const normalized = rawContent.replace(/\r\n/g, "\n");
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    throw new Error("MDX file is missing valid YAML frontmatter delimited by ---");
  }

  const frontmatterBlock = match[1];
  const body = match[2].replace(/^\n+/, "");
  const frontmatter: ParsedFrontmatter = {};
  const lines = frontmatterBlock.split("\n");

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith("#")) {
      continue;
    }

    const keyValueMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!keyValueMatch) {
      continue;
    }

    const key = keyValueMatch[1];
    const rawValue = keyValueMatch[2].trim();

    if (key === "tags") {
      if (rawValue) {
        frontmatter.tags = parseInlineArray(rawValue);
      } else {
        const listItems: string[] = [];
        while (i + 1 < lines.length) {
          const nextLine = lines[i + 1];
          const itemMatch = nextLine.match(/^\s*-\s+(.*)$/);
          if (!itemMatch) {
            break;
          }
          listItems.push(unquoteScalar(itemMatch[1]));
          i += 1;
        }
        frontmatter.tags = listItems;
      }
      continue;
    }

    const value = unquoteScalar(rawValue);
    if (key === "title") {
      frontmatter.title = value;
    } else if (key === "summary") {
      frontmatter.summary = value;
    } else if (key === "description") {
      frontmatter.description = value;
    } else if (key === "publishedAt") {
      frontmatter.publishedAt = value;
    } else if (key === "slug") {
      frontmatter.slug = value;
    }
  }

  return { frontmatter, body };
}

function sanitizeTags(rawTags: string[]): string[] {
  const seen = new Set<string>();
  const cleaned: string[] = [];

  for (const tag of rawTags) {
    const normalized = tag.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (!normalized || seen.has(normalized)) {
      continue;
    }
    seen.add(normalized);
    cleaned.push(normalized);
    if (cleaned.length === 4) {
      break;
    }
  }

  return cleaned;
}

function rewriteRelativeImageUrls(markdown: string, siteOrigin: string): string {
  const origin = siteOrigin.replace(/\/+$/, "");
  const lines = markdown.split("\n");
  let inFence = false;
  let fenceMarker = "";

  const transformedLines = lines.map((line) => {
    const fenceMatch = line.match(/^\s*(`{3,}|~{3,})/);
    if (fenceMatch) {
      const marker = fenceMatch[1][0];
      if (!inFence) {
        inFence = true;
        fenceMarker = marker;
      } else if (marker === fenceMarker) {
        inFence = false;
        fenceMarker = "";
      }
      return line;
    }

    if (inFence) {
      return line;
    }

    // Rewrite Markdown images: ![alt](/path/to/img.webp) or ![alt](/path "title")
    let updated = line.replace(
      /(!\[[^\]]*\]\()(\/(?!\/)[^)\s]+)([^)]*\))/g,
      `$1${origin}$2$3`,
    );

    // Rewrite HTML src="/..." attributes (double or single quoted)
    updated = updated.replace(
      /(<img\b[^>]*\bsrc=)(["'])(\/(?!\/)[^"']+)\2/gi,
      `$1$2${origin}$3$2`,
    );

    return updated;
  });

  return transformedLines.join("\n");
}

function extractImageUrls(markdown: string): string[] {
  const urls: string[] = [];
  const mdImageRegex = /!\[[^\]]*\]\(([^\s)]+)(?:\s+["'][^"']*["'])?\)/g;
  const htmlImageRegex = /<img\b[^>]*\bsrc=["']([^"']+)["']/gi;

  for (const match of markdown.matchAll(mdImageRegex)) {
    urls.push(match[1]);
  }
  for (const match of markdown.matchAll(htmlImageRegex)) {
    urls.push(match[1]);
  }

  return urls;
}

async function resolveApiKey(keyFile?: string): Promise<string> {
  if (keyFile) {
    const resolved = path.resolve(process.cwd(), keyFile);
    const content = (await readFile(resolved, "utf8")).trim();
    if (!content) {
      throw new Error(`API key file is empty: ${resolved}`);
    }
    return content;
  }

  const envKey = process.env.DEV_TO_API_KEY?.trim();
  if (envKey) {
    return envKey;
  }

  throw new Error(
    "Missing Dev.to API key. Set DEV_TO_API_KEY or pass --key-file <path>.",
  );
}

function normalizeUrl(url: string | null | undefined): string {
  return (url ?? "").trim().replace(/\/+$/, "");
}

async function findExistingArticleByCanonicalUrl(
  apiKey: string,
  canonicalUrl: string,
): Promise<DevtoArticleSummary | undefined> {
  const response = await fetch(`${DEVTO_API_BASE}/articles/me/all?per_page=1000`, {
    method: "GET",
    headers: {
      "api-key": apiKey,
      Accept: "application/vnd.forem.api-v1+json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to fetch existing Dev.to articles (HTTP ${response.status}): ${errorText}`,
    );
  }

  const articles = (await response.json()) as DevtoArticleSummary[];
  const target = normalizeUrl(canonicalUrl);
  return articles.find((article) => normalizeUrl(article.canonical_url) === target);
}

async function upsertDevtoArticle(params: {
  apiKey: string;
  existingId?: number;
  title: string;
  description: string;
  canonicalUrl: string;
  tags: string[];
  published: boolean;
  bodyMarkdown: string;
}): Promise<DevtoArticleResponse> {
  const isUpdate = typeof params.existingId === "number";
  const endpoint = isUpdate
    ? `${DEVTO_API_BASE}/articles/${params.existingId}`
    : `${DEVTO_API_BASE}/articles`;

  const response = await fetch(endpoint, {
    method: isUpdate ? "PUT" : "POST",
    headers: {
      "api-key": params.apiKey,
      "Content-Type": "application/json",
      Accept: "application/vnd.forem.api-v1+json",
    },
    body: JSON.stringify({
      article: {
        title: params.title,
        body_markdown: params.bodyMarkdown,
        published: params.published,
        description: params.description,
        canonical_url: params.canonicalUrl,
        tags: params.tags,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to ${isUpdate ? "update" : "create"} Dev.to article (HTTP ${response.status}): ${errorText}`,
    );
  }

  return (await response.json()) as DevtoArticleResponse;
}

async function main(): Promise<void> {
  const options = parseCliArgs(process.argv.slice(2));
  const mdxPath = await resolveMdxPath(options.target);
  const rawContent = await readFile(mdxPath, "utf8");
  const { frontmatter, body } = parseMdx(rawContent);

  const slug =
    frontmatter.slug?.trim() || path.basename(mdxPath, path.extname(mdxPath));
  const title = frontmatter.title?.trim();
  if (!title) {
    throw new Error(`Missing required "title" in frontmatter of ${mdxPath}`);
  }

  const description = (
    frontmatter.description ??
    frontmatter.summary ??
    ""
  ).trim();
  const canonicalUrl = `${SITE_ORIGIN}/${slug.replace(/^\/+/, "")}`;
  const rawTags = options.tagsOverride ?? frontmatter.tags ?? [];
  const tags = sanitizeTags(rawTags);
  const transformedBody = rewriteRelativeImageUrls(body, SITE_ORIGIN);
  const imageUrls = extractImageUrls(transformedBody);

  if (options.dryRun) {
    console.log(
      JSON.stringify(
        {
          mode: "dry-run",
          source: path.relative(process.cwd(), mdxPath),
          status: options.published ? "published" : "draft",
          title,
          slug,
          publishedAt: frontmatter.publishedAt ?? null,
          description,
          canonical_url: canonicalUrl,
          tags,
          image_count: imageUrls.length,
          images: imageUrls,
          body_chars: transformedBody.length,
        },
        null,
        2,
      ),
    );
    return;
  }

  const apiKey = await resolveApiKey(options.keyFile);
  const existing = await findExistingArticleByCanonicalUrl(apiKey, canonicalUrl);
  const result = await upsertDevtoArticle({
    apiKey,
    existingId: existing?.id,
    title,
    description,
    canonicalUrl,
    tags,
    published: options.published,
    bodyMarkdown: transformedBody,
  });

  const articleUrl = result.url ?? null;
  const editUrl = articleUrl
    ? `${articleUrl.replace(/\/+$/, "")}/edit`
    : `https://dev.to/dashboard`;

  console.log(
    JSON.stringify(
      {
        action: existing ? "updated" : "created",
        id: result.id,
        status: result.published ? "published" : "draft",
        title: result.title,
        canonical_url: result.canonical_url ?? canonicalUrl,
        url: articleUrl,
        edit_url: editUrl,
      },
      null,
      2,
    ),
  );
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Error: ${message}`);
  process.exit(1);
});
