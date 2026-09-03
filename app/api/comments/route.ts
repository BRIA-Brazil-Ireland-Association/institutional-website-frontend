import { getFirestoreDb } from "@/libs/firebase-admin";
import { z } from "@/libs/validation";
import { FieldValue } from "firebase-admin/firestore";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const COMMENTS_COLLECTION = "comments";

const submitCommentSchema = z.object({
  slug: z.string().trim().min(1),
  authorName: z.string().trim().min(2).max(120),
  authorEmail: z.string().trim().email(),
  content: z.string().trim().min(5).max(2000),
});

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");

  if (!slug) {
    return Response.json({ error: "MISSING_SLUG" }, { status: 400 });
  }

  const db = getFirestoreDb();
  const snapshot = await db
    .collection(COMMENTS_COLLECTION)
    .where("articleSlug", "==", slug)
    .get();

  const comments = snapshot.docs
    .map((doc) => {
      const data = doc.data();
      const createdAt = data.createdAt?.toDate?.() as Date | undefined;

      return {
        authorName: data.authorName as string,
        content: data.content as string,
        createdAt: createdAt?.toISOString() ?? null,
        createdAtMs: createdAt?.getTime() ?? 0,
      };
    })
    .sort((a, b) => a.createdAtMs - b.createdAtMs)
    .map(({ authorName, content, createdAt }) => ({
      authorName,
      content,
      createdAt,
    }));

  return Response.json({ data: comments });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const result = submitCommentSchema.safeParse(body);

  if (!result.success) {
    return Response.json({ error: "VALIDATION_ERROR" }, { status: 400 });
  }

  const { slug, authorName, authorEmail, content } = result.data;
  const db = getFirestoreDb();

  await db.collection(COMMENTS_COLLECTION).add({
    articleSlug: slug,
    authorName,
    authorEmail,
    content,
    createdAt: FieldValue.serverTimestamp(),
  });

  return Response.json({ success: true }, { status: 201 });
}
