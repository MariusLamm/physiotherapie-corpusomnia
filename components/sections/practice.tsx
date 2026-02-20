"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function Practice() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const images = [
    { id: 1, src: "/practice/practice-1.jpg", alt: "Praxis Behandlungsraum" },
    { id: 2, src: "/practice/practice-2.jpg", alt: "Praxis Einrichtung" },
    { id: 3, src: "/practice/practice-3.jpg", alt: "Praxis Räumlichkeiten" },
  ];

  return (
    <section id="praxis" className="py-16 md:py-24 bg-muted/50 scroll-mt-20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Unsere Praxis</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Wir freuen uns auf Ihren Besuch bei uns
            </p>
          </div>

          {/* Image Gallery */}
          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden group cursor-pointer">
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Welcome Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <Card>
              <CardContent className="p-6 md:p-8">
                <h3 className="text-2xl font-bold mb-4 text-center">Herzlich willkommen</h3>
                <p className="text-muted-foreground leading-relaxed text-center">
                  Vom Haupteingang (bei der Bushaltestelle) oder Lift West gehen Sie bitte durch
                  das Atrium bis zum Lift Ost und folgen dann dem linken Gang bis zu unserer
                  Praxis. Vom Lift Ost kommend, biegen Sie rechts ab und gehen den hinteren Gang
                  entlang. Vom Hintereingang (gegenüber Dieci) halten Sie sich rechts – so finden
                  Sie bequem zu uns. Wir freuen uns auf Ihren Besuch!
                </p>
              </CardContent>
            </Card>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
