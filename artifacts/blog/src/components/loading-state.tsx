import { motion } from "framer-motion";

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="relative w-24 h-24 border border-primary/20 rounded-full flex items-center justify-center"
      >
        <motion.div 
          animate={{ scale: [0.8, 1, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full border border-primary/40 m-2"
        />
        <span className="font-display text-primary tracking-widest text-sm">LAI</span>
      </motion.div>
      <p className="font-serif italic text-muted-foreground text-sm tracking-wide">
        Consulting the archives...
      </p>
    </div>
  );
}

export function ErrorState({ message = "The requested archive could not be accessed." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6 text-center px-4">
      <div className="w-16 h-16 border border-destructive/30 rounded-full flex items-center justify-center text-destructive font-display text-2xl">
        X
      </div>
      <div className="space-y-2 max-w-md">
        <h3 className="font-display text-xl text-foreground">Access Denied</h3>
        <p className="font-serif italic text-muted-foreground text-sm">
          {message}
        </p>
      </div>
    </div>
  );
}
