"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, Phone, Mail, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";

export function OpeningHours() {
  const t = useTranslations("openingHours");
  const tAvail = useTranslations("availability");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="offnungszeiten" className="py-12 md:py-16 bg-muted/50 scroll-mt-20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="border-2 border-primary/20">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  {t("title")}
                </h2>
                <p className="text-muted-foreground">
                  {t("description")}
                </p>
                <div className="pt-2 border-t w-full">
                  <div className="grid gap-3 text-sm py-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                      <span className="font-medium">{t("appointment")}</span>
                      <span className="text-muted-foreground">{t("flexible")}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                      <span className="font-medium">{t("bookingOptions")}</span>
                      <span className="text-muted-foreground">{t("methods")}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button asChild size="lg">
                    <a
                      href="https://web.cenplexbooking.ch/appointment-selection?customerId=258&locationId=426"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {tAvail("bookNow")}
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <a href="tel:+41766817031">
                      <Phone className="mr-2 h-4 w-4" />
                      {tAvail("call")}
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <a href="mailto:info@physiotherapie-corpusomnia.ch">
                      <Mail className="mr-2 h-4 w-4" />
                      {tAvail("email")}
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
