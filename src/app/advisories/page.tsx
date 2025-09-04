import { AdvisoryCard } from '@/components/advisory-card';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Siren } from 'lucide-react';
import Link from 'next/link';

const mockAdvisories = [
  {
    advisoryTitle: "Boil Water Advisory for Sector 15",
    advisorySummary: "Due to potential contamination, all residents in Sector 15 are advised to boil tap water before consumption or use. Water samples have shown elevated levels of E. coli.",
    affectedArea: "Sector 15, Township Area",
    recommendedActions: ["Boil all drinking water for at least 1 minute.", "Use bottled water for drinking, cooking, and brushing teeth.", "Disinfect all food preparation surfaces.", "Report any gastrointestinal symptoms to your local health clinic immediately."]
  },
  {
    advisoryTitle: "Cholera Outbreak Warning in Riverside Communities",
    advisorySummary: "An increasing number of cholera cases have been reported in communities along the river. The primary source is suspected to be contaminated river water.",
    affectedArea: "All communities along the Great River bank, from Elm Bridge to Pine Ford.",
    recommendedActions: ["Drink and use safe water (boiled or treated).", "Wash your hands often with soap and safe water, especially before eating and after using the toilet.", "Cook food well (especially seafood), keep it covered, and eat it hot.", "Avoid open defecation and use latrines."]
  },
  {
    advisoryTitle: "Increased Mosquito Activity and Dengue Risk",
    advisorySummary: "Health officials have noted a significant increase in mosquito populations following recent rains. This raises the risk of dengue fever transmission.",
    affectedArea: "City-wide",
    recommendedActions: ["Eliminate standing water in and around your home (e.g., in tires, flower pots, and containers).", "Use mosquito repellent containing DEET.", "Wear long-sleeved shirts and long pants.", "Keep windows and doors screened or closed."]
  }
];


export default function AdvisoriesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">Health Advisories</h1>
          <p className="text-muted-foreground">Stay informed about active health and water safety advisories in your area.</p>
        </div>
        <Button asChild>
          <Link href="/advisories/generate"><PlusCircle className="mr-2 h-4 w-4" /> Generate Advisory</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {mockAdvisories.length > 0 ? (
          mockAdvisories.map((advisory, index) => (
            <AdvisoryCard key={index} advisory={advisory} />
          ))
        ) : (
          <Card className="flex flex-col items-center justify-center p-12 text-center">
              <Siren className="h-16 w-16 text-green-500 mb-4" />
              <CardTitle className="font-headline text-2xl mb-2">All Clear!</CardTitle>
              <CardDescription>There are no active health advisories at this time. Stay vigilant and continue to practice good hygiene.</CardDescription>
          </Card>
        )}
      </div>
    </div>
  );
}
