import { NextResponse } from "next/server";

export async function GET() {
    try {
        const IG_ID = process.env.INSTAGRAM_ID;
        const TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

        const res = await fetch(
            `https://graph.facebook.com/v18.0/${IG_ID}/media?fields=id,caption,media_url,thumbnail_url,permalink,timestamp,media_type&access_token=${TOKEN}`,
            { cache: "no-store" }
        );

        const data = await res.json();

        const posts = data.data?.slice(0, 4).map((post: any) => ({
            id: post.id,
            caption: post.caption || "",
            mediaUrl:
                post.media_type === "VIDEO"
                    ? post.thumbnail_url
                    : post.media_url,
            permalink: post.permalink,
        }));

        return NextResponse.json({ posts });
    } catch (err) {
        return NextResponse.json({ posts: [] });
    }
}