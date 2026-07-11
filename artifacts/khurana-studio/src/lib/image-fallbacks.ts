/**
 * Curated Unsplash fallback URLs for every image category used in Khurana Studio.
 * These are used whenever DB imageUrl fields are empty / undefined / broken.
 * All URLs are stable Unsplash photo IDs.
 */

export const serviceFallbacks: Record<string, string> = {
  wedding:
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
  portrait:
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80",
  fashion:
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
  commercial:
    "https://images.unsplash.com/photo-1542038374946-4b8a3b42e43e?w=800&q=80",
  product:
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
  aerial:
    "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&q=80",
  drone:
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
  events:
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
  event:
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
  corporate:
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
  landscape:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  travel:
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
  boudoir:
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
  maternity:
    "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=800&q=80",
  newborn:
    "https://images.unsplash.com/photo-1544126592-807ade215a0b?w=800&q=80",
  family:
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
};

export const portfolioFallbacks: string[] = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80",
  "https://images.unsplash.com/photo-1542038374946-4b8a3b42e43e?w=800&q=80",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
  "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80",
  "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=800&q=80",
  "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80",
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
];

export const blogFallbacks: string[] = [
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80",
  "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80",
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
  "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=800&q=80",
];

export const instagramFallbacks: string[] = [
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=80",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80",
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
];

export const avatarFallbacks: string[] = [
  "https://images.unsplash.com/photo-1494790108755-2616b4e39e5b?w=200&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&q=80",
];

/**
 * Returns the first valid image URL: DB value first, then category fallback, then index fallback.
 */
export function getServiceImage(imageUrl?: string | null, category?: string | null): string {
  if (imageUrl) return imageUrl;
  const key = (category || "").toLowerCase().split(" ")[0];
  return serviceFallbacks[key] || serviceFallbacks.commercial;
}

export function getPortfolioImage(imageUrl?: string | null, index = 0): string {
  if (imageUrl) return imageUrl;
  return portfolioFallbacks[index % portfolioFallbacks.length];
}

export function getBlogImage(imageUrl?: string | null, index = 0): string {
  if (imageUrl) return imageUrl;
  return blogFallbacks[index % blogFallbacks.length];
}

export function getAvatarImage(photoUrl?: string | null, index = 0): string {
  if (photoUrl) return photoUrl;
  return avatarFallbacks[index % avatarFallbacks.length];
}
