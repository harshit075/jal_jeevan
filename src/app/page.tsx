import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Droplet, HeartPulse, ListChecks, Siren } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <Card className="overflow-hidden">
        <div className="relative h-48 w-full md:h-64">
          <Image 
            src="https://picsum.photos/1200/400" 
            alt="Clean water flowing from a community tap" 
            fill
            style={{objectFit: 'cover'}}
            data-ai-hint="clean water community"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 p-6">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-white">Jal Rakshak</h1>
            <p className="mt-2 text-lg text-white/90">Your Community Health & Water Monitoring Platform</p>
          </div>
        </div>
        <CardContent className="p-6 text-base">
          <p>
            Jal Rakshak ("Water Guardian") is a community-powered platform designed to safeguard public health by monitoring water quality and tracking health symptoms. By reporting issues, you help create a safer, healthier environment for everyone.
          </p>
        </CardContent>
      </Card>


      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Symptom Reports</CardTitle>
            <HeartPulse className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+5.2% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Water Source Reports</CardTitle>
            <Droplet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">+2 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Advisories</CardTitle>
            <Siren className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Urgent action may be required</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Community Health Score</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">8.2/10</div>
            <p className="text-xs text-muted-foreground">Stable trend this month</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle>Report an Issue</CardTitle>
                <CardDescription>Help us track community health by reporting symptoms or water source issues.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" className="w-full">
                    <Link href="/report/symptoms"><HeartPulse className="mr-2 h-4 w-4" /> Report Symptoms</Link>
                </Button>
                <Button asChild size="lg" variant="secondary" className="w-full">
                    <Link href="/report/water-source"><Droplet className="mr-2 h-4 w-4" /> Report Water Source</Link>
                </Button>
            </CardContent>
        </Card>
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle>Educational Materials</CardTitle>
                <CardDescription>Learn about hygiene practices and disease prevention.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild size="lg" variant="outline" className="w-full">
                    <Link href="/education"> <ListChecks className="mr-2 h-4 w-4" /> View Guides</Link>
                </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
