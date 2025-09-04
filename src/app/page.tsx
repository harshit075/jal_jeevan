
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { HeartPulse, Droplet, ListChecks, Siren, Shield, BookOpen, ShoppingCart, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function DashboardPage() {
  const { role } = useAuth();
  const isAdmin = role === 'admin';

  if (isAdmin) {
    return (
      <div className="flex flex-col gap-8">
        <Card className="border-0 shadow-none">
          <CardHeader className="p-0">
              <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground">Jal Rakshak Admin</h1>
              <p className="mt-2 text-lg text-muted-foreground">Community Health & Water Monitoring Platform</p>
          </CardHeader>
        </Card>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Card className="flex flex-col transition-shadow hover:shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Shield className="text-primary"/> Admin Dashboard</CardTitle>
                    <CardDescription>View detailed reports, manage advisories and oversee community health data.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-grow items-end">
                    <Button asChild size="lg" className="w-full transition-transform hover:scale-105">
                        <Link href="/admin"><ListChecks className="mr-2 h-4 w-4" /> View Admin Dashboard</Link>
                    </Button>
                </CardContent>
            </Card>
            <Card className="flex flex-col transition-shadow hover:shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BookOpen className="text-primary"/> Educational Materials</CardTitle>
                    <CardDescription>Review the educational materials available to the community.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-grow items-end">
                    <Button asChild size="lg" variant="outline" className="w-full transition-transform hover:scale-105">
                        <Link href="/education"> <ListChecks className="mr-2 h-4 w-4" /> View Guides</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    );
  }

  // Simplified view for community users
  return (
    <div className="flex flex-col gap-10">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">Your Health, Our Priority.</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Jal Rakshak helps communities track water quality and public health. Report issues, stay informed, and help us build a healthier future together.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
         <Card className="group flex flex-col justify-between overflow-hidden transition-shadow hover:shadow-lg">
            <CardHeader>
               <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <HeartPulse className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Report Symptoms</CardTitle>
               </div>
               <CardDescription className="pt-2">Feeling unwell? Anonymously report your symptoms to help public health officials identify potential outbreaks quickly.</CardDescription>
            </CardHeader>
            <CardContent>
                  <Button asChild className="w-full transition-transform group-hover:scale-105">
                     <Link href="/report/symptoms">File a Health Report <ArrowRight className="ml-2" /></Link>
                 </Button>
            </CardContent>
         </Card>
          <Card className="group flex flex-col justify-between overflow-hidden transition-shadow hover:shadow-lg">
            <CardHeader>
               <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Droplet className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Report a Water Source</CardTitle>
               </div>
               <CardDescription className="pt-2">Notice something unusual about a public water source? Report issues with color, smell, or clarity to ensure water safety.</CardDescription>
            </CardHeader>
            <CardContent>
                  <Button asChild variant="secondary" className="w-full transition-transform group-hover:scale-105">
                     <Link href="/report/water-source">Report a Water Source <ArrowRight className="ml-2" /></Link>
                 </Button>
            </CardContent>
         </Card>
      </div>

       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/advisories" className="group block rounded-lg border bg-card p-6 transition-shadow hover:shadow-lg">
            <Siren className="h-8 w-8 text-primary" />
            <h3 className="mt-4 text-lg font-semibold">Health Advisories</h3>
            <p className="mt-1 text-muted-foreground">Stay up-to-date with the latest health and safety alerts in your area.</p>
          </Link>
           <Link href="/education" className="group block rounded-lg border bg-card p-6 transition-shadow hover:shadow-lg">
            <BookOpen className="h-8 w-8 text-primary" />
            <h3 className="mt-4 text-lg font-semibold">Learn & Prepare</h3>
            <p className="mt-1 text-muted-foreground">Access guides on hygiene, water safety, and disease prevention.</p>
          </Link>
           <Link href="/kit" className="group block rounded-lg border bg-card p-6 transition-shadow hover:shadow-lg">
            <ShoppingCart className="h-8 w-8 text-primary" />
            <h3 className="mt-4 text-lg font-semibold">Get a Health Kit</h3>
            <p className="mt-1 text-muted-foreground">Purchase a kit with tools for water testing and basic first aid.</p>
          </Link>
        </div>
    </div>
  );
}
