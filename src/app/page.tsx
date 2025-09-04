
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { HeartPulse, Droplet, ListChecks, Siren } from "lucide-react";
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
            <Card className="flex flex-col transition-shadow hover:shadow-lg">
                <CardHeader>
                    <CardTitle>Go to Admin Dashboard</CardTitle>
                    <CardDescription>View detailed reports, manage advisories and oversee community health data.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-grow items-center">
                    <Button asChild size="lg" className="w-full transition-transform hover:scale-105">
                        <Link href="/admin"><ListChecks className="mr-2 h-4 w-4" /> View Admin Dashboard</Link>
                    </Button>
                </CardContent>
            </Card>
            <Card className="flex flex-col transition-shadow hover:shadow-lg">
                <CardHeader>
                    <CardTitle>Educational Materials</CardTitle>
                    <CardDescription>Review the educational materials available to the community.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-grow items-center">
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
    <div className="flex flex-col gap-6">
      <Card className="text-center shadow-lg">
        <CardHeader>
            <div className="flex justify-center mb-4">
                <Droplet className="w-12 h-12 text-primary"/>
            </div>
          <CardTitle className="font-headline text-3xl">Welcome to Jal Rakshak</CardTitle>
          <CardDescription className="text-base">
            Your health and safety are our priority. Report issues, stay informed, and help us build a healthier community.
          </CardDescription>
        </CardHeader>
      </Card>
      
      <div className="grid grid-cols-1 gap-4">
         <Card className="transition-shadow hover:shadow-md">
           <CardContent className="flex flex-col gap-4 p-6">
              <h3 className="font-semibold text-lg text-center">Report an Issue</h3>
              <p className="text-muted-foreground text-center text-sm">See something concerning? Let us know. Your reports make a difference.</p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                 <Button asChild size="lg" className="w-full transition-transform hover:scale-105">
                    <Link href="/report/symptoms"><HeartPulse className="mr-2 h-4 w-4" /> Report Symptoms</Link>
                </Button>
                <Button asChild size="lg" variant="secondary" className="w-full transition-transform hover:scale-105">
                    <Link href="/report/water-source"><Droplet className="mr-2 h-4 w-4" /> Report Water Source</Link>
                </Button>
              </div>
           </CardContent>
         </Card>

         <Card className="transition-shadow hover:shadow-md">
            <CardContent className="flex flex-col gap-4 p-6">
                <h3 className="font-semibold text-lg text-center">View Health Advisories</h3>
                <p className="text-muted-foreground text-center text-sm">Stay up-to-date with the latest health and safety information for your area.</p>
                <div className="pt-2">
                    <Button asChild size="lg" variant="outline" className="w-full transition-transform hover:scale-105">
                        <Link href="/advisories"><Siren className="mr-2 h-4 w-4" /> View Advisories</Link>
                    </Button>
                </div>
            </CardContent>
         </Card>
      </div>

    </div>
  );
}
