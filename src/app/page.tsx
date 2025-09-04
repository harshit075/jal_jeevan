
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { HeartPulse, Droplet, ArrowRight, BookOpen, Shield, ListChecks, Siren } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AdvisoryCard } from "@/components/advisory-card";
import Autoplay from "embla-carousel-autoplay";


const heroStories = [
  {
    category: "HEALTH EDUCATION",
    title: "Boil Water Advisory: A Community Guide",
    description: "Recent tests have indicated potential contamination in local water sources. Learn why boiling water is crucial for your health and safety during an advisory.",
    image: {
      src: "https://picsum.photos/1200/600",
      alt: "A pot of water boiling on a stove.",
      hint: "boiling water"
    },
    href: "/education"
  },
  {
    category: "WATER SAFETY",
    title: "How to Identify Contaminated Water Sources",
    description: "Learn the visual signs of unsafe water to protect yourself and your community from waterborne diseases.",
    image: {
      src: "https://picsum.photos/1200/600",
      alt: "A person inspecting a water source.",
      hint: "water inspection"
    },
    href: "/report/water-source"
  },
    {
    category: "FIRST AID",
    title: "Your Guide to the Jal Rakshak Kit",
    description: "Discover the essential tools in your kit for water testing and handling minor medical emergencies.",
    image: {
      src: "https://picsum.photos/1200/600",
      alt: "The contents of a first aid and water testing kit laid out.",
      hint: "medical kit"
    },
    href: "/kit"
  }
];

const topStories = [
   {
    title: "How to Report Symptoms Anonymously",
    image: {
      src: "https://picsum.photos/400/300",
      alt: "A person using a smartphone to report health symptoms in a village in NorthEast India.",
      hint: "bamboo bridge"
    },
    href: "/report/symptoms"
  },
  {
    title: "Identifying Unsafe Water Sources",
     image: {
      src: "https://picsum.photos/400/300",
      alt: "A woman in traditional attire collecting water from a stream in a lush, green landscape.",
      hint: "traditional attire"
    },
    href: "/report/water-source"
  },
  {
    title: "Your Guide to the Jal Rakshak Kit",
     image: {
      src: "https://picsum.photos/400/300",
      alt: "A display of a first-aid kit with local herbs from NorthEast India.",
      hint: "hornbill festival"
    },
    href: "/kit"
  }
];

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


export default function DashboardPage() {
  const { role } = useAuth();
  const isAdmin = role === 'admin';

  if (isAdmin) {
    return (
      <div className="flex flex-col gap-8">
        <Card className="border-0 shadow-none bg-transparent">
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

  return (
    <div className="space-y-12">
      {/* Hero Carousel */}
      <Carousel 
        opts={{ loop: true }}
        plugins={[ Autoplay({ delay: 5000, stopOnInteraction: false }) ]}
      >
        <CarouselContent>
          {heroStories.map((story, index) => (
            <CarouselItem key={index}>
              <Card className="overflow-hidden">
                <Link href={story.href} className="group block">
                  <div className="grid md:grid-cols-2 gap-0 items-center">
                    <div className="relative h-64 md:h-[400px] overflow-hidden">
                      <Image
                        src={story.image.src}
                        alt={story.image.alt}
                        data-ai-hint={story.image.hint}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-8 md:p-12">
                      <p className="text-sm font-bold uppercase text-primary tracking-wider mb-2">{story.category}</p>
                      <h1 className="font-headline text-3xl md:text-4xl font-bold group-hover:text-primary transition-colors">{story.title}</h1>
                      <p className="mt-4 text-lg text-muted-foreground">{story.description}</p>
                    </div>
                  </div>
                </Link>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 hidden md:flex"/>
        <CarouselNext className="right-4 hidden md:flex"/>
      </Carousel>
      
      {/* Action Cards */}
       <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
         <Card className="group flex flex-col justify-between overflow-hidden transition-shadow hover:shadow-lg">
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
                  <CardTitle className="text-xl font-headline">Report a Water Source</CardTitle>
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

       {/* Latest Advisories */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-headline flex items-center gap-2"><Siren className="text-primary"/> Latest Advisories</h2>
          <Button variant="link" asChild>
            <Link href="/advisories">View All <ArrowRight className="ml-1" /></Link>
          </Button>
        </div>
        <Carousel 
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: false,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {mockAdvisories.map((advisory, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <AdvisoryCard advisory={advisory} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>


      {/* Top Stories Grid */}
      <div>
        <h2 className="text-2xl font-bold font-headline mb-6">More Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topStories.map((story, index) => (
             <Link key={index} href={story.href} className="group block">
                <Card className="overflow-hidden transition-shadow hover:shadow-xl h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                      <Image
                      src={story.image.src}
                      alt={story.image.alt}
                      data-ai-hint={story.image.hint}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
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
