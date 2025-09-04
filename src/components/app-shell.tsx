"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Droplet,
  HeartPulse,
  Home,
  PanelLeft,
  Settings,
  Siren,
  User,
  Globe,
  Sun,
  Moon,
  Rss,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { OnlineStatus } from "./online-status";

const navItems = [
  { href: "/", label: "Dashboard", icon: Home },
  {
    label: "Report",
    icon: HeartPulse,
    subItems: [
      { href: "/report/symptoms", label: "Symptoms", icon: HeartPulse },
      { href: "/report/water-source", label: "Water Source", icon: Droplet },
    ],
  },
  { href: "/advisories", label: "Advisories", icon: Siren },
  { href: "/education", label: "Education", icon: BookOpen },
  { href: "/settings", label: "Settings", icon: Settings },
];

function NavLink({
  href,
  label,
  icon: Icon,
  isActive,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
        isActive && "bg-accent text-primary"
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}

function NavSubMenu({
  label,
  icon: Icon,
  subItems,
  pathname,
}: {
  label: string;
  icon: React.ElementType;
  subItems: { href: string; label: string; icon: React.ElementType }[];
  pathname: string;
}) {
  const isSubActive = subItems.some((item) => pathname.startsWith(item.href));

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground",
          isSubActive && "text-primary"
        )}
      >
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </div>
      <div className="ml-4 grid grid-flow-row auto-rows-max text-sm">
        {subItems.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            isActive={pathname === item.href}
          />
        ))}
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const renderNavItems = () =>
    navItems.map((item) =>
      item.subItems ? (
        <NavSubMenu
          key={item.label}
          label={item.label}
          icon={item.icon}
          subItems={item.subItems}
          pathname={pathname}
        />
      ) : (
        <NavLink
          key={item.href}
          href={item.href!}
          label={item.label}
          icon={item.icon}
          isActive={pathname === item.href}
        />
      )
    );

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold font-headline"
            >
              <Droplet className="h-6 w-6 text-primary" />
              <span>Jal Rakshak</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {renderNavItems()}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <SheetHeader>
                <SheetTitle>
                  <Link
                    href="/"
                    className="flex items-center gap-2 font-semibold font-headline"
                  >
                    <Droplet className="h-6 w-6 text-primary" />
                    <span>Jal Rakshak</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <nav className="grid gap-2 text-lg font-medium">
                {renderNavItems()}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <OnlineStatus />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Globe className="mr-2 h-4 w-4" />
                  <span>Language</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>English</DropdownMenuItem>
                    <DropdownMenuItem>हिन्दी (Hindi)</DropdownMenuItem>
                    <DropdownMenuItem>বাংলা (Bengali)</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>
                <Link href="/settings" className="flex items-center w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
