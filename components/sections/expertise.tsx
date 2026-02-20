"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { services } from "@/lib/data/services";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function Expertise() {
  const t = useTranslations("expertise");
  const tServices = useTranslations("services");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="expertise" className="relative py-12 md:py-16 scroll-mt-20 overflow-hidden">
      {/* Background image with brand color tint */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/backgrounds/benefits-bg.jpg"
          alt=""
          fill
          className="object-cover w-full h-full opacity-[0.3] dark:opacity-[0.3]"
        />

      </div>

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              {t("title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t("description")}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-2">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <AccordionItem
                    value={service.id}
                    className="border rounded-lg px-4 bg-card hover:bg-accent/50 transition-colors"
                  >
                    <AccordionTrigger className="text-left hover:no-underline">
                      <span className="font-semibold">{tServices(`${service.id}.title`)}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground space-y-4">
                      <p className="leading-relaxed">{tServices(`${service.id}.description`)}</p>
                      {service.detailKeys && service.detailKeys.length > 0 && (
                        <ul className="space-y-2 pl-4">
                          {service.detailKeys.map((key, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-primary mt-1">&bull;</span>
                              <span>{tServices(key)}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
