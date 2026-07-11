import { useEffect, useState } from "react";
import { FadeIn } from "@/components/fade-in";
import { ImageWithFallback } from "@/components/image-with-fallback";
import { Instagram } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getPosts, type InstagramPost } from "@/services/instagram";

export const InstagramSection = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getPosts(6).then((data) => {
      if (!cancelled) {
        setPosts(data);
        setLoading(false);
      }
    }).catch(() => {
      if (!cancelled) setLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="py-0 bg-background border-t border-border overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {/* CTA panel */}
        <div className="col-span-2 md:col-span-3 lg:col-span-2 bg-studio-dark text-white p-10 md:p-12 flex flex-col justify-center items-center text-center">
          <FadeIn>
            <Instagram size={32} className="mb-6 mx-auto text-studio-silver" />
            <h2 className="font-serif text-3xl mb-3">Follow Our Journey</h2>
            <a
              href="https://www.instagram.com/khuranas.studio/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm tracking-widest text-white/60 hover:text-white transition-colors"
            >
              @khuranas.studio
            </a>
          </FadeIn>
        </div>

        {/* 4 Instagram post tiles */}
        {loading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="aspect-square">
                <Skeleton className="w-full h-full rounded-none" />
              </div>
            ))
          : posts.slice(0, 4).map((post, idx) => (
              <a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square relative group overflow-hidden block"
                aria-label={`Instagram post ${idx + 1}`}
              >
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center pointer-events-none">
                  <Instagram
                    size={24}
                    className="text-white scale-75 group-hover:scale-100 transition-transform duration-300 delay-100"
                  />
                </div>
                <ImageWithFallback
                  src={post.thumbnail}
                  alt={post.caption || `Instagram post ${idx + 1}`}
                  objectFit="cover"
                  loading="lazy"
                  className="w-full h-full transform scale-100 group-hover:scale-105 transition-transform duration-700"
                />
              </a>
            ))}
      </div>
    </section>
  );
};
