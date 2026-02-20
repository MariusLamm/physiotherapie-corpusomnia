"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import {
  Clock,
  Award,
  MapPin,
  Mail,
  Users,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { useTranslations } from "next-intl";

const navIcons: Record<string, React.ElementType> = {
  "#offnungszeiten": Clock,
  "#expertise": Award,
  "#standort": MapPin,
  "#kontakt": Mail,
  "#team": Users,
};

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  navItems: { label: string; href: string }[];
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export function MobileNav({
  open,
  onOpenChange,
  navItems,
  onNavClick,
}: MobileNavProps) {
  const t = useTranslations("nav");

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[85vw] max-w-[400px] p-0 flex flex-col"
      >
        {/* Header with logo and brand */}
        <SheetHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image
                src="/logo.png"
                alt="PCO Logo"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <SheetTitle className="text-base font-bold leading-tight">
                Physiotherapie
                <br />
                Corpus Omnia
              </SheetTitle>
            </div>
          </div>
        </SheetHeader>

        {/* Navigation links */}
        <nav className="flex-1 overflow-y-auto px-3 py-6">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = navIcons[item.href] || ChevronRight;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => onNavClick(e, item.href)}
                  className="flex items-center gap-4 rounded-lg px-4 py-4 text-lg font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground active:bg-accent/80"
                >
                  <Icon className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{item.label}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/50 ml-auto" />
                </a>
              );
            })}
          </div>

          {/* Book Online CTA */}
          <div className="mt-8 px-2">
            <Button asChild size="lg" className="w-full text-base">
              <a
                href="https://web.cenplexbooking.ch/appointment-selection?customerId=258&locationId=426"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Calendar className="mr-2 h-5 w-5" />
                {t("bookOnline")}
              </a>
            </Button>
          </div>
        </nav>

        {/* Footer with language and theme controls */}
        <div className="border-t px-6 py-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {t("practice")}
            </span>
            <div className="flex items-center gap-1">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
