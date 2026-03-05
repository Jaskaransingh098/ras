import { NextResponse } from "next/server";

/**
 * Instagram Graph API Route
 *
 * Fetches the latest posts from the connected Instagram account.
 *
 * To set up:
 * 1. Go to https://developers.facebook.com/ and create an app
 * 2. Add "Instagram Graph API" product
 * 3. Connect your Instagram Business/Creator account
 * 4. Generate a User Token from the Graph API Explorer
 *    (permissions: instagram_basic, pages_show_list)
 * 5. Exchange short-lived token for a long-lived one:
 *    GET https://graph.facebook.com/v19.0/oauth/access_token?
 *      grant_type=fb_exchange_token&
 *      client_id={app-id}&
 *      client_secret={app-secret}&
 *      fb_exchange_token={short-lived-token}
 * 6. Then get the Instagram User ID:
 *    GET https://graph.facebook.com/v19.0/me/accounts?access_token={token}
 *    GET https://graph.facebook.com/v19.0/{page-id}?fields=instagram_business_account&access_token={token}
 * 7. Set these in your .env.local:
 *    INSTAGRAM_ACCESS_TOKEN=your_long_lived_token
 *    INSTAGRAM_USER_ID=your_instagram_user_id
 *
 * Long-lived tokens last 60 days. You can refresh them before they expire:
 *    GET https://graph.facebook.com/v19.0/oauth/access_token?
 *      grant_type=fb_exchange_token&
 *      client_id={app-id}&
 *      client_secret={app-secret}&
 *      fb_exchange_token={long-lived-token}
 */

interface InstagramPost {
    id: string;
    caption?: string;
    media_url: string;
    permalink: string;
    timestamp: string;
    media_type: string;
    thumbnail_url?: string;
}

export async function GET() {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const userId = process.env.INSTAGRAM_USER_ID;

    if (!accessToken || !userId) {
        // Return fallback data when API is not configured
        return NextResponse.json({
            configured: false,
            posts: [],
            message: "Instagram API not configured. Set INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_USER_ID in .env.local",
        });
    }

    try {
        const response = await fetch(
            `https://graph.facebook.com/v19.0/${userId}/media?fields=id,caption,media_url,permalink,timestamp,media_type,thumbnail_url&limit=2&access_token=${accessToken}`,
            { next: { revalidate: 3600 } } // Cache for 1 hour
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Instagram API error:", errorData);
            return NextResponse.json(
                { configured: true, posts: [], error: "Failed to fetch from Instagram API" },
                { status: 500 }
            );
        }

        const data = await response.json();
        const posts: InstagramPost[] = data.data || [];

        return NextResponse.json({
            configured: true,
            posts: posts.map((post) => ({
                id: post.id,
                caption: post.caption || "",
                mediaUrl: post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url,
                permalink: post.permalink,
                timestamp: post.timestamp,
                mediaType: post.media_type,
            })),
        });
    } catch (error) {
        console.error("Instagram fetch error:", error);
        return NextResponse.json(
            { configured: true, posts: [], error: "Network error fetching Instagram" },
            { status: 500 }
        );
    }
}
