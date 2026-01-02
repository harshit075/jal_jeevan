
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { HeartPulse, Droplet, ArrowRight, BookOpen, Shield, ListChecks, Siren } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AdvisoryCard } from "@/components/advisory-card";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query, getFirestore } from "firebase/firestore";
import { app } from "@/lib/firebase";
import { Advisory } from "@/lib/types";


const heroStories = [
    {
    category: "FIRST AID",
    title: "Your Guide to the Aarogya jal Sanket Kit",
    description: "Discover the essential tools in your kit for water testing and handling minor medical emergencies.",
    image: {
      src: "/images/hero-kit.jpeg",
      alt: "A first aid kit sitting on a wooden table in a hut with rain visible outside.",
      "data-ai-hint": "first aid"
    },
    href: "/kit"
  },
  {
    category: "HEALTH EDUCATION",
    title: "Boil Water Advisory: A Community Guide",
    description: "Recent tests have indicated potential contamination in local water sources. Learn why boiling water is crucial for your health and safety during an advisory.",
    image: {
      src: "/images/hero-rain.jpeg",
      alt: "Heavy rain falling on a lush green forest.",
      "data-ai-hint": "heavy rain"
    },
    href: "/education"
  },
  {
    category: "WATER SAFETY",
    title: "How to Identify Contaminated Water Sources",
    description: "Learn the visual signs of unsafe water to protect yourself and your community from waterborne diseases.",
    image: {
      src: "/images/hero-landscape.jpeg",
      alt: "A person inspecting a stream in a rainy, green landscape.",
      "data-ai-hint": "inspeacting stream"
    },
    href: "/report/water-source"
  }
];

const topStories = [
   {
    title: "How to Report Symptoms Anonymously",
    image: {
      src: "/images/story-symptoms.jpg",
      alt: "A person using a smartphone in a village during a monsoon.",
      "data-ai-hint": "phone village"
    },
    href: "/report/symptoms"
  },
  {
    title: "Identifying Unsafe Water Sources",
     image: {
      src: "/images/story-water-source.jpg",
      alt: "A woman collecting water from a stream during light rain in a green valley.",
      "data-ai-hint": "collecting water"
    },
    href: "/report/water-source"
  },
  {
    title: "Your Guide to the Aarogya jal Sanket Kit",
     image: {
      src: "/images/story-kit.jpg",
      alt: "A display of a first-aid kit with lush green foliage in the background.",
      "data-ai-hint": "first-aid kit"
    },
    href: "/kit"
  }
];


export default function DashboardPage() {
  const { role } = useAuth();
  const isAdmin = role === 'admin';
  const [latestAdvisories, setLatestAdvisories] = useState<Advisory[]>([]);
  const [isLoadingAdvisories, setIsLoadingAdvisories] = useState(true);

  useEffect(() => {
    if (!app) return;
    const db = getFirestore(app);

    const fetchAdvisories = async () => {
      setIsLoadingAdvisories(true);
      try {
        const q = query(
          collection(db, "advisories"),
          orderBy("createdAt", "desc"),
          limit(2)
        );
        const querySnapshot = await getDocs(q);
        const advisories = querySnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Advisory)
        );
        setLatestAdvisories(advisories);
      } catch (e) {
        setLatestAdvisories([]);
      } finally {
        setIsLoadingAdvisories(false);
      }
    };

    fetchAdvisories();
  }, []);


  if (isAdmin) {
    return (
      <div className="flex flex-col gap-8">
        <Card className="border-0 shadow-none bg-transparent">
          <CardHeader className="p-0">
              <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground">Aarogya jal Sanket Admin</h1>
              <p className="mt-2 text-lg text-muted-foreground">Community Health & Water Monitoring Platform</p>
          </CardHeader>
        </Card>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Card className="flex flex-col transition-shadow motion-safe:hover:shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Shield className="text-primary"/> Admin Dashboard</CardTitle>
                    <CardDescription>View detailed reports, manage advisories and oversee community health data.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-grow items-end">
                    <Button asChild size="lg" className="w-full motion-safe:transition-transform motion-safe:hover:scale-105">
                        <Link href="/admin"><ListChecks className="mr-2 h-4 w-4" /> View Admin Dashboard</Link>
                    </Button>
                </CardContent>
            </Card>
            <Card className="flex flex-col transition-shadow motion-safe:hover:shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BookOpen className="text-primary"/> Educational Materials</CardTitle>
                    <CardDescription>Review the educational materials available to the community.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-grow items-end">
                    <Button asChild size="lg" variant="outline" className="w-full motion-safe:transition-transform motion-safe:hover:scale-105">
                        <Link href="/education"> <ListChecks className="mr-2 h-4 w-4" /> View Guides</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 md:space-y-12">
      {/* Hero Carousel */}
      <Carousel 
        opts={{ loop: true }}
        plugins={[ Autoplay({ delay: 5000, stopOnInteraction: true }) ]}
        className="w-full"
      >
        <CarouselContent>
          {heroStories.map((story, index) => (
            <CarouselItem key={index}>
                <Link href={story.href} className="group block overflow-hidden rounded-lg">
                  <div className="relative aspect-[16/9] md:aspect-[2/1]">
                    <Image
                      src={story.image.src}
                      alt={story.image.alt}
                      fill
                      className="object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105"
                      data-ai-hint={story.image['data-ai-hint']}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
                     <div className="absolute inset-0 grid md:grid-cols-2 gap-6 md:gap-8 items-end p-4 sm:p-6 md:p-12">
                        <div className="text-white">
                          <p className="text-sm font-bold uppercase text-primary-foreground/80 tracking-wider mb-2">{story.category}</p>
                          <h1 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold group-hover:text-primary transition-colors">{story.title}</h1>
                          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-primary-foreground/90 max-w-lg">{story.description}</p>
                        </div>
                    </div>
                  </div>
                </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 hidden sm:flex"/>
        <CarouselNext className="right-4 hidden sm:flex"/>
      </Carousel>
      
      {/* Action Cards */}
       <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
         <Card className="group flex flex-col justify-between overflow-hidden transition-shadow hover:shadow-xl bg-card">
            <CardHeader>
               <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <HeartPulse className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-headline">Report Symptoms</CardTitle>
               </div>
               <CardDescription className="pt-2">Feeling unwell? Anonymously report your symptoms to help public health officials identify potential outbreaks quickly.</CardDescription>
            </CardHeader>
            <CardContent>
                  <Button asChild className="w-full motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:scale-105">
                     <Link href="/report/symptoms">File a Health Report <ArrowRight className="ml-2" /></Link>
                 </Button>
            </CardContent>
         </Card>
          <Card className="group flex flex-col justify-between overflow-hidden transition-shadow hover:shadow-xl bg-card">
            <CardHeader>
               <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Droplet className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-headline">Report a Water Source</CardTitle>
               </div>
               <CardDescription className="pt-2">Notice something unusual about a public water source? Report issues with color, smell, or clarity to ensure water safety.</CardDescription>
            </CardHeader>
            <CardContent>
                  <Button asChild variant="secondary" className="w-full motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:scale-105">
                     <Link href="/report/water-source">Report a Water Source <ArrowRight className="ml-2" /></Link>
                 </Button>
            </CardContent>
         </Card>
      </div>

       {/* Latest Advisories */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-headline flex items-center gap-3"><Siren className="text-primary"/> Latest Advisories</h2>
          <Button variant="link" asChild>
            <Link href="/advisories">View All <ArrowRight className="ml-1" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isLoadingAdvisories ? (
              Array.from({ length: 2 }).map((_, i) => (
                <Card key={i} className="h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-8 w-8 rounded-md" />
                        <div className="space-y-2">
                          <Skeleton className="h-5 w-56" />
                          <Skeleton className="h-4 w-72" />
                        </div>
                      </div>
                      <Skeleton className="h-6 w-16" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                </Card>
              ))
            ) : latestAdvisories.length > 0 ? (
              latestAdvisories.map((advisory) => (
                <AdvisoryCard key={advisory.id} advisory={advisory} />
              ))
            ) : (
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="font-headline">No advisories right now</CardTitle>
                  <CardDescription>
                    Check back later, or browse resources to stay prepared.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Button asChild>
                      <Link href="/education">Browse Education</Link>
                    </Button>
                    <Button asChild variant="secondary">
                      <Link href="/advisories">View Advisories</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
        </div>
      </div>


      {/* Top Stories Grid */}
      <div>
        <h2 className="text-2xl font-bold font-headline mb-6">More Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {topStories.map((story, index) => (
             <Link key={index} href={story.href} className="group block">
                <Card className="overflow-hidden transition-shadow hover:shadow-xl h-full flex flex-col bg-card">
                  <div className="relative h-48 overflow-hidden">
                      <Image
                      src={story.image.src}
                      alt={story.image.alt}
                      fill
                      className="object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105"
                      data-ai-hint={story.image['data-ai-hint']}
                      />
                  </div>
                   <CardHeader>
                      <CardTitle className="font-headline text-lg font-bold group-hover:text-primary transition-colors">{story.title}</CardTitle>
                  </CardHeader>
                </Card>
             </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
