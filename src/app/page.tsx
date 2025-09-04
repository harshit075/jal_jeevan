import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Droplet, HeartPulse, ListChecks, Siren } from "lucide-react";
import Link from "next/link";
import { AdvisoryCard } from "@/components/advisory-card";

const mockAdvisories = [
  {
    advisoryTitle: "Boil Water Advisory for Sector 15",
    advisorySummary: "Due to potential contamination, all residents in Sector 15 are advised to boil tap water before consumption.",
    affectedArea: "Sector 15, Township Area",
    recommendedActions: ["Boil all drinking water for at least 1 minute.", "Use bottled water for drinking, cooking, and brushing teeth.", "Disinfect all food preparation surfaces."]
  },
  {
    advisoryTitle: "Cholera Outbreak Warning",
    advisorySummary: "Increased cases of cholera have been reported in the riverside communities. Please exercise extreme caution.",
    affectedArea: "All communities along the river bank",
    recommendedActions: ["Drink and use safe water.", "Wash your hands often with soap and safe water.", "Cook food well, keep it covered, and eat it hot."]
  }
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-headline text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to Jal Rakshak. Here's a summary of the current situation.</p>
      </div>

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

      <div>
        <h2 className="font-headline text-2xl font-bold tracking-tight mb-4">Recent Advisories</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {mockAdvisories.map((advisory, index) => (
             <AdvisoryCard key={index} advisory={advisory} />
          ))}
        </div>
      </div>
    </div>
  );
}
