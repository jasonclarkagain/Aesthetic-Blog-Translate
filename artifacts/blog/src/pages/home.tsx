import { useGetFeaturedPosts, useListPosts, useListCategories, useGetBlogStats } from "@workspace/api-client-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Calendar, Clock, ChevronRight, BookOpen } from "lucide-react";
import { PostCard } from "@/components/post-card";
import { LoadingSpinner, ErrorState } from "@/components/loading-state";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: featuredPosts, isLoading: loadingFeatured } = useGetFeaturedPosts();
  const { data: posts, isLoading: loadingPosts } = useListPosts();
  const { data: categories } = useListCategories();
  const { data: stats } = useGetBlogStats();

  if (loadingFeatured || loadingPosts) return <LoadingSpinner />;
  if (!featuredPosts || !posts) return <ErrorState />;

  const heroPost = featuredPosts[0];
  const recentPosts = posts.slice(0, 6);

  return (
    <div className="pb-24">
      {/* Hero Section */}
      {heroPost && (
        <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden border-b border-border/50">
          <div className="absolute inset-0 bg-background z-0">
            {heroPost.coverImage && (
              <img
                src={heroPost.coverImage}
                alt={heroPost.title}
                className="w-full h-full object-cover opacity-30 mix-blend-overlay"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/50" />
          </div>

          <div className="container relative z-10 px-4 md:px-8 py-20 mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="inline-flex items-center rounded-sm border border-primary/50 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-widest">
                  Featured Research
                </span>
                <span className="inline-flex items-center rounded-sm border border-border bg-card/50 px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                  {heroPost.category}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6 text-foreground">
                <Link href={`/posts/${heroPost.id}`} className="hover:text-primary transition-colors">
                  {heroPost.title}
                </Link>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground font-serif italic mb-8 leading-relaxed max-w-2xl">
                {heroPost.excerpt}
              </p>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground font-serif mb-10">
                <time dateTime={heroPost.publishedAt} className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary/70" />
                  {format(new Date(heroPost.publishedAt), "MMMM d, yyyy")}
                </time>
                {heroPost.readingTimeMinutes && (
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary/70" />
                    {heroPost.readingTimeMinutes} min read
                  </span>
                )}
              </div>

              <Button asChild size="lg" className="rounded-none font-display tracking-widest uppercase bg-primary text-primary-foreground hover:bg-primary/90 border border-primary-foreground/20">
                <Link href={`/posts/${heroPost.id}`}>
                  Read Dispatch <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      )}

      {/* Main Content Area */}
      <div className="container mx-auto px-4 md:px-8 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Posts Grid */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-8">
              <h2 className="text-2xl font-display tracking-widest text-foreground uppercase">Recent Acquisitions</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {recentPosts.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} />
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Button variant="outline" className="font-display tracking-widest uppercase rounded-none border-primary/30 text-primary hover:bg-primary/10">
                View All Archives
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 xl:col-span-3 space-y-12">
            
            {/* About LAI Widget */}
            <div className="bg-card border border-card-border p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />
              <h3 className="font-display text-xl mb-4 text-primary border-b border-border/50 pb-2">About LAI</h3>
              <p className="text-sm font-serif text-muted-foreground leading-relaxed italic mb-6">
                The Laboratory of Alternative History conducts independent interdisciplinary research on ancient megalithic structures and anomalous artifacts worldwide, challenging established chronologies.
              </p>
              <Link href="/about" className="text-sm font-display tracking-wider text-primary flex items-center hover:text-primary/80 transition-colors uppercase">
                Learn More <ChevronRight className="h-3 w-3 ml-1" />
              </Link>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <h3 className="font-display text-xl mb-4 text-foreground border-b border-border/50 pb-2 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary/70" />
                Classifications
              </h3>
              <ul className="space-y-3">
                {categories?.map((cat) => (
                  <li key={cat.id}>
                    <Link 
                      href={`/category/${cat.slug}`}
                      className="group flex items-center justify-between text-sm py-1"
                    >
                      <span className="font-serif text-muted-foreground group-hover:text-primary transition-colors capitalize">
                        {cat.name}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground/50 border border-border/50 bg-card px-2 py-0.5 rounded-sm group-hover:border-primary/30 transition-colors">
                        {cat.postCount}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats */}
            {stats && (
              <div className="space-y-4 pt-8 border-t border-border/50">
                <h3 className="font-display text-sm mb-4 text-muted-foreground tracking-widest uppercase">Archive Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card/50 border border-border/30 p-4 text-center">
                    <div className="font-display text-3xl text-primary mb-1">{stats.totalPosts}</div>
                    <div className="text-xs font-serif italic text-muted-foreground">Documents</div>
                  </div>
                  <div className="bg-card/50 border border-border/30 p-4 text-center">
                    <div className="font-display text-3xl text-primary mb-1">{stats.totalCategories}</div>
                    <div className="text-xs font-serif italic text-muted-foreground">Classifications</div>
                  </div>
                </div>
              </div>
            )}
            
          </aside>
        </div>
      </div>
    </div>
  );
}
