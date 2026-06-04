import { useParams } from "wouter";
import { useGetPost, getGetPostQueryKey } from "@workspace/api-client-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Calendar, Clock, ChevronLeft, Tag } from "lucide-react";
import { LoadingSpinner, ErrorState } from "@/components/loading-state";

export default function PostPage() {
  const params = useParams();
  const id = parseInt(params.id || "0", 10);
  
  const { data: post, isLoading } = useGetPost(id, {
    query: {
      enabled: !!id,
      queryKey: getGetPostQueryKey(id)
    }
  });

  if (isLoading) return <LoadingSpinner />;
  if (!post) return <ErrorState message="The requested document could not be found in our archives." />;

  return (
    <article className="min-h-screen bg-background pb-24">
      {/* Article Header */}
      <header className="relative w-full min-h-[60vh] flex flex-col items-center justify-end overflow-hidden pb-16 pt-32">
        <div className="absolute inset-0 bg-background z-0">
          {post.coverImage && (
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover opacity-20 mix-blend-overlay"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent" />
        </div>

        <div className="container relative z-10 px-4 md:px-8 max-w-4xl mx-auto text-center">
          <Link href="/" className="inline-flex items-center text-sm font-display tracking-widest text-primary/80 hover:text-primary mb-12 uppercase">
            <ChevronLeft className="mr-2 h-4 w-4" /> Return to Archives
          </Link>
          
          <div className="mb-6 flex justify-center">
            <Link href={`/category/${post.category}`} className="inline-flex items-center rounded-sm border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary uppercase tracking-widest hover:bg-primary/10 transition-colors">
              {post.category}
            </Link>
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-8 text-foreground"
          >
            {post.title}
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground font-serif border-y border-border/40 py-4"
          >
            <time dateTime={post.publishedAt} className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary/60" />
              {format(new Date(post.publishedAt), "MMMM d, yyyy")}
            </time>
            {post.readingTimeMinutes && (
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary/60" />
                {post.readingTimeMinutes} min read
              </span>
            )}
          </motion.div>
        </div>
      </header>

      {/* Article Content */}
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="prose prose-invert prose-lg max-w-none
            prose-headings:font-display prose-headings:font-normal prose-headings:text-foreground
            prose-p:font-serif prose-p:leading-loose prose-p:text-muted-foreground
            prose-a:text-primary prose-a:underline-offset-4 hover:prose-a:text-primary/80
            prose-strong:text-foreground prose-strong:font-semibold
            prose-blockquote:border-l-primary prose-blockquote:bg-card/30 prose-blockquote:p-6 prose-blockquote:font-serif prose-blockquote:italic
            prose-hr:border-border"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Article Footer */}
        <div className="mt-16 pt-8 border-t border-border">
          {post.tags && post.tags.length > 0 && (
            <div className="flex items-center gap-3 mb-8">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-card border border-border text-xs font-serif text-muted-foreground rounded-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {post.sourceUrl && (
            <div className="bg-card/50 border border-border p-6 rounded-sm">
              <h4 className="font-display text-sm tracking-widest text-primary uppercase mb-2">Original Source</h4>
              <a href={post.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-serif text-muted-foreground hover:text-primary underline underline-offset-4 text-sm break-all">
                {post.sourceUrl}
              </a>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
