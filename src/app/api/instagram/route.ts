import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = await fetch(
            "https://www.instagram.com/beyondimagination.club/",
            {
                headers: {
                    "User-Agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
                },
                cache: "no-store",
            }
        );

        const html = await res.text();

        const jsonMatch = html.match(/window\._sharedData = (.*);<\/script>/);

        if (!jsonMatch) {
            return NextResponse.json({ posts: [] });
        }

        const json = JSON.parse(jsonMatch[1]);

        const edges =
            json.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.edges.slice(
                0,
                2
            );

        const posts = edges.map((edge: any) => ({
            id: edge.node.id,
            caption:
                edge.node.edge_media_to_caption.edges[0]?.node.text || "",
            mediaUrl: edge.node.display_url,
            permalink: `https://www.instagram.com/p/${edge.node.shortcode}/`,
            timestamp: edge.node.taken_at_timestamp,
        }));

        return NextResponse.json({ posts });
    } catch (err) {
        return NextResponse.json({ posts: [] });
    }
}