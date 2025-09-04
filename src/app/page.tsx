
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { HeartPulse, Droplet, ListChecks, Shield, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const mainStory = {
  title: "Boil Water Advisory: A Community Guide",
  description: "Recent tests have indicated potential contamination in local water sources. Learn why boiling water is crucial for your health and safety during an advisory.",
  image: {
    src: "https://picsum.photos/800/600",
    alt: "A pot of water boiling on a stove.",
    hint: "boiling water"
  },
  href: "/education"
};

const topStories = [
   {
    title: "How to Report Symptoms Anonymously",
    image: {
      src: "https://picsum.photos/400/300",
      alt: "A person using a smartphone.",
      hint: "person phone"
    },
    href: "/report/symptoms"
  },
  {
    title: "Identifying Unsafe Water Sources",
     image: {
      src: "https://picsum.photos/400/300",
      alt: "A person looking at a river.",
      hint: "river water"
    },
    href: "/report/water-source"
  },
  {
    title: "Your Guide to the Jal Rakshak Kit",
     image: {
      src: "https://picsum.photos/400/300",
      alt: "A first aid and water testing kit.",
      hint: "medical kit"
    },
    href: "/kit"
  }
];


export default function DashboardPage() {
  const { role } = useAuth();
  const isAdmin = role === 'admin';

  if (isAdmin) {
    return (
      <div className="flex flex-col gap-8">
        <Card className="border-0 shadow-none">
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

  // Simplified view for community users
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-sm font-bold uppercase text-primary tracking-wider">TODAY'S TOP STORIES</h2>
      </div>

      {/* Main Story */}
      <Link href={mainStory.href} className="group block">
        <Card className="grid md:grid-cols-2 gap-8 items-center border-0 shadow-none">
          <div className="overflow-hidden">
            <Image
              src={mainStory.image.src}
              alt={mainStory.image.alt}
              data-ai-hint={mainStory.image.hint}
              width={800}
              height={600}
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <div>
            <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary group-hover:underline">{mainStory.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{mainStory.description}</p>
          </div>
        </Card>
      </Link>

      <hr className="my-12" />

      {/* Top Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {topStories.map((story, index) => (
           <Link key={index} href={story.href} className="group block">
              <Card className="border-0 shadow-none">
                <div className="overflow-hidden">
                    <Image
                    src={story.image.src}
                    alt={story.image.alt}
                    data-ai-hint={story.image.hint}
                    width={400}
                    height={300}
                    className="object-cover transition-transform group-hover:scale-105"
                    />
                </div>
                 <CardHeader className="p-4 pl-0">
                    <CardTitle className="font-headline text-xl font-bold group-hover:underline">{story.title}</CardTitle>
                </CardHeader>
              </Card>
           </Link>
        ))}
      </div>

      <hr className="my-12" />

      {/* Action Cards */}
       <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
         <Card className="group flex flex-col justify-between overflow-hidden transition-shadow hover:shadow-lg">
            <CardHeader>
               <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <HeartPulse className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">Report Symptoms</CardTitle>
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
                  <CardTitle className="text-xl">Report a Water Source</CardTitle>
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

    </div>
  );
}
