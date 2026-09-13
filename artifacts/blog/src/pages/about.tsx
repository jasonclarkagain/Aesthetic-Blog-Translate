import { motion } from "framer-motion";
import { Compass, Microscope, Users, BookOpen } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero */}
      <header className="relative w-full min-h-[50vh] flex flex-col items-center justify-center overflow-hidden border-b border-border/50 pt-24 pb-16">
        <div className="absolute inset-0 bg-background z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        </div>
        
        <div className="container relative z-10 px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6"
          >
            Laboratory of Alternative History
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-primary font-serif italic max-w-2xl mx-auto"
          >
            Questioning the chronology. Unveiling the forgotten epochs.
          </motion.p>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-8 mt-24 max-w-4xl">
        <div className="prose prose-invert prose-lg max-w-none
            prose-headings:font-display prose-headings:font-normal prose-headings:text-foreground
            prose-p:font-serif prose-p:leading-relaxed prose-p:text-muted-foreground
            prose-strong:text-foreground">
          
          <h2 className="text-3xl text-center mb-8">Our Mission</h2>
          <p className="text-center text-xl mb-16">
            The Laboratory of Alternative History (LAI) is an independent, interdisciplinary research institute dedicated to the study of ancient civilizations, anomalous artifacts, and megalithic structures that defy conventional historical narratives.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-16 not-prose">
            <div className="bg-card border border-card-border p-8 rounded-sm hover:border-primary/30 transition-colors">
              <Compass className="h-8 w-8 text-primary mb-6" />
              <h3 className="font-display text-xl text-foreground mb-4">Field Expeditions</h3>
              <p className="font-serif text-muted-foreground text-sm leading-relaxed">
                We conduct on-site investigations of megalithic ruins across Egypt, Peru, Mesoamerica, and Lebanon, documenting precise measurements, tool marks, and construction anomalies overlooked by orthodox archaeology.
              </p>
            </div>
            
            <div className="bg-card border border-card-border p-8 rounded-sm hover:border-primary/30 transition-colors">
              <Microscope className="h-8 w-8 text-primary mb-6" />
              <h3 className="font-display text-xl text-foreground mb-4">Laboratory Analysis</h3>
              <p className="font-serif text-muted-foreground text-sm leading-relaxed">
                Utilizing modern material science, including electron microscopy and spectrographic analysis, we examine stone samples to determine the true nature of the technologies used to shape them.
              </p>
            </div>

            <div className="bg-card border border-card-border p-8 rounded-sm hover:border-primary/30 transition-colors">
              <BookOpen className="h-8 w-8 text-primary mb-6" />
              <h3 className="font-display text-xl text-foreground mb-4">Translation & Archive</h3>
              <p className="font-serif text-muted-foreground text-sm leading-relaxed">
                This English-language portal serves as the primary repository for disseminating LAI's extensive Russian-language research, ensuring global access to our findings.
              </p>
            </div>

            <div className="bg-card border border-card-border p-8 rounded-sm hover:border-primary/30 transition-colors">
              <Users className="h-8 w-8 text-primary mb-6" />
              <h3 className="font-display text-xl text-foreground mb-4">Interdisciplinary Seminars</h3>
              <p className="font-serif text-muted-foreground text-sm leading-relaxed">
                We bridge the gap between historians, geologists, engineers, and physicists, fostering rigorous debate free from the constraints of academic dogma.
              </p>
            </div>
          </div>

          <h2 id="methodology">The Problem with the Orthodoxy</h2>
          <p>
            Conventional history teaches that the magnificent pyramids of Giza, the precision-fitted walls of Sacsayhuamán, and the colossal monoliths of Baalbek were constructed by civilizations possessing nothing more than copper chisels, stone pounders, and hemp ropes. 
          </p>
          <p>
            Our physical evidence tells a different story. The presence of high-speed circular saw marks on diorite, core drills in granite, and multi-ton blocks lifted to impossible heights point unequivocally to a forgotten technological epoch. We seek the architects of this lost era.
          </p>

          <div id="join" className="mt-16 p-8 border border-primary/20 bg-primary/5 text-center">
            <h3 className="font-display text-2xl text-primary mb-4 m-0">Join the Investigation</h3>
            <p className="font-serif text-muted-foreground mb-0">
              Truth belongs to those who seek it. Explore the archives, analyze the data, and draw your own conclusions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
