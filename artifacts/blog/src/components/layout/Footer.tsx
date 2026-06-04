import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t border-border mt-24 py-12 bg-card/50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="font-display text-2xl font-bold tracking-widest text-primary">LAI</span>
            </Link>
            <p className="text-muted-foreground font-serif italic max-w-md">
              Dedicated to the translation and dissemination of research from Russia's premier alternative archaeology institute. Unveiling the forgotten epochs of human history.
            </p>
          </div>
          <div>
            <h3 className="font-display text-lg mb-4 text-foreground">Archive</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors">Latest Dispatches</Link></li>
              <li><Link href="/category/megaliths" className="hover:text-primary transition-colors">Megalithic Structures</Link></li>
              <li><Link href="/category/artifacts" className="hover:text-primary transition-colors">Anomalous Artifacts</Link></li>
              <li><Link href="/category/expeditions" className="hover:text-primary transition-colors">Field Expeditions</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-lg mb-4 text-foreground">Institute</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About LAI</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Research Methodology</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border/50 text-center text-xs text-muted-foreground/60">
          <p>&copy; {new Date().getFullYear()} Laboratory of Alternative History. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
