"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Navigation, Car } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const practiceImages = [
  { id: 1, src: "/practice/practice-1.jpg", alt: "practiceImage1" },
  { id: 2, src: "/practice/practice-2.jpg", alt: "practiceImage2" },
  { id: 3, src: "/practice/practice-3.jpg", alt: "practiceImage3" },
  { id: 4, src: "/practice/practice-4.jpg", alt: "practiceImage4" },
];

export function Location() {
  const t = useTranslations("location");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const googleMapsUrl = "https://www.google.com/maps?newwindow=1&sca_esv=1a505bbb43a4d0bc&output=search&q=physiotherapie+corpus+omnia&source=lnms&fbs=ADc_l-YGrpJMQtvjQ6h14rj-dfIrbPkd_Upq68wJVnEIgo2Pwwmd36hvjv0a5D-I2YXEp8GTjHcrRdHxR3qyrTk1NP8dAbvJunmc7zWoBbWPhoXqn-ysD-LbvZnySykVD5GG_CQCw0SzL5ZP1sNOr18NCzPWYdyJ9l_TV0dkPmMbOVhksKYVXc-WLn1lbWhryfuqScXW1KmSMuk1w55JcXNODPh0FpiQGw&entry=mc&ved=1t:200715&ictx=111";

  return (
    <section id="standort" className="py-12 md:py-16 scroll-mt-20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">{t("title")}</h2>
          </div>

          {/* Practice Photo Gallery */}
          <div className="grid gap-6 grid-cols-2 md:grid-cols-4 max-w-5xl mx-auto">
            {practiceImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden group">
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={image.src}
                      alt={t(image.alt)}
                      fill
                      className="object-cover transition-transform duration-300 md:group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-primary/10 opacity-0 md:group-hover:opacity-100 transition-opacity" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Address Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  {t("address")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <p className="font-semibold text-lg">{t("practiceName")}</p>
                  <p className="text-muted-foreground">{t("street")}</p>
                  <p className="text-muted-foreground">{t("city")}</p>
                </div>

                <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                  <Car className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium mb-1">{t("parking")}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("parkingDesc")}
                    </p>
                  </div>
                </div>

                <Button asChild className="w-full">
                  <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                    <Navigation className="mr-2 h-4 w-4" />
                    {t("planRoute")}
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Map */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video md:aspect-square lg:aspect-auto lg:h-full min-h-[250px] md:min-h-[400px] rounded-lg overflow-hidden grayscale">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2698.8576890748614!2d8.619517776893365!3d47.41889997116893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479007a3f8e8e8e9%3A0x8e8e8e8e8e8e8e8e!2sIndustriestrasse%2024%2C%208305%20Dietlikon!5e0!3m2!1sen!2sch!4v1234567890123!5m2!1sen!2sch"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Location Map"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Directions Info */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-3">{t("directions")}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("directionsText")}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
