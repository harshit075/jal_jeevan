
'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { PlayCircle, BookOpen, Newspaper, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddEducationContentForm } from "@/components/add-education-content-form";

export type EducationalModule = {
    id: string;
    title: string;
    category: string;
    content: string;
    videoUrl: string;
};

export type EducationalArticle = {
    id: string;
    title: string;
    category: string;
    image: { src: string, alt: string, 'data-ai-hint'?: string };
    content: string;
};

const educationalModules: EducationalModule[] = [
    {
        id: "module-1",
        title: "How to Use Water Purification Tablets",
        category: "Water Safety",
        content: "Learn the correct way to use water purification tablets to make sure your water is safe to drink. This video covers dosage, waiting times, and what to look for to ensure the tablets are effective.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
        id: "module-2",
        title: "Recognizing Symptoms of Waterborne Diseases",
        category: "Health & Hygiene",
        content: "This module helps you identify the common symptoms of diseases like cholera, typhoid, and dysentery. Early recognition is key to seeking timely medical help.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
        id: "module-3",
        title: "Proper Handwashing Techniques",
        category: "Health & Hygiene",
        content: "A step-by-step guide to effective handwashing. Following these simple steps can significantly reduce the risk of spreading germs and diseases.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
        id: "module-4",
        title: "Using Your Jal Jeevan IoT Monitor",
        category: "Kit Usage",
        content: "This video explains how to use the IoT water quality monitor from your Jal Jeevan kit. Learn to activate it, test water, and understand the readings.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
];

const educationalArticles: EducationalArticle[] = [
    {
        id: "article-1",
        title: "Why Boiling Water is a Lifesaver",
        category: "Water Safety",
        image: {
            src: "/images/story-water-source.jpg",
            alt: "A pot of water boiling on a stove.",
            "data-ai-hint": "boiling water"
        },
        content: "Boiling is one of the most effective ways to kill disease-causing organisms. Learn the right way to boil water to ensure it's safe for drinking."
    },
    {
        id: "article-2",
        title: "Understanding Cholera: Causes and Prevention",
        category: "Disease Info",
        image: {
            src: "/images/story-symptoms.jpg",
            alt: "Microscopic view of Vibrio cholerae bacteria.",
            "data-ai-hint": "bacteria microscope"
        },
        content: "Cholera is a major risk in areas with poor sanitation. This article covers how it spreads and the crucial steps you can take to protect your family."
    },
    {
        id: "article-3",
        title: "Creating a Safe Sanitation Zone at Home",
        category: "Health & Hygiene",
        image: {
            src: "/images/hero-rain.jpeg",
            alt: "A 'tippy tap' handwashing station set up outdoors.",
            "data-ai-hint": "handwashing station"
        },
        content: "Good sanitation is your first line of defense. Learn how to manage waste and create a hygienic environment at home to prevent diseases."
    },
    {
      id: "article-4",
      title: "First-Aid for Diarrhea and Dehydration",
      category: "First Aid",
      image: { src: '/images/story-kit.jpg', alt: "A packet of ORS solution being prepared.", "data-ai-hint": "oral rehydration" },
      content: "Dehydration from diarrhea can be dangerous, especially for children. Learn how to prepare and use Oral Rehydration Salts (ORS) and other first-aid measures."
    },
    {
      id: "article-5",
      title: "The Dangers of Dysentery",
      category: "Disease Info",
      image: { src: '/images/story-symptoms.jpg', alt: "Illustration of dysentery symptoms affecting the gut.", "data-ai-hint": "stomach pain" },
      content: "Dysentery is an intestinal inflammation that can cause severe bloody diarrhea. This guide explains its symptoms, transmission, and when to seek urgent medical care."
    },
    {
      id: "article-6",
      title: "Typhoid Fever: Symptoms and Treatment",
      category: "Disease Info",
      image: { src: '/images/story-symptoms.jpg', alt: "A person with a high fever being cared for.", "data-ai-hint": "fever illness" },
      content: "Typhoid fever is a serious bacterial infection. Learn to recognize its distinct symptoms, such as high fever and rash, and understand the importance of antibiotic treatment."
    }
];

export default function EducationPage() {
    const [selectedModule, setSelectedModule] = useState<EducationalModule>(educationalModules[0]);
    const { role, loading } = useAuth();
    const isAdmin = role === 'admin';
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleAddContent = (content: Omit<EducationalModule, 'id'> | Omit<EducationalArticle, 'id'>) => {
        // This is a mock implementation for the UI.
        // In a real app, you'd send this to a server/database.
        if ('videoUrl' in content) {
            const newModule = { id: `module-${Date.now()}`, ...content };
            // setEducationalModules(prev => [...prev, newModule]);
        } else {
             const newArticle = { id: `article-${Date.now()}`, ...content };
            // setEducationalArticles(prev => [...prev, newArticle]);
        }
        console.log("New content added:", content);
        setIsDialogOpen(false);
    };

    return (
        <div className="space-y-12">
             <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start">
                <Card className="border-0 shadow-none bg-transparent flex-1">
                    <CardHeader className="p-0">
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
                                <BookOpen className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                                <h1 className="font-headline text-3xl font-bold tracking-tight">Educational Resources</h1>
                                <p className="mt-1 text-lg text-muted-foreground">
                                    Learn essential hygiene practices, disease prevention, and how to use your kit.
                                </p>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
                {!loading && isAdmin && (
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="transition-transform hover:scale-105">
                          <PlusCircle className="mr-2 h-4 w-4" /> Add Educational Content
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add New Educational Content</DialogTitle>
                        <DialogDescription>
                          Select the type of content you want to add and fill in the details.
                        </DialogDescription>
                      </DialogHeader>
                      <AddEducationContentForm onSubmit={handleAddContent} />
                    </DialogContent>
                  </Dialog>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="overflow-hidden shadow-lg">
                        <div className="aspect-video w-full">
                            <iframe
                                className="w-full h-full"
                                src={selectedModule.videoUrl}
                                title={`YouTube video for ${selectedModule.title}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl">{selectedModule.title}</CardTitle>
                            <CardDescription className="text-base font-medium text-primary">{selectedModule.category}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-base leading-relaxed text-muted-foreground">{selectedModule.content}</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-xl">Modules Playlist</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <ScrollArea className="h-[500px] w-full">
                                <div className="p-2 space-y-1">
                                    {educationalModules.map((module) => (
                                        <button
                                            key={module.id}
                                            onClick={() => setSelectedModule(module)}
                                            className={cn(
                                                "w-full text-left p-3 rounded-lg transition-colors flex items-start gap-4",
                                                selectedModule.id === module.id
                                                    ? "bg-primary/10 text-primary"
                                                    : "hover:bg-muted/50"
                                            )}
                                        >
                                            <PlayCircle className={cn("h-6 w-6 mt-1 shrink-0", selectedModule.id === module.id ? "text-primary" : "text-muted-foreground")} />
                                            <div>
                                                <h3 className="font-semibold">{module.title}</h3>
                                                <p className={cn("text-sm", selectedModule.id === module.id ? "text-primary/80" : "text-muted-foreground")}>
                                                    {module.category}
                                                </p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div>
              <div className="flex items-center gap-4 mb-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-accent/10">
                      <Newspaper className="h-8 w-8 text-accent" />
                  </div>
                  <div>
                      <h2 className="font-headline text-3xl font-bold tracking-tight">Further Reading</h2>
                      <p className="mt-1 text-lg text-muted-foreground">
                          Dive deeper into key health and safety topics with these articles.
                      </p>
                  </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {educationalArticles.map((article) => (
                  <Card key={article.id} className="flex flex-col overflow-hidden transition-shadow hover:shadow-xl">
                     <div className="relative h-48 w-full">
                        <Image
                            src={article.image.src}
                            alt={article.image.alt}
                            fill
                            className="object-cover"
                            data-ai-hint={article.image['data-ai-hint']}
                        />
                    </div>
                    <CardHeader>
                      <CardTitle className="font-headline text-xl">{article.title}</CardTitle>
                      <CardDescription className="text-base font-medium text-accent">{article.category}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-base leading-relaxed text-muted-foreground">{article.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
        </div>
    );
}
