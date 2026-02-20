"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Menu } from "lucide-react";
import { MobileNav } from "./mobile-nav";
import { useTranslations } from "next-intl";

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { label: t("openingHours"), href: "#offnungszeiten" },
    { label: t("expertise"), href: "#expertise" },
    { label: t("location"), href: "#standort" },
    { label: t("contact"), href: "#kontakt" },
    { label: t("team"), href: "#team" },
  ];

  // Check if we're on the main page (path is just /<locale> or /<locale>/)
  const isMainPage = /^\/[a-z]{2}\/?$/.test(pathname);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    if (!isMainPage) {
      // Navigate to home page with hash
      const locale = pathname.split("/")[1];
      window.location.href = `/${locale}/${href}`;
      return;
    }

    scrollToSection(href);
  };

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    if (!isMainPage) {
      const locale = pathname.split("/")[1];
      window.location.href = `/${locale}/${href}`;
      return;
    }

    // Close the drawer first, then scroll after it has animated out
    setMobileMenuOpen(false);
    setTimeout(() => {
      scrollToSection(href);
    }, 350);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isMainPage) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // On subpages, let the default Link behavior navigate to "/"
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
            : "bg-background"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-3"
              onClick={handleLogoClick}
            >
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="PCO Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-lg md:text-xl font-bold hidden sm:inline">
                Physiotherapie Corpus Omnia
              </span>
              <span className="text-lg font-bold sm:hidden">PCO</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-2">
              <Button asChild variant="default" className="hidden md:inline-flex">
                <a
                  href="https://web.cenplexbooking.ch/appointment-selection?customerId=258&locationId=426"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("bookOnline")}
                </a>
              </Button>
              {/* Language and theme toggles: hidden on mobile, shown in drawer instead */}
              <div className="hidden md:flex items-center space-x-1">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <MobileNav
        open={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
        navItems={navItems}
        onNavClick={handleMobileNavClick}
      />
    </>
  );
}
