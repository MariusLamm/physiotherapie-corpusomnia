"use client";

import * as React from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

const languages = [
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
];

interface LanguageSwitcherProps {
  onBeforeSwitch?: () => Promise<void> | void;
}

export function LanguageSwitcher({ onBeforeSwitch }: LanguageSwitcherProps = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [open, setOpen] = React.useState(false);
  
  const currentLocale = (params?.locale as string) || "de";
  const currentLanguage = languages.find((lang) => lang.code === currentLocale) || languages[0];

  const switchLanguage = async (locale: string) => {
    // Close the DropdownMenu first so Radix can clean up its
    // body styles (pointer-events, scroll-lock) before navigation
    setOpen(false);

    // If a callback is provided (e.g. to close the mobile Sheet), run it
    if (onBeforeSwitch) {
      await onBeforeSwitch();
    }

    // Wait for Radix cleanup effects to complete
    await new Promise((resolve) => setTimeout(resolve, 150));

    // Remove the current locale from the pathname
    const pathnameWithoutLocale = pathname?.replace(`/${currentLocale}`, "") || "";
    
    // Always use /${locale} prefix (localePrefix: "always")
    const newPath = `/${locale}${pathnameWithoutLocale || ""}`;
    
    router.push(newPath);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Change language">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => switchLanguage(language.code)}
            className={currentLocale === language.code ? "bg-accent" : ""}
          >
            <span className="mr-2">{language.flag}</span>
            <span>{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
