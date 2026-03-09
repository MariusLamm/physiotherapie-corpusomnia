"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";

const faqKeys = ["q1", "q2", "q3", "q4", "q5", "q6"] as const;

export function FAQ() {
  const t = useTranslations("faq");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="relative py-12 md:py-16 scroll-mt-20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <Badge variant="secondary" className="text-sm">
              {t("badge")}
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              {t("title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t("description")}
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-2">
              {faqKeys.map((key, index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <AccordionItem
                    value={key}
                    className="border rounded-lg px-4 bg-card hover:bg-accent/50 transition-colors"
                  >
                    <AccordionTrigger className="text-left hover:no-underline">
                      <span className="font-semibold">
                        {t(`${key}.question`)}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      <p className="leading-relaxed">{t(`${key}.answer`)}</p>
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
