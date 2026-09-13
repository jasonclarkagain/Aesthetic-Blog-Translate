import { useParams } from "wouter";
import { useListPosts, useListCategories, getListPostsQueryKey } from "@workspace/api-client-react";
import { PostCard } from "@/components/post-card";
import { LoadingSpinner, ErrorState } from "@/components/loading-state";
import { motion } from "framer-motion";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug;

  const { data: categories } = useListCategories();
  const category = categories?.find(c => c.slug === slug);

  const { data: posts, isLoading } = useListPosts(
    { category: slug },
    { query: { enabled: !!slug, queryKey: getListPostsQueryKey({ category: slug }) } }
  );

  if (isLoading) return <LoadingSpinner />;
  if (!posts) return <ErrorState message="Failed to retrieve classified documents." />;

  return (
    <div className="container mx-auto px-4 md:px-8 py-16 min-h-screen">
      <header className="mb-16 border-b border-border pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-display text-sm tracking-widest text-primary uppercase mb-4 block">
            Classification
          </span>
          <h1 className="text-4xl md:text-5xl font-display text-foreground capitalize mb-6">
            {category ? category.name : slug}
          </h1>
          {category?.description && (
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground font-serif italic">
              {category.description}
            </p>
          )}
          <div className="mt-8 font-mono text-xs text-muted-foreground/60 tracking-wider">
            {posts.length} {posts.length === 1 ? 'DOCUMENT' : 'DOCUMENTS'} LOCATED
          </div>
        </motion.div>
      </header>

      {posts.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border/50 bg-card/20">
          <p className="font-serif italic text-muted-foreground">
            No documents found under this classification.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
