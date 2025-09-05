
'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { PlayCircle, BookOpen } from "lucide-react";

// Array of educational modules with titles, content, and corresponding YouTube video URLs
const educationalModules = [
  {
    id: "handwashing",
    title: "The 5 Steps of Proper Handwashing",
    category: "Hygiene",
    content: "Handwashing is your first line of defense against many illnesses. Following these five simple steps—wet, lather, scrub, rinse, and dry—can prevent the spread of germs and keep you and your community healthy.",
    videoUrl: "https://www.youtube.com/embed/e1-n3yG4-pU" 
  },
  {
    id: "water_treatment",
    title: "How to Make Water Safe for Drinking",
    category: "Water Safety",
    content: "If you're unsure about your water's safety, treat it first. The most reliable method is to bring water to a rolling boil for at least one full minute. If boiling isn't possible, use purification tablets from your kit as instructed.",
    videoUrl: "https://www.youtube.com/embed/G8TXjcCJda8"
  },
  {
    id: "iot_monitor",
    title: "Using the IoT Water Quality Monitor",
    category: "Kit Guide",
    content: "The IoT monitor provides real-time data on your water's safety. Simply place the sensor into the water source, and the results will be sent to your Jal Jeevan app, giving you instant insights and alerts.",
    videoUrl: "https://www.youtube.com/embed/3n2-p4kY8a0" 
  },
  {
    id: "test_strips",
    title: "How to Use Manual Test Strips",
    category: "Kit Guide",
    content: "Manual test strips are a quick way to check for contaminants. Dip a strip into a water sample, wait for the indicated time, and compare the color on the strip to the chart on the container to read the results.",
    videoUrl: "https://www.youtube.com/embed/Fw5h22aJg0I"
  },
  {
    id: "cholera",
    title: "Recognizing and Preventing Cholera",
    category: "Disease Info",
    content: "Cholera is a severe diarrheal disease caused by contaminated food or water. Key symptoms include severe watery diarrhea ('rice-water stool') and vomiting. Prevention is key: always use safe water and wash hands frequently.",
    videoUrl: "https://www.youtube.com/embed/jG1VNS-P5b8"
  },
  {
    id: "typhoid",
    title: "Understanding Typhoid Fever",
    category: "Disease Info",
    content: "Typhoid is a bacterial infection spread through contaminated food and water. Symptoms include high fever, headache, stomach pain, and constipation or diarrhea. Vaccination and safe hygiene practices are the best prevention.",
    videoUrl: "https://www.youtube.com/embed/f_tq0q1A7ic"
  },
  {
    id: "dysentery",
    title: "What is Dysentery?",
    category: "Disease Info",
    content: "Dysentery is an intestinal inflammation that causes bloody diarrhea. It is often spread through poor hygiene. The most critical treatment is rehydration, and handwashing with soap is the most important preventive measure.",
    videoUrl: "https://www.youtube.com/embed/kpe4a_2W_xM"
  },
  {
    id: "food_safety",
    title: "The 4 Core Rules of Food Safety",
    category: "General Health",
    content: "Prevent foodborne illness by following four key principles: Clean, Separate, Cook, and Chill. These steps help prevent the spread of harmful bacteria in your kitchen and ensure your food is safe to eat.",
    videoUrl: "https://www.youtube.com/embed/9T5z8P43b-A"
  },
  {
    id: "sanitation",
    title: "Safe Sanitation Practices",
    category: "General Health",
    content: "Proper disposal of human waste is critical to preventing the spread of waterborne diseases. Always use latrines or designated toilet facilities, and keep them clean to protect your community's water sources.",
    videoUrl: "https://www.youtube.com/embed/P-30b8i36w4"
  },
  {
    id: "first_aid",
    title: "Using Your First-Aid Supplies",
    category: "Kit Guide",
    content: "Your kit includes supplies for treating minor cuts and scrapes. Clean any wound thoroughly with safe water and an antiseptic wipe before applying a bandage to prevent infection, which is especially important during monsoon season.",
    videoUrl: "https://www.youtube.com/embed/EaJmzB8YgS4"
  }
];


export default function EducationPage() {
    const [selectedModule, setSelectedModule] = useState(educationalModules[0]);

    return (
        <div className="space-y-8">
            <Card className="border-0 shadow-none bg-transparent">
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
        </div>
    );
}
