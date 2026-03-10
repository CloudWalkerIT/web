import fs from "fs";
import path from "path";
import matter from "gray-matter";

const insightsDir = path.join(process.cwd(), "src/content/insights");

export interface InsightMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  readTime: string;
}

export interface Insight extends InsightMeta {
  content: string;
}

export function getAllInsights(): InsightMeta[] {
  const files = fs.readdirSync(insightsDir).filter((f) => f.endsWith(".md"));

  const insights = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(insightsDir, filename), "utf-8");
    const { data } = matter(raw);

    return {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      date: data.date ?? "",
      author: data.author ?? "Cloudwalker IT",
      tags: data.tags ?? [],
      readTime: data.readTime ?? "5 min read",
    };
  });

  return insights.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getInsightBySlug(slug: string): Insight | null {
  const filePath = path.join(insightsDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? "",
    author: data.author ?? "Cloudwalker IT",
    tags: data.tags ?? [],
    readTime: data.readTime ?? "5 min read",
    content,
  };
}

export function getAllInsightSlugs(): string[] {
  return fs
    .readdirSync(insightsDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}
