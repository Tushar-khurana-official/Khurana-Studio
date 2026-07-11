import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CustomCursor } from "@/components/custom-cursor";
import { useLenis } from "@/hooks/use-lenis";
import { FadeIn } from "@/components/fade-in";
import { ImageWithFallback } from "@/components/image-with-fallback";
import { useGetBlogPost, getGetBlogPostQueryKey } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { format } from "date-fns";
import { ArrowLeft, Clock, RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getBlogImage } from "@/lib/image-fallbacks";

export const BlogPostPage = () => {
  useLenis();
  const { slug } = useParams<{ slug: string }>();

  const {
    data: post,
    isLoading,
    isError,
    refetch,
  } = useGetBlogPost(slug || "", {
    query: {
      queryKey: getGetBlogPostQueryKey(slug || ""),
      enabled: !!slug,
    },
  });

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-32 pb-24 bg-background">
          <div className="container mx-auto px-6 max-w-3xl">
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-4 w-1/4 mb-12" />
            <Skeleton className="w-full aspect-video mb-12" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </main>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-32 pb-24 bg-background flex items-center justify-center">
          <div className="text-center flex flex-col items-center gap-6">
            <p className="font-sans text-muted-foreground">Failed to load this article.</p>
            <button
              onClick={() => refetch()}
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-sm uppercase tracking-widest hover:bg-foreground hover:text-background transition-all duration-300"
            >
              <RefreshCw size={14} /> Retry
            </button>
          </div>
        </main>
      </>
    );
  }

  if (!post) return null;

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main className="min-h-screen bg-background pt-32 pb-24">
        <article className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors mb-12"
              >
                <ArrowLeft size={14} /> Back to Journal
              </Link>

              <div className="flex items-center gap-4 text-xs font-sans uppercase tracking-widest text-muted-foreground mb-6">
                <span className="text-studio-silver font-medium">{post.category}</span>
                <span>•</span>
                <span>{format(new Date(post.publishedAt), "MMMM d, yyyy")}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {post.readTime}
                </span>
              </div>

              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 leading-tight">
                {post.title}
              </h1>

              <div className="text-sm font-sans uppercase tracking-widest text-foreground mb-12">
                Words by{" "}
                <span className="font-medium">{post.author || "Khurana Studio"}</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="w-full aspect-[21/9] mb-16 overflow-hidden border border-border">
                <ImageWithFallback
                  src={getBlogImage(post.imageUrl, 0)}
                  fallbackSrc={getBlogImage(undefined, 0)}
                  alt={post.title}
                  objectFit="cover"
                  loading="eager"
                  className="w-full h-full"
                />
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div
                className="prose prose-lg dark:prose-invert max-w-none font-sans font-light text-muted-foreground
                  prose-headings:font-serif prose-headings:font-normal prose-headings:text-foreground
                  prose-a:text-studio-silver hover:prose-a:text-foreground prose-a:transition-colors
                  prose-blockquote:font-serif prose-blockquote:font-light prose-blockquote:text-2xl prose-blockquote:border-l-studio-silver prose-blockquote:text-foreground
                  prose-img:border prose-img:border-border"
                dangerouslySetInnerHTML={{
                  __html:
                    post.content ||
                    `<p>${post.excerpt}</p><p>Full article content would go here. The API returned a post without full content.</p>`,
                }}
              />
            </FadeIn>

            <FadeIn
              delay={0.4}
              className="mt-20 pt-10 border-t border-border flex justify-between items-center"
            >
              <div className="font-serif text-2xl">Share this story</div>
              <div className="flex gap-4">
                <button className="text-sm font-sans uppercase tracking-widest hover:text-studio-silver transition-colors">
                  Twitter
                </button>
                <button className="text-sm font-sans uppercase tracking-widest hover:text-studio-silver transition-colors">
                  Facebook
                </button>
                <button className="text-sm font-sans uppercase tracking-widest hover:text-studio-silver transition-colors">
                  Pinterest
                </button>
              </div>
            </FadeIn>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default BlogPostPage;
