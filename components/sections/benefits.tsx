"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Award, Heart, TrendingUp } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

function AnimatedCounter({ end, duration = 2, locale }: { end: number; duration?: number; locale: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return <span ref={ref}>{count.toLocaleString(locale === "de" ? "de-CH" : locale === "tr" ? "tr-TR" : "en-US")}</span>;
}

export function Benefits() {
  const t = useTranslations("benefits");
  const tQuote = useTranslations("quote");
  const locale = useLocale();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const benefits = [
    {
      icon: Award,
      title: t("card1Title"),
      description: t("card1Desc"),
    },
    {
      icon: Heart,
      title: t("card2Title"),
      description: t("card2Desc"),
    },
    {
      icon: TrendingUp,
      title: t("card4Title"),
      description: t("card4Desc"),
    },
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-8"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            {t("title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        {/* Mission Quote (absorbed from Quote section) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl mx-auto mb-8"
        >
          <div>
            <div className="bg-card border-2 border-primary/20 rounded-lg p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold mb-3">{tQuote("title")}</h3>
              <blockquote className="text-base md:text-lg text-muted-foreground italic leading-relaxed">
                &bdquo;{tQuote("text")}&ldquo;
              </blockquote>
            </div>
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="py-8">
              <div className="text-center space-y-2">
                <p className="text-primary-foreground/70 text-sm uppercase tracking-wider">
                  {t("moreThan")}
                </p>
                <p className="text-5xl md:text-6xl font-bold">
                  <AnimatedCounter end={200} locale={locale} />+
                </p>
                <p className="text-lg md:text-xl">{t("patientsCount")}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
