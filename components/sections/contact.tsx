"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Mail, MessageSquare, Calendar, Clock } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export function Contact() {
  const t = useTranslations("contact");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
      website: formData.get("website") as string, // honeypot
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send");
      }

      toast.success(t("successTitle"), {
        description: t("successDesc"),
      });
      form.reset();
    } catch {
      toast.error(t("errorTitle"), {
        description: t("errorDesc"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="kontakt" className="py-12 md:py-16 bg-muted/50 scroll-mt-20">
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
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t("description")}
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-6">
            {/* Availability banner – full width */}
            <Card className="border-2 border-primary/20 bg-primary/5">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground max-w-2xl">
                    {t("availability")}
                  </p>
                  <Button asChild size="lg">
                    <a
                      href="https://web.cenplexbooking.ch/appointment-selection?customerId=258&locationId=426"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {t("bookOnline")}
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info + Form – side by side */}
            <div className="grid gap-6 lg:grid-cols-2 items-stretch">
              <Card>
                <CardHeader>
                  <CardTitle>{t("contactInfo")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">{t("phone")}</p>
                      <a
                        href="tel:+41766817031"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        +41 76 681 70 31
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">{t("whatsapp")}</p>
                      <a
                        href="https://wa.me/41766817031"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        +41 76 681 70 31
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <div>
                        <p className="font-medium mb-1">{t("email")}</p>
                        <a
                          href="mailto:info@physiotherapie-corpusomnia.ch"
                          className="text-muted-foreground hover:text-primary transition-colors break-all"
                        >
                          info@physiotherapie-corpusomnia.ch
                        </a>
                      </div>
                      <div>
                        <p className="font-medium mb-1">{t("forDoctors")}</p>
                        <a
                          href="mailto:physiotherapie-corpusomnia@physio-hin.ch"
                          className="text-muted-foreground hover:text-primary transition-colors break-all"
                        >
                          physiotherapie-corpusomnia@physio-hin.ch
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>{t("sendMessage")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Honeypot field: hidden from users, bots fill it and get rejected */}
                    <div className="overflow-hidden h-0 w-0 opacity-0" aria-hidden="true" tabIndex={-1}>
                      <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">{t("firstName")} *</Label>
                        <Input id="firstName" name="firstName" required placeholder="Max" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">{t("lastName")} *</Label>
                        <Input id="lastName" name="lastName" required placeholder="Mustermann" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">{t("phoneNumber")} *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="+41 XX XXX XX XX"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">{t("emailAddress")} *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="max.mustermann@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">{t("message")} *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        placeholder={t("yourMessage")}
                        rows={5}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? t("sending") : t("send")}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
