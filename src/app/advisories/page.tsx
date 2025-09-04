

'use client';
import { AdvisoryCard } from '@/components/advisory-card';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { PlusCircle, Siren } from 'lucide-react';
import Link from 'next/link';

const mockAdvisories = [
  {
    advisoryTitle: "Boil Water Advisory for Sector 15",
    advisorySummary: "Due to potential contamination, all residents in Sector 15 are advised to boil tap water before consumption or use. Water samples have shown elevated levels of E. coli bacteria.",
    affectedArea: "Sector 15, Township Area",
    recommendedActions: ["Boil all drinking water for at least 1 minute.", "Use bottled water for drinking, cooking, and brushing teeth.", "Disinfect all food preparation surfaces.", "Report any gastrointestinal symptoms to your local health clinic immediately."]
  },
  {
    advisoryTitle: "Cholera Outbreak Warning in Riverside Communities",
    advisorySummary: "An increasing number of cholera cases have been reported in communities along the river. The primary source is suspected to be contaminated river water used for drinking and bathing.",
    affectedArea: "All communities along the Great River bank, from Elm Bridge to Pine Ford.",
    recommendedActions: ["Drink and use safe water (boiled or treated).", "Wash your hands often with soap and safe water.", "Cook food well, especially seafood, and eat it while it's hot.", "Clean up safely—in the kitchen and when caring for sick family members."]
  },
  {
    advisoryTitle: "Increased Mosquito Activity and Dengue Risk",
    advisorySummary: "Health officials have noted a significant increase in mosquito populations following recent rains. This raises the risk of dengue fever transmission. Be proactive in eliminating breeding grounds.",
    affectedArea: "City-wide",
    recommendedActions: ["Eliminate standing water in and around your home (e.g., in tires, flower pots, and containers).", "Use mosquito repellent containing DEET, especially during dawn and dusk.", "Wear long-sleeved shirts and long pants to cover your skin.", "Keep windows and doors screened or closed to prevent mosquitos from entering."]
  }
];


export default function AdvisoriesPage() {
  const { role } = useAuth();
  const isAdmin = role === 'admin';

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">Health Advisories</h1>
          <p className="text-muted-foreground text-lg">Stay informed about active health and water safety advisories in your area.</p>
        </div>
        {isAdmin && (
          <Button asChild className="transition-transform hover:scale-105">
            <Link href="/advisories/generate"><PlusCircle className="mr-2 h-4 w-4" /> Generate New Advisory</Link>
          </Button>
        )}
      </div>

      {mockAdvisories.length > 0 ? (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAdvisories.map((advisory, index) => (
            <AdvisoryCard key={index} advisory={advisory} />
          ))}
        </div>
      ) : (
        <Card className="flex flex-col items-center justify-center p-12 text-center bg-muted/20 border-dashed border-2">
            <Siren className="h-16 w-16 text-green-500 mb-4" />
            <CardTitle className="font-headline text-2xl mb-2">All Clear!</CardTitle>
            <CardDescription className="text-base">There are no active health advisories at this time. Stay vigilant and continue to practice good hygiene.</CardDescription>
        </Card>
      )}
    </div>
  );
}
