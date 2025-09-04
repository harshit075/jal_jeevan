
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { HeartPulse, Droplet, ListChecks, Siren, Shield, BookOpen, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function DashboardPage() {
  const { role } = useAuth();
  const isAdmin = role === 'admin';

  if (isAdmin) {
    return (
      <div className="flex flex-col gap-8">
        <Card className="overflow-hidden transition-shadow hover:shadow-lg">
          <div className="relative h-48 w-full md:h-64">
            <Image
              src="https://picsum.photos/1200/400"
              alt="Clean water flowing from a community tap"
              fill
              style={{ objectFit: 'cover' }}
              className="transition-transform group-hover:scale-105"
              data-ai-hint="clean water community"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 p-6">
              <h1 className="font-headline text-4xl font-bold tracking-tight text-white">Jal Rakshak - Admin</h1>
              <p className="mt-2 text-lg text-white/90">Community Health & Water Monitoring Platform</p>
            </div>
          </div>
        </Card>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Card className="flex flex-col transition-shadow hover:shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Shield /> Admin Dashboard</CardTitle>
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
                    <CardTitle className="flex items-center gap-2"><BookOpen /> Educational Materials</CardTitle>
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
    <div className="flex flex-col gap-6 pb-24">
      <Card className="text-center shadow-lg overflow-hidden">
        <div className="relative h-48 w-full">
            <Image
                src="https://picsum.photos/800/400"
                alt="A smiling family receiving clean water"
                fill
                style={{ objectFit: 'cover' }}
                data-ai-hint="happy family water"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
             <div className="absolute bottom-0 w-full p-6 text-white">
                <h1 className="font-headline text-3xl font-bold">Welcome to Jal Rakshak</h1>
                <p className="mt-1 text-white/90">Your health is our priority. Report issues, stay informed, and help us build a healthier community.</p>
             </div>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 gap-4">
         <Card className="transition-shadow hover:shadow-md">
           <CardHeader>
              <CardTitle className="text-lg">Report an Issue</CardTitle>
              <CardDescription>See something concerning? Let us know. Your reports make a difference.</CardDescription>
           </CardHeader>
           <CardContent className="flex flex-col sm:flex-row gap-4">
                 <Button asChild size="lg" className="w-full transition-transform hover:scale-105">
                    <Link href="/report/symptoms"><HeartPulse className="mr-2 h-4 w-4" /> Report Symptoms</Link>
                </Button>
                <Button asChild size="lg" variant="secondary" className="w-full transition-transform hover:scale-105">
                    <Link href="/report/water-source"><Droplet className="mr-2 h-4 w-4" /> Report Water Source</Link>
                </Button>
           </CardContent>
         </Card>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="transition-shadow hover:shadow-md">
              <CardHeader>
                  <CardTitle className="text-lg">View Health Advisories</CardTitle>
                  <CardDescription>Stay up-to-date with the latest health and safety information.</CardDescription>
              </CardHeader>
              <CardContent>
                  <Button asChild variant="outline" className="w-full transition-transform hover:scale-105">
                      <Link href="/advisories"><Siren className="mr-2 h-4 w-4" /> View Advisories</Link>
                  </Button>
              </CardContent>
          </Card>
          <Card className="transition-shadow hover:shadow-md">
              <CardHeader>
                  <CardTitle className="text-lg">Purchase a Kit</CardTitle>
                  <CardDescription>Get equipped with our health and water monitoring kit.</CardDescription>
              </CardHeader>
              <CardContent>
                  <Button asChild variant="outline" className="w-full transition-transform hover:scale-105">
                      <Link href="/kit"><ShoppingCart className="mr-2 h-4 w-4" /> Get a Kit</Link>
                  </Button>
              </CardContent>
          </Card>
         </div>
      </div>
    </div>
  );
}
