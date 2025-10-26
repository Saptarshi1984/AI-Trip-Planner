import { NextResponse } from "next/server";

type GoogleSearchError = {
  error?: {
    message?: string;
    errors?: Array<{ message?: string }>;
  };
  items?: Array<Record<string, unknown>>;
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim();

    if (!q) {
      return NextResponse.json({ error: "Missing q" }, { status: 400 });
    }

    const cx = process.env.GOOGLE_CSE_ID;
    const key = process.env.GOOGLE_API_KEY;

    if (!cx || !key) {
      return NextResponse.json(
        { error: "Google search credentials are not configured" },
        { status: 500 }
      );
    }

    const url = new URL("https://www.googleapis.com/customsearch/v1");
    url.searchParams.set("q", q);
    url.searchParams.set("cx", cx);
    url.searchParams.set("key", key);
    url.searchParams.set("searchType", "image");
    url.searchParams.set("num", "10"); // allowed range 1-10
    url.searchParams.set("safe", "active"); // filter adult content
    url.searchParams.set("imgSize", "large");
    url.searchParams.set("imgType", "photo");

    const resp = await fetch(url.toString(), { cache: "no-store" });
    const data = (await resp.json()) as GoogleSearchError;

    if (!resp.ok) {
      const googleError =
        data?.error?.message ||
        data?.error?.errors?.[0]?.message ||
        `Google error ${resp.status}`;

      return NextResponse.json({ error: googleError }, { status: 502 });
    }

    const items = (data.items ?? []).map((it) => {
      const imageInfo = (it as { image?: Record<string, unknown> }).image ?? {};

      return {
        url: (it as { link?: string }).link ?? "",
        thumb: (imageInfo as { thumbnailLink?: string }).thumbnailLink ?? "",
        context: (imageInfo as { contextLink?: string }).contextLink ?? "",
        title: (it as { title?: string }).title ?? "",
        mime: (it as { mime?: string }).mime,
        width: (imageInfo as { width?: number }).width,
        height: (imageInfo as { height?: number }).height,
      };
    });

    const highResItems = items.filter(
      (item) =>
        (typeof item.width === "number" && item.width >= 1200) ||
        (typeof item.height === "number" && item.height >= 800)
    );

    return NextResponse.json({ items: highResItems.length ? highResItems : items });
  } catch (error) {
    console.error("Google image search failed", error);
    return NextResponse.json(
      { error: "Unexpected error contacting Google Images" },
      { status: 500 }
    );
  }
}
