import { Link } from "wouter";
import { useListCategories } from "@workspace/api-client-react";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Header() {
  const { data: categories } = useListCategories();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-8">
        <Link href="/" className="mr-8 flex items-center space-x-2" onClick={() => setMenuOpen(false)}>
          <span className="font-display text-2xl font-bold tracking-widest text-primary">LAI</span>
          <span className="hidden font-serif text-sm italic text-muted-foreground sm:inline-block border-l border-border pl-2 ml-2">
            Laboratory of Alternative History
          </span>
        </Link>

        <nav className="flex-1 hidden md:flex items-center space-x-6 text-sm font-medium text-muted-foreground">
          <Link href="/about" className="hover:text-primary transition-colors">
            About the Archive
          </Link>
          <Link href="/archive" className="hover:text-primary transition-colors">
            All Dispatches
          </Link>
          {categories?.slice(0, 4).map((c) => (
            <Link key={c.id} href={`/category/${c.slug}`} className="hover:text-primary transition-colors capitalize">
              {c.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end space-x-4 flex-1 md:flex-none">
          <Button asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" aria-label="Search">
            <Link href="/search">
              <Search className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-muted-foreground hover:text-primary"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-border/40 bg-background/95 px-4 py-4 shadow-2xl backdrop-blur-md">
          <div className="container mx-auto flex flex-col gap-1">
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="border-b border-border/40 px-2 py-3 font-display text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
            >
              About the Archive
            </Link>
            <Link
              href="/archive"
              onClick={() => setMenuOpen(false)}
              className="border-b border-border/40 px-2 py-3 font-display text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
            >
              All Dispatches
            </Link>
            {categories?.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                onClick={() => setMenuOpen(false)}
                className="border-b border-border/40 px-2 py-3 font-serif text-sm capitalize text-muted-foreground transition-colors hover:text-primary"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
