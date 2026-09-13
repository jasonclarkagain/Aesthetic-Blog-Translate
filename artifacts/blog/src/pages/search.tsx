import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useSearch } from "wouter";
import { Search as SearchIcon, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useListPosts } from "@workspace/api-client-react";
import { PostCard } from "@/components/post-card";
import { LoadingSpinner, ErrorState } from "@/components/loading-state";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchPage() {
  const [location, setLocation] = useLocation();
  const search = useSearch();
  const { data: posts, isLoading } = useListPosts({ limit: 100 });
  const query = new URLSearchParams(search).get("q") ?? "";
  const [input, setInput] = useState(query);

  useEffect(() => {
    setInput(query);
    document.title = query ? `Search: ${query} | LAI` : "Search the Archive | LAI";
  }, [query]);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!posts || !normalized) return [];

    return posts.filter((post) =>
      [post.title, post.excerpt, post.category, ...(post.tags ?? [])]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [posts, query]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = input.trim();
    setLocation(normalized ? `/search?q=${encodeURIComponent(normalized)}` : "/search");
  }

  if (isLoading) return <LoadingSpinner />;
  if (!posts) return <ErrorState message="The archive search is currently unavailable." />;

  return (
    <div className="container mx-auto min-h-screen px-4 py-16 md:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="mb-12 inline-flex items-center font-display text-sm uppercase tracking-widest text-primary/80 transition-colors hover:text-primary"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Return to Archives
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 border-b border-border pb-12"
        >
          <span className="mb-4 block font-display text-sm uppercase tracking-widest text-primary">
            Search the Archive
          </span>
          <h1 className="mb-8 text-4xl text-foreground md:text-6xl">Find a Dispatch</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="archive-search" className="sr-only">
              Search dispatches
            </label>
            <div className="relative flex-1">
              <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/70" />
              <Input
                id="archive-search"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Search titles, classifications, or tags..."
                className="h-12 rounded-none border-border bg-card pl-11 font-serif text-base text-foreground placeholder:text-muted-foreground/60"
              />
            </div>
            <Button type="submit" className="h-12 rounded-none px-8 font-display uppercase tracking-widest">
              Search
            </Button>
          </form>
        </motion.header>

        {!query ? (
          <p className="font-serif text-lg italic text-muted-foreground">
            Enter a term to search the translated research archive.
          </p>
        ) : results.length === 0 ? (
          <div className="border border-dashed border-border/50 bg-card/20 py-20 text-center">
            <p className="font-serif text-lg italic text-muted-foreground">
              No documents matched “{query}”.
            </p>
          </div>
        ) : (
          <>
            <p className="mb-8 font-mono text-xs tracking-wider text-muted-foreground/60">
              {results.length} {results.length === 1 ? "DOCUMENT" : "DOCUMENTS"} FOUND
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {results.map((post, index) => (
                <PostCard key={post.id} post={post} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}