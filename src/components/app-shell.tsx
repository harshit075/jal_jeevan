

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
  Phone
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

const mainNavItems = [
  { href: "/advisories", label: "Advisories", icon: Siren, roles: ["guest", "user", "admin"] },
  { href: "/education", label: "Education", icon: BookOpen, roles: ["guest", "user", "admin"] },
  { href: "/kit", label: "Get a Kit", icon: ShoppingCart, roles: ["guest", "user", "admin"] },
  { href: "/about", label: "About Us", icon: Info, roles: ["guest", "user", "admin"] },
  { href: "/contact", label: "Contact", icon: Phone, roles: ["guest", "user", "admin"] },
  { href: "/report/symptoms", label: "Report", icon: HeartPulse, roles: ["user", "admin"] },
  { href: "/admin", label: "Admin", icon: Shield, roles: ["admin"]},
];

const mobileNavItems = [
  { href: "/", label: "Home", icon: Home, roles: ["guest", "user", "admin"] },
  { href: "/report/symptoms", label: "Report", icon: HeartPulse, roles: ["user"] },
  { href: "/advisories", label: "Advisories", icon: Siren, roles: ["guest", "user", "admin"] },
  { href: "/education", label: "Education", icon: BookOpen, roles: ["guest", "user", "admin"] },
  { href: "/settings", label: "You", icon: User, roles: ["user", "admin"] },
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
  const { role } = useAuth();
  
  const navItemsToShow = mobileNavItems.filter(item => item.roles.includes(role));

  return (
     <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background md:hidden">
        <nav className={cn("grid items-center justify-center gap-2 p-2", 
            role === "guest" ? "grid-cols-3" : "grid-cols-5"
          )}>
          {navItemsToShow.map((item) => {
              const isActive = (item.href === "/" && pathname === "/") || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <MobileNavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  isActive={isActive}
                />
              )
          })}
        </nav>
      </div>
  )
}

function MainNav({ items, role }: { items: typeof mainNavItems, role: 'admin' | 'user' | 'guest' }) {
  const pathname = usePathname();
  const navItemsToShow = items.filter(item => item.roles.includes(role));

  return (
    <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
      {navItemsToShow.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary/80",
            pathname.startsWith(item.href) ? "text-primary" : "text-foreground/80"
          )}
        >
          {item.label}
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
      <path d="M12 4.13c-2.61 0-4.95 1.06-6.66 2.77.3.3.61.62.92.92C7.94 6.2 9.89 5.13 12 5.13s4.06 1.07 5.74 2.7.31-.31.62-.62C16.95 5.19 14.61 4.13 12 4.13zM12 19.87c2.61 0 4.95-1.06 6.66-2.77l-.92-.92c-1.68 1.62-3.63 2.7-5.74 2.7s-4.06-1.08-5.74-2.7l-.92.92c1.71 1.71 4.05 2.77 6.66 2.77z" opacity=".3" />
      <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
    </svg>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, role, loading, logout } = useAuth();
  
  const currentRole = loading ? "guest" : role;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center">
           <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
            <span className="hidden font-bold sm:inline-block text-foreground font-headline text-lg">Jal Jeevan</span>
          </Link>

          <MainNav items={mainNavItems} role={currentRole} />

          <div className="flex flex-1 items-center justify-end space-x-4">
             {loading ? null : user ? (
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full text-foreground/80 hover:text-foreground">
                       <User className="h-5 w-5" />
                       <span className="sr-only">Toggle user menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {role === 'admin' && (
                       <DropdownMenuItem asChild>
                          <Link href="/admin"><Shield className="mr-2 h-4 w-4"/>Admin</Link>
                       </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                      <Link href="/settings"><Settings className="mr-2 h-4 w-4"/>Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                       <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                 <Button variant="ghost" asChild>
                   <Link href="/login"><LogIn className="md:mr-2"/> <span className="hidden md:inline">Log In</span></Link>
                 </Button>
                 <Button asChild>
                   <Link href="/signup"><UserPlus className="md:mr-2"/> <span className="hidden md:inline">Sign Up</span></Link>
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
      {<BottomNavBar />}
    </div>
  );
}
