import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CustomCursor } from "@/components/custom-cursor";
import { useLenis } from "@/hooks/use-lenis";
import { FadeIn } from "@/components/fade-in";
import { ImageWithFallback } from "@/components/image-with-fallback";
import { useListBlogPosts, getListBlogPostsQueryKey } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { format } from "date-fns";
import { RefreshCw } from "lucide-react";
import { getBlogImage } from "@/lib/image-fallbacks";

export const BlogPage = () => {
  useLenis();
  const {
    data: posts,
    isLoading,
    isError,
    refetch,
  } = useListBlogPosts({}, { query: { queryKey: getListBlogPostsQueryKey() } });

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="min-h-[100dvh] bg-background pt-32 pb-24">
        <div className="container mx-auto px-6 md:px-12">
          <FadeIn className="text-center mb-20">
            <h1 className="font-serif text-5xl md:text-7xl mb-6 text-foreground">The Journal</h1>
            <p className="font-sans text-muted-foreground max-w-2xl mx-auto font-light">
              Stories from behind the scenes, photography insights, and featured editorial sessions.
            </p>
          </FadeIn>

          {isError ? (
            <div className="text-center py-24 flex flex-col items-center gap-6">
              <p className="font-sans text-muted-foreground">Failed to load articles. Please try again.</p>
              <button
                onClick={() => refetch()}
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-sm uppercase tracking-widest hover:bg-foreground hover:text-background transition-all duration-300"
              >
                <RefreshCw size={14} /> Retry
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {isLoading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-4">
                      <Skeleton className="w-full aspect-[4/3] rounded-none" />
                      <Skeleton className="w-20 h-4 mt-2" />
                      <Skeleton className="w-full h-8" />
                      <Skeleton className="w-full h-16" />
                    </div>
                  ))
                : posts?.map((post, idx) => (
                    <FadeIn key={post.id} delay={idx * 0.1}>
                      <Link href={`/blog/${post.slug}`} className="group block">
                        <div className="overflow-hidden aspect-[4/3] mb-6 relative">
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                          <ImageWithFallback
                            src={getBlogImage(post.imageUrl, idx)}
                            fallbackSrc={getBlogImage(undefined, idx)}
                            alt={post.title}
                            objectFit="cover"
                            loading="lazy"
                            className="w-full h-full transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                        </div>

                        <div className="flex items-center gap-4 text-xs font-sans uppercase tracking-widest text-muted-foreground mb-3">
                          <span className="text-studio-silver font-medium">{post.category}</span>
                          <span>•</span>
                          <span>{format(new Date(post.publishedAt), "MMM d, yyyy")}</span>
                        </div>

                        <h2 className="font-serif text-2xl text-foreground mb-3 group-hover:text-studio-silver transition-colors">
                          {post.title}
                        </h2>

                        <p className="font-sans text-sm text-muted-foreground font-light line-clamp-3">
                          {post.excerpt}
                        </p>
                      </Link>
                    </FadeIn>
                  ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BlogPage;
