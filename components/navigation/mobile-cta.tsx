"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

export function MobileCTA() {
  const t = useTranslations("nav");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the hero section (~400px)
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 px-4 py-3 safe-bottom">
      <div className="flex gap-3">
        <Button asChild size="lg" className="flex-1 text-sm">
          <a
            href="https://web.cenplexbooking.ch/appointment-selection?customerId=258&locationId=426"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Calendar className="mr-2 h-4 w-4" />
            {t("bookOnline")}
          </a>
        </Button>
        <Button asChild variant="outline" size="lg" className="text-sm">
          <a href="tel:+41766817031">
            <Phone className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  );
}
