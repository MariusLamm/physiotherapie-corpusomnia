"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Quote as QuoteIcon } from "lucide-react";

export function Quote() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-16 h-16 text-primary/20">
              <QuoteIcon className="w-full h-full" />
            </div>
            <div className="relative bg-card border-2 border-primary/20 rounded-lg p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Was uns antreibt</h2>
              <blockquote className="text-lg md:text-xl text-muted-foreground italic leading-relaxed">
                „Unser Ziel ist es evidenzbasierte Erkenntnisse aus Wissenschaft und Forschung in
                die Therapie einzubinden. Dabei ist für uns wichtig eine effektive und
                patientenspezifische Therapie anzubieten, bei der die Patienten im Fokus stehen."
              </blockquote>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
