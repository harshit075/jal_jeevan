
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
  LogIn,
  Shield,
  LogOut,
  UserPlus,
  PlusCircle,
  ShoppingCart
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
import { useAuth } from "@/hooks/use-auth";

const allNavItems = [
  { href: "/", label: "Home", icon: Home, roles: ["guest", "user", "admin"] },
  { href: "/report/symptoms", label: "Report Symptoms", icon: HeartPulse, roles: ["user", "admin"] },
  { href: "/report/water-source", label: "Report Water Source", icon: Droplet, roles: ["user", "admin"] },
  { href: "/advisories", label: "Advisories", icon: Siren, roles: ["guest", "user", "admin"] },
  { href: "/kit", label: "Get a Kit", icon: ShoppingCart, roles: ["guest", "user", "admin"] },
  { href: "/admin", label: "Admin", icon: Shield, roles: ["admin"]},
  { href: "/education", label: "Education", icon: BookOpen, roles: ["guest", "user", "admin"] },
  { href: "/settings", label: "Settings", icon: Settings, roles: ["user", "admin"] },
  { href: "/advisories/generate", label: "Generate Advisory", icon: PlusCircle, roles: ["admin"], hidden: true },
];

function NavLink({
  href,
  label,
  icon: Icon,
  isActive,
  isMobile = false,
}: {
  href: string;
  label:string;
  icon: React.ElementType;
  isActive: boolean;
  isMobile?: boolean;
}) {
  if (isMobile) {
    return (
       <Link
        href={href}
        className={cn(
          "flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-colors",
          isActive ? "text-primary" : "text-muted-foreground hover:text-primary/90"
        )}
      >
        <Icon className="h-6 w-6" />
        <span className="text-xs font-medium">{label}</span>
      </Link>
    )
  }

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
        isActive && "bg-accent text-primary"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
}

function BottomNavBar({ items }: { items: typeof allNavItems }) {
  const pathname = usePathname();
  return (
     <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-sm md:hidden">
        <nav className="grid grid-cols-5 items-center justify-center gap-1 p-1">
          {items.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              isActive={pathname === item.href}
              isMobile={true}
            />
          ))}
        </nav>
      </div>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, role, loading, logout } = useAuth();
  
  const currentRole = loading ? "guest" : role;

  const filteredNavItems = allNavItems.filter(item => item.roles.includes(currentRole) && !item.hidden);

  const renderNavItems = () =>
    filteredNavItems.map((item) => (
      <NavLink
        key={item.href}
        href={item.href}
        label={item.label}
        icon={item.icon}
        isActive={pathname === item.href}
        isMobile={false}
      />
    ));

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
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 sticky top-0 z-40">
          <div className="w-full flex-1">
             <Link
              href="/"
              className="flex items-center gap-2 font-semibold font-headline md:hidden"
            >
              <Droplet className="h-6 w-6 text-primary" />
              <span>Jal Rakshak</span>
            </Link>
             <div className="hidden md:block">
                <OnlineStatus />
             </div>
          </div>

          {loading ? null : user ? (
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
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
          {children}
        </main>
        {role !== 'admin' && <BottomNavBar items={filteredNavItems} />}
      </div>
    </div>
  );
}
