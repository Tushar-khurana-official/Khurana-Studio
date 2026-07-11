/**
 * Instagram Graph API service module.
 *
 * Currently returns curated mock data.
 * When VITE_INSTAGRAM_ACCESS_TOKEN is provided, the real Graph API is used
 * instead — no UI changes needed.
 *
 * Required env vars (add to .env / Replit secrets when ready):
 *   VITE_INSTAGRAM_APP_ID
 *   VITE_INSTAGRAM_APP_SECRET
 *   VITE_INSTAGRAM_ACCESS_TOKEN
 */

const BASE_URL = "https://graph.instagram.com";

const TOKEN = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN as string | undefined;

export interface InstagramPost {
  id: string;
  mediaUrl: string;
  thumbnail: string;
  permalink: string;
  caption?: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  timestamp: string;
}

export interface InstagramProfile {
  id: string;
  username: string;
  name: string;
  biography: string;
  profilePictureUrl: string;
  followersCount: number;
  mediaCount: number;
  website: string;
}

export interface InstagramReel {
  id: string;
  mediaUrl: string;
  thumbnail: string;
  permalink: string;
  caption?: string;
  timestamp: string;
}

// ─── Mock data ───────────────────────────────────────────────────────────────

const mockPosts: InstagramPost[] = [
  {
    id: "mock_1",
    mediaUrl: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=80",
    permalink: "https://www.instagram.com/khuranas.studio/",
    caption: "Love in every frame ✨ #WeddingPhotography #KhuranaStudio",
    mediaType: "IMAGE",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "mock_2",
    mediaUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80",
    permalink: "https://www.instagram.com/khuranas.studio/",
    caption: "The art of portraiture 📸 #PortraitPhotography",
    mediaType: "IMAGE",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "mock_3",
    mediaUrl: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80",
    permalink: "https://www.instagram.com/khuranas.studio/",
    caption: "Fashion editorial for @brand ✨ #FashionPhotography",
    mediaType: "IMAGE",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "mock_4",
    mediaUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
    permalink: "https://www.instagram.com/khuranas.studio/",
    caption: "A day to remember forever 🤍 #WeddingDay",
    mediaType: "IMAGE",
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "mock_5",
    mediaUrl: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
    permalink: "https://www.instagram.com/khuranas.studio/",
    caption: "Natural light magic ☀️ #PortraitSession",
    mediaType: "IMAGE",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "mock_6",
    mediaUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    permalink: "https://www.instagram.com/khuranas.studio/",
    caption: "Events that tell stories 🎊 #EventPhotography",
    mediaType: "IMAGE",
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const mockProfile: InstagramProfile = {
  id: "mock_profile",
  username: "khuranas.studio",
  name: "Khurana Studio",
  biography: "Luxury Photography Studio · Delhi, India\nWedding · Portrait · Fashion · Commercial",
  profilePictureUrl: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=200&q=80",
  followersCount: 12400,
  mediaCount: 248,
  website: "https://khuranastudio.com",
};

const mockReels: InstagramReel[] = [
  {
    id: "mock_reel_1",
    mediaUrl: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=80",
    permalink: "https://www.instagram.com/khuranas.studio/",
    caption: "Behind the scenes at our latest wedding shoot 🎬",
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// ─── API calls (used when access token is present) ────────────────────────────

async function fetchGraph<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set("access_token", TOKEN!);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Instagram API error: ${res.status}`);
  return res.json() as Promise<T>;
}

// ─── Public service methods ───────────────────────────────────────────────────

export async function getPosts(limit = 6): Promise<InstagramPost[]> {
  if (!TOKEN) return mockPosts.slice(0, limit);

  const data = await fetchGraph<{ data: Array<{
    id: string; media_url: string; thumbnail_url?: string;
    permalink: string; caption?: string;
    media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM"; timestamp: string;
  }> }>("/me/media", {
    fields: "id,media_url,thumbnail_url,permalink,caption,media_type,timestamp",
    limit: String(limit),
  });

  return data.data.map((p) => ({
    id: p.id,
    mediaUrl: p.media_url,
    thumbnail: p.thumbnail_url || p.media_url,
    permalink: p.permalink,
    caption: p.caption,
    mediaType: p.media_type,
    timestamp: p.timestamp,
  }));
}

export async function getProfile(): Promise<InstagramProfile> {
  if (!TOKEN) return mockProfile;

  const data = await fetchGraph<{
    id: string; username: string; name: string; biography: string;
    profile_picture_url: string; followers_count: number;
    media_count: number; website: string;
  }>("/me", {
    fields: "id,username,name,biography,profile_picture_url,followers_count,media_count,website",
  });

  return {
    id: data.id,
    username: data.username,
    name: data.name,
    biography: data.biography,
    profilePictureUrl: data.profile_picture_url,
    followersCount: data.followers_count,
    mediaCount: data.media_count,
    website: data.website,
  };
}

export async function getReels(limit = 6): Promise<InstagramReel[]> {
  if (!TOKEN) return mockReels.slice(0, limit);

  const data = await fetchGraph<{ data: Array<{
    id: string; media_url: string; thumbnail_url: string;
    permalink: string; caption?: string; timestamp: string;
  }> }>("/me/media", {
    fields: "id,media_url,thumbnail_url,permalink,caption,timestamp",
    media_type: "REELS",
    limit: String(limit),
  });

  return data.data.map((r) => ({
    id: r.id,
    mediaUrl: r.media_url,
    thumbnail: r.thumbnail_url,
    permalink: r.permalink,
    caption: r.caption,
    timestamp: r.timestamp,
  }));
}
