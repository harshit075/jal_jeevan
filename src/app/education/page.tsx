
'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { PlayCircle, BookOpen, Newspaper, PlusCircle, Loader2 } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddEducationContentForm } from "@/components/add-education-content-form";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

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

export default function EducationPage() {
    const { toast } = useToast();
    const [educationalModules, setEducationalModules] = useState<EducationalModule[]>([]);
    const [educationalArticles, setEducationalArticles] = useState<EducationalArticle[]>([]);
    const [selectedModule, setSelectedModule] = useState<EducationalModule | null>(null);
    const { role, loading: authLoading } = useAuth();
    const isAdmin = role === 'admin';
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
            const modulesSnapshot = await getDocs(collection(db, "educationalModules"));
            const modulesData = modulesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as EducationalModule));
            setEducationalModules(modulesData);
            if (modulesData.length > 0) {
              setSelectedModule(modulesData[0]);
            }

            const articlesSnapshot = await getDocs(collection(db, "educationalArticles"));
            const articlesData = articlesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as EducationalArticle));
            setEducationalArticles(articlesData);

        } catch (error) {
            console.error("Error fetching educational content: ", error);
            toast({ variant: "destructive", title: "Failed to fetch content" });
        }
        setLoading(false);
      };

      fetchData();
    }, [toast]);


    const handleAddContent = async (content: Omit<EducationalModule, 'id'> | Omit<EducationalArticle, 'id'>) => {
        try {
            if ('videoUrl' in content) {
                const docRef = await addDoc(collection(db, "educationalModules"), content);
                setEducationalModules(prev => [...prev, {id: docRef.id, ...content}]);
            } else {
                const docRef = await addDoc(collection(db, "educationalArticles"), content);
                setEducationalArticles(prev => [...prev, {id: docRef.id, ...content}]);
            }
            toast({ title: "Content added successfully!" });
            setIsDialogOpen(false);
        } catch (error) {
             console.error("Error adding content: ", error);
            toast({ variant: "destructive", title: "Failed to add content" });
        }
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
                {!authLoading && isAdmin && (
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

            {loading ? <Loader2 className="animate-spin" /> : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        {selectedModule && (
                          <>
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
                          </>
                        )}
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
                                                    selectedModule?.id === module.id
                                                        ? "bg-primary/10 text-primary"
                                                        : "hover:bg-muted/50"
                                                )}
                                            >
                                                <PlayCircle className={cn("h-6 w-6 mt-1 shrink-0", selectedModule?.id === module.id ? "text-primary" : "text-muted-foreground")} />
                                                <div>
                                                    <h3 className="font-semibold">{module.title}</h3>
                                                    <p className={cn("text-sm", selectedModule?.id === module.id ? "text-primary/80" : "text-muted-foreground")}>
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
                                {...(article.image['data-ai-hint'] && { 'data-ai-hint': article.image['data-ai-hint'] })}
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
              </>
            )}
        </div>
    );
}
