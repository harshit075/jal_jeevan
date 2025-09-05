
'use client';
import { useState, useEffect } from 'react';
import { AdvisoryCard } from '@/components/advisory-card';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { PlusCircle, Siren } from 'lucide-react';
import Link from 'next/link';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Advisory } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export default function AdvisoriesPage() {
  const { role } = useAuth();
  const isAdmin = role === 'admin';
  const { toast } = useToast();
  const [advisories, setAdvisories] = useState<Advisory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdvisories = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "advisories"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const fetchedAdvisories = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Advisory));
        setAdvisories(fetchedAdvisories);
      } catch (error) {
        console.error("Error fetching advisories: ", error);
        toast({
          variant: "destructive",
          title: "Failed to load advisories.",
          description: "Please try again later.",
        });
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
        {isAdmin && (
          <Button asChild className="transition-transform hover:scale-105">
            <Link href="/advisories/generate"><PlusCircle className="mr-2 h-4 w-4" /> Generate New Advisory</Link>
          </Button>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="h-[300px]">
              <CardHeader><div className="h-6 bg-muted rounded w-3/4"></div></CardHeader>
              <CardContent className="space-y-4">
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
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
