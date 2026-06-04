import { Router } from "express";
import { db } from "@workspace/db";
import { postsTable, categoriesTable } from "@workspace/db";
import { eq, desc, sql } from "drizzle-orm";
import {
  ListPostsQueryParams,
  GetPostParams,
} from "@workspace/api-zod";

const router = Router();

router.get("/posts", async (req, res) => {
  const query = ListPostsQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: "Invalid query params" });
    return;
  }
  const { category, limit = 20, offset = 0 } = query.data;

  const posts = await db
    .select()
    .from(postsTable)
    .where(category ? eq(postsTable.categorySlug, category) : undefined)
    .orderBy(desc(postsTable.publishedAt))
    .limit(limit)
    .offset(offset);

  res.json(
    posts.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      content: p.content,
      category: p.category,
      tags: p.tags,
      coverImage: p.coverImage,
      sourceUrl: p.sourceUrl,
      publishedAt: p.publishedAt.toISOString(),
      readingTimeMinutes: p.readingTimeMinutes,
    }))
  );
});

router.get("/posts/featured", async (req, res) => {
  const posts = await db
    .select()
    .from(postsTable)
    .orderBy(desc(postsTable.publishedAt))
    .limit(5);

  res.json(
    posts.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      content: p.content,
      category: p.category,
      tags: p.tags,
      coverImage: p.coverImage,
      sourceUrl: p.sourceUrl,
      publishedAt: p.publishedAt.toISOString(),
      readingTimeMinutes: p.readingTimeMinutes,
    }))
  );
});

router.get("/posts/:id", async (req, res) => {
  const params = GetPostParams.safeParse({ id: Number(req.params.id) });
  if (!params.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const [post] = await db
    .select()
    .from(postsTable)
    .where(eq(postsTable.id, params.data.id));

  if (!post) {
    res.status(404).json();
    return;
  }

  res.json({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    category: post.category,
    tags: post.tags,
    coverImage: post.coverImage,
    sourceUrl: post.sourceUrl,
    publishedAt: post.publishedAt.toISOString(),
    readingTimeMinutes: post.readingTimeMinutes,
  });
});

router.get("/categories", async (req, res) => {
  const categories = await db
    .select()
    .from(categoriesTable)
    .orderBy(desc(categoriesTable.postCount));

  res.json(
    categories.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      postCount: c.postCount,
      description: c.description,
    }))
  );
});

router.get("/stats", async (req, res) => {
  const [postCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(postsTable);

  const [catCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(categoriesTable);

  const [latest] = await db
    .select({ publishedAt: postsTable.publishedAt })
    .from(postsTable)
    .orderBy(desc(postsTable.publishedAt))
    .limit(1);

  res.json({
    totalPosts: postCount?.count ?? 0,
    totalCategories: catCount?.count ?? 0,
    latestPostDate: latest?.publishedAt?.toISOString() ?? new Date().toISOString(),
  });
});

export default router;
