import { useEffect } from "react";
import { motion } from "framer-motion";
import { useListPosts } from "@workspace/api-client-react";
import { PostCard } from "@/components/post-card";
import { LoadingSpinner, ErrorState } from "@/components/loading-state";

export default function ArchivePage() {
  const { data: posts, isLoading } = useListPosts({ limit: 100 });

  useEffect(() => {
    document.title = "All Dispatches | LAI";
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (!posts) return <ErrorState message="Failed to retrieve the complete archive." />;

  return (
    <div className="container mx-auto min-h-screen px-4 py-16 md:px-8">
      <header className="mb-16 border-b border-border pb-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-4 block font-display text-sm uppercase tracking-widest text-primary">
            The Archive
          </span>
          <h1 className="mb-5 max-w-3xl text-4xl text-foreground md:text-6xl">
            All Dispatches
          </h1>
          <p className="max-w-2xl font-serif text-lg italic leading-relaxed text-muted-foreground">
            Translations, field notes, and research documents from the Laboratory of Alternative History.
          </p>
          <p className="mt-6 font-mono text-xs tracking-wider text-muted-foreground/60">
            {posts.length} {posts.length === 1 ? "DOCUMENT" : "DOCUMENTS"} IN CATALOG
          </p>
        </motion.div>
      </header>

      {posts.length === 0 ? (
        <div className="border border-dashed border-border/50 bg-card/20 py-20 text-center">
          <p className="font-serif italic text-muted-foreground">The archive is currently empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}