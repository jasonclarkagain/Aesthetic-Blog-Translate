import { Link } from "wouter";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        <div className="relative mb-8 inline-block">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
          <h1 className="relative font-display text-8xl md:text-9xl font-bold text-foreground opacity-20">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="h-12 w-12 text-primary" />
          </div>
        </div>
        
        <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">
          Anomaly Detected
        </h2>
        
        <p className="font-serif italic text-muted-foreground mb-10 leading-relaxed text-lg">
          The manuscript you seek has been lost to the sands of time, or perhaps deliberately redacted from the archive.
        </p>
        
        <Link 
          href="/" 
          className="inline-flex items-center justify-center px-6 py-3 border border-primary/50 text-primary font-display tracking-widest text-sm uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          Return to the Archive
        </Link>
      </motion.div>
    </div>
  );
}
