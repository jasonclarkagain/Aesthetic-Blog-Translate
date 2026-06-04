import { Post } from "@workspace/api-client-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { format } from "date-fns";

export function PostCard({ post, index = 0 }: { post: Post; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group relative flex flex-col items-start justify-between bg-card rounded-md border border-card-border overflow-hidden hover:border-primary/50 transition-colors"
    >
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-muted/20">
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary">
            <span className="font-display text-4xl text-muted/30">LAI</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-background/80 backdrop-blur-sm px-2.5 py-0.5 text-xs font-semibold text-primary uppercase tracking-wider">
            {post.category}
          </span>
        </div>
      </div>
      
      <div className="flex flex-col p-6 w-full">
        <div className="flex items-center gap-x-4 text-xs text-muted-foreground mb-3 font-serif italic">
          <time dateTime={post.publishedAt} className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {format(new Date(post.publishedAt), "MMMM d, yyyy")}
          </time>
          {post.readingTimeMinutes && (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readingTimeMinutes} min read
            </span>
          )}
        </div>
        
        <h3 className="mt-2 text-xl font-display text-foreground group-hover:text-primary transition-colors line-clamp-2">
          <Link href={`/posts/${post.id}`}>
            <span className="absolute inset-0" />
            {post.title}
          </Link>
        </h3>
        
        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground font-serif">
          {post.excerpt}
        </p>
      </div>
    </motion.article>
  );
}
