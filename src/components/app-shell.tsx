

"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Droplet,
  HeartPulse,
  Home,
  Settings,
  Siren,
  User,
  Shield,
  ShoppingCart,
  LogOut,
  LogIn,
  UserPlus,
  Info,
  Phone,
  Moon,
  Sun,
  Languages,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { useTheme } from "next-themes";
import { Footer } from "./footer";
import { useTranslation } from "@/hooks/use-translation";
import { Chatbot } from "./chatbot";
import { useIsMobile } from "@/hooks/use-mobile";

const mainNavItems = [
  { href: "/education", labelKey: "nav_education", icon: BookOpen, roles: ["guest", "user", "admin"] },
  { href: "/report/symptoms", labelKey: "nav_report_symptoms", icon: HeartPulse, roles: ["user"] },
  { href: "/report/water-source", labelKey: "nav_report_water", icon: Droplet, roles: ["user"] },
  { href: "/advisories", labelKey: "nav_advisories", icon: Siren, roles: ["guest", "user", "admin"] },
  { href: "/kit", labelKey: "nav_get_kit", icon: ShoppingCart, roles: ["guest", "user", "admin"] },
  { href: "/about", labelKey: "nav_about", icon: Info, roles: ["guest", "user"] },
  { href: "/contact", labelKey: "nav_contact", icon: Phone, roles: ["guest", "user"] },
  { href: "/admin", labelKey: "nav_admin", icon: Shield, roles: ["admin"]},
];

const mobileNavItems = [
  { href: "/", labelKey: "mobile_nav_home", icon: Home, roles: ["guest", "user", "admin"] },
  { href: "/report/symptoms", labelKey: "mobile_nav_report", icon: HeartPulse, roles: ["user", "admin"] },
  { href: "/advisories", labelKey: "mobile_nav_advisories", icon: Siren, roles: ["guest", "user", "admin"] },
  { href: "/education", labelKey: "mobile_nav_education", icon: BookOpen, roles: ["guest", "user", "admin"] },
  { href: "/settings", labelKey: "mobile_nav_you", icon: User, roles: ["user", "admin"] },
];

function MobileNavLink({
  href,
  label,
  icon: Icon,
  isActive,
}: {
  href: string;
  label:string;
  icon: React.ElementType;
  isActive: boolean;
}) {
  return (
      <Link
      href={href}
      className={cn(
        "flex flex-col items-center justify-center gap-1 p-2 rounded-md w-full",
        isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-primary/5"
      )}
    >
      <Icon className="h-6 w-6" />
      <span className="text-xs font-medium">{label}</span>
    </Link>
  )
}

function BottomNavBar() {
  const pathname = usePathname();
  const { role, loading } = useAuth();
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  
  if (loading || !isMobile) {
    return null;
  }
  
  const navItemsToShow = mobileNavItems.filter(item => item.roles.includes(role));

  const gridColsClass = () => {
    switch (navItemsToShow.length) {
      case 5:
        return 'grid-cols-5';
      case 4:
        return 'grid-cols-4';
      case 3:
        return 'grid-cols-3';
      case 2:
        return 'grid-cols-2';
      default:
        return 'grid-cols-1';
    }
  }

  return (
     <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background md:hidden">
        <nav className={cn("grid items-center justify-center gap-2 p-2", gridColsClass())}>
          {navItemsToShow.map((item) => {
              const isActive = (item.href === "/" && pathname === "/") || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <MobileNavLink
                  key={item.href}
                  href={item.href}
                  label={t(item.labelKey)}
                  icon={item.icon}
                  isActive={isActive}
                />
              )
          })}
        </nav>
      </div>
  )
}

function MainNav({ items, role }: { items: (typeof mainNavItems), role: 'admin' | 'user' | 'guest' }) {
  const pathname = usePathname();
  const { t } = useTranslation();
  const navItemsToShow = items.filter(item => item.roles.includes(role));

  return (
    <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
      {navItemsToShow.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary/80",
            pathname.startsWith(item.href) ? "text-primary" : "text-foreground/80"
          )}
        >
          {t(item.labelKey)}
        </Link>
      ))}
    </nav>
  );
}

function Logo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6 text-primary"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
      <path d="M12 4.13c-2.61 0-4.95 1.06-6.66 2.77.3.3.61.62.92.92C7.94 6.2 9.89 5.13 12 5.13s4.06 1.07 5.74 2.7.31-.31.62-.62C16.95 5.19 14.61 4.13 12 4.13zM12 19.87c2.61 0-4.95-1.06 6.66-2.77l-.92-.92c-1.68 1.62-3.63 2.7-5.74 2.7s-4.06-1.08-5.74-2.7l-.92.92c1.71 1.71 4.05 2.77 6.66 2.77z" opacity=".3" />
      <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
    </svg>
  );
}

function LanguageToggle() {
    const { setLanguage, t } = useTranslation();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Languages className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">{t('toggle_language')}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('hi')}>हिन्दी (Hindi)</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('bn')}>বাংলা (Bengali)</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function ThemeToggle() {
    const { setTheme } = useTheme();
    const { t } = useTranslation();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">{t('toggle_theme')}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    {t('theme_light')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    {t('theme_dark')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    {t('theme_system')}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, role, loading, logout } = useAuth();
  const { t } = useTranslation();
  
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center">
           <Link href="/" className="mr-4 flex items-center space-x-2">
            <Logo />
            <span className="hidden font-bold sm:inline-block text-foreground font-headline text-lg">Jal Jeevan</span>
          </Link>
          
          {!loading && <MainNav items={mainNavItems} role={role} />}

          <div className="flex flex-1 items-center justify-end space-x-2">
             {loading ? null : user ? (
              <div className="flex items-center gap-1">
                <LanguageToggle />
                <ThemeToggle />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full text-foreground/80 hover:text-foreground">
                       <User className="h-5 w-5" />
                       <span className="sr-only">{t('toggle_user_menu')}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {role === 'admin' && (
                       <DropdownMenuItem asChild>
                          <Link href="/admin"><Shield className="mr-2 h-4 w-4"/>{t('nav_admin')}</Link>
                       </DropdownMenuItem>
                    )}
                     <DropdownMenuItem asChild>
                          <Link href="/report/symptoms"><HeartPulse className="mr-2 h-4 w-4"/>{t('nav_report_symptoms')}</Link>
                       </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/report/water-source"><Droplet className="mr-2 h-4 w-4"/>{t('nav_report_water')}</Link>
                       </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings"><Settings className="mr-2 h-4 w-4"/>{t('nav_settings')}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                       <LogOut className="mr-2 h-4 w-4" />
                      <span>{t('logout')}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-1 sm:space-x-2">
                 <LanguageToggle />
                 <ThemeToggle />
                 <Button variant="ghost" asChild>
                   <Link href="/login"><LogIn className="md:mr-2"/> <span className="hidden md:inline">{t('login')}</span></Link>
                 </Button>
                 <Button asChild>
                   <Link href="/signup"><UserPlus className="md:mr-2"/> <span className="hidden md:inline">{t('signup')}</span></Link>
                 </Button>
              </div>
            )}
          </div>

        </div>
      </header>
       <main className="flex-1 pb-24 md:pb-8 bg-secondary/50">
         <div className="container py-8">
            {children}
         </div>
        </main>
        <Chatbot />
        <Footer />
      <BottomNavBar />
    </div>
  );
}
