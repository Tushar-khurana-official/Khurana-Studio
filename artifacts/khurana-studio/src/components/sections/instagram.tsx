import { useEffect, useState } from "react";
import { FadeIn } from "@/components/fade-in";
import { ImageWithFallback } from "@/components/image-with-fallback";
import { Instagram, ArrowUpRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getPosts, type InstagramPost } from "@/services/instagram";

export const InstagramSection = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getPosts(4).then((data) => {
      if (!cancelled) { setPosts(data); setLoading(false); }
    }).catch(() => {
      if (!cancelled) setLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="bg-background border-t border-border overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {/* CTA panel */}
        <div className="col-span-2 md:col-span-3 lg:col-span-2 bg-studio-dark text-white p-10 md:p-14 flex flex-col justify-center items-center text-center">
          <FadeIn>
            <div className="w-14 h-14 rounded-full border border-studio-silver/30 flex items-center justify-center mb-7 mx-auto">
              <Instagram size={24} className="text-studio-silver" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl mb-3 font-light">Follow Our Journey</h2>
            <p className="font-sans text-xs text-white/40 tracking-widest mb-7 uppercase">
              @khuranas.studio
            </p>
            <a
              href="https://www.instagram.com/khuranas.studio/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 border border-studio-silver/40 text-white text-xs uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all duration-300 group"
            >
              Follow Us
              <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
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
                aria-label={`View Instagram post ${idx + 1}`}
              >
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10 flex flex-col items-center justify-center gap-2 pointer-events-none">
                  <Instagram size={22} className="text-white scale-90 group-hover:scale-100 transition-transform duration-300 delay-75" />
                  <span className="font-sans text-[0.6rem] uppercase tracking-widest text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    View Post
                  </span>
                </div>
                <ImageWithFallback
                  src={post.thumbnail}
                  alt={post.caption || `Instagram post ${idx + 1}`}
                  objectFit="cover"
                  loading="lazy"
                  className="w-full h-full transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </a>
            ))}
      </div>
    </section>
  );
};
