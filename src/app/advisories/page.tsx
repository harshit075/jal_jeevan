
'use client';
import { useEffect, useRef, useState } from 'react';
import { AdvisoryCard } from '@/components/advisory-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Siren } from 'lucide-react';
import type { Advisory } from '@/lib/types';
import { collection, getDocs, orderBy, query, getFirestore } from 'firebase/firestore';
import { app } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { mockAdvisories } from '@/lib/seed-data';


export default function AdvisoriesPage() {
  const [advisories, setAdvisories] = useState<Advisory[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const hasShownFirebaseToast = useRef(false);

  useEffect(() => {
    if (!app) {
      const fallback = mockAdvisories.map((advisory, index) => ({
        ...advisory,
        id: `mock-${index}`,
      }));
      setAdvisories(fallback);
      setLoading(false);
      if (!hasShownFirebaseToast.current) {
        hasShownFirebaseToast.current = true;
        toast({
          title: 'Showing sample advisories',
          description:
            'Firebase is not configured (missing NEXT_PUBLIC_FIREBASE_*). Displaying sample data.',
        });
      }
      return;
    }
    const db = getFirestore(app);

    const fetchAdvisories = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "advisories"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const advisoriesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Advisory));
        if (advisoriesData.length > 0) {
          setAdvisories(advisoriesData);
        } else {
          const fallback = mockAdvisories.map((advisory, index) => ({
            ...advisory,
            id: `mock-${index}`,
          }));
          setAdvisories(fallback);
          toast({
            title: 'No advisories found',
            description: 'Firestore returned no advisories; showing sample data.',
          });
        }
      } catch (error) {
        console.error("Error fetching advisories: ", error);
        toast({
          variant: "destructive",
          title: "Failed to fetch advisories",
          description: "Could not load advisories from the database. Showing sample data.",
        });
        const fallback = mockAdvisories.map((advisory, index) => ({
          ...advisory,
          id: `mock-${index}`,
        }));
        setAdvisories(fallback);
      }
      setLoading(false);
    };

    fetchAdvisories();
  }, [toast]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">Health Advisories</h1>
          <p className="text-muted-foreground text-lg">Stay informed about active health and water safety advisories in your area.</p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="h-[300px]">
              <CardHeader><div className="h-6 bg-muted rounded w-3/4 animate-pulse"></div></CardHeader>
              <CardContent className="space-y-4">
                <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
                <div className="h-4 bg-muted rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : advisories.length > 0 ? (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {advisories.map((advisory) => (
            <AdvisoryCard key={advisory.id} advisory={advisory} />
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
