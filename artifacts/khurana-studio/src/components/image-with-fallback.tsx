import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

// Used when every fallback fails
const GENERIC_FALLBACK =
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  /** Applied to the <img> tag itself */
  className?: string;
  fallbackSrc?: string;
  objectFit?: "cover" | "contain" | "fill" | "none";
  loading?: "lazy" | "eager";
}

/**
 * Drop-in <img> replacement with:
 *  - Lazy loading
 *  - Fade-in once loaded
 *  - Error fallback (Unsplash if custom fallback also fails)
 *  - A grey placeholder shown via CSS background until the image loads
 *
 * The component renders only an <img> tag — it does NOT add any wrapper div.
 * Size the image by setting className or styling the parent, exactly as you
 * would a regular <img>.
 */
export const ImageWithFallback = ({
  src,
  alt,
  className,
  fallbackSrc,
  objectFit = "cover",
  loading = "lazy",
}: ImageWithFallbackProps) => {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const triedFallback = useRef(false);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (!triedFallback.current) {
      triedFallback.current = true;
      (e.target as HTMLImageElement).src = fallbackSrc || GENERIC_FALLBACK;
    } else {
      setErrored(true);
      setLoaded(true);
    }
  };

  const objectFitClass: Record<string, string> = {
    cover: "object-cover",
    contain: "object-contain",
    fill: "object-fill",
    none: "object-none",
  };

  return (
    <img
      src={errored ? GENERIC_FALLBACK : src}
      alt={alt}
      loading={loading}
      onLoad={() => setLoaded(true)}
      onError={handleError}
      className={cn(
        objectFitClass[objectFit],
        "transition-opacity duration-700 ease-out",
        // Grey background acts as skeleton while loading (no wrapper needed)
        !loaded && "bg-muted",
        loaded ? "opacity-100" : "opacity-0",
        className
      )}
    />
  );
};
