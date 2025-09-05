
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

// Array of educational modules with titles, content, and corresponding YouTube video URLs
const initialEducationalModules = [
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
    category: "General Health",
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

const initialEducationalArticles = [
  {
    id: "what-are-waterborne-diseases",
    title: "A Deep Dive into Waterborne Diseases",
    category: "Disease Info",
    image: { src: "https://watershopbd.com/assets/uploads/media-uploader/decrease-the-risk-of-water-borne-diseases1694253944.jpg", alt: "Microscopic view of water bacteria" },
    content: "Waterborne diseases are illnesses caused by pathogenic microorganisms transmitted through contaminated water. Common examples include cholera, typhoid fever, dysentery, and giardiasis. These diseases spread easily in areas with poor sanitation and unsafe drinking water. Symptoms often include diarrhea, vomiting, and fever. The best prevention is always ensuring your water is from a safe source, or treating it before use through methods like boiling, filtration, or chemical disinfection with tablets. Understanding the risks is the first step toward protecting your family."
  },
  {
    id: "purification-methods-explained",
    title: "Water Purification: Boiling vs. Tablets",
    category: "Water Safety",
    image: { src: "https://blog.romegamart.com/media/uploads/compressed-image_-_2025-05-08T154428.736.jpg", alt: "A pot of water boiling on a stove" },
    content: "When you can't trust your water source, purification is essential. Boiling is the gold standard for killing bacteria, viruses, and parasites. Bring water to a rolling boil for at least one minute (or three minutes at high altitudes). If you cannot boil water, purification tablets are a reliable alternative. They typically use chlorine or iodine to kill microorganisms. It's crucial to follow the instructions on the package, as the required waiting time (usually 30 minutes) is necessary for the chemicals to work effectively. Both methods are great options included in your Jal Jeevan kit."
  },
  {
    id: "hygiene-and-health",
    title: "The Critical Link Between Hygiene and Health",
    category: "General Health",
    image: { src: "https://picsum.photos/600/400", "data-ai-hint": "hand washing", alt: "Hands being washed with soap under running water" },
    content: "Good hygiene is one of the most effective ways to prevent the spread of infectious diseases. This goes beyond just handwashing. It includes safe disposal of waste, keeping cooking areas clean, and protecting food from flies and other pests. Simple actions, like covering your mouth when you cough and washing your hands after using the toilet, create a healthier environment for everyone. During monsoon season, when germs can spread more easily, maintaining high standards of personal and community hygiene is more important than ever."
  },
   {
    id: "safe-food-handling",
    title: "Safe Food Handling in Monsoon Season",
    category: "Food Safety",
    image: { src: "https://lunajaiswal.com/wp-content/uploads/2022/06/MONSOON-FOOD-GUIDE-626x350.png", alt: "Fresh vegetables being washed in a clean kitchen sink" },
    content: "Monsoon season increases the risk of food contamination due to higher humidity and moisture, which helps bacteria grow. Always wash vegetables and fruits thoroughly with safe water. Cook food to the proper temperature and avoid leaving it at room temperature for more than two hours. Keep raw meat separate from other foods to prevent cross-contamination. These simple steps can significantly reduce your risk of foodborne illnesses like E. coli and salmonella."
  },
  {
    id: "community-sanitation",
    title: "Your Role in Community Sanitation",
    category: "Community Action",
    image: { src: "https://media.licdn.com/dms/image/v2/D5612AQEKynT45oJLzA/article-cover_image-shrink_720_1280/B56ZY49pKLH0AI-/0/1744712414377?e=2147483647&v=beta&t=QLrd1EYdd5gBb8Bt766NdwGvl9WEUop_e1jlA-h08Us", alt: "A group of community members cleaning a public space together" },
    content: "Public health is a collective responsibility. Keeping your community clean is just as important as keeping your home clean. Participate in local sanitation drives, ensure waste is disposed of in designated areas, and prevent water from stagnating to control mosquito breeding. By working together, we can prevent the spread of diseases and create a safer environment for everyone. Report any public sanitation issues, like overflowing drains, to local authorities."
  },
  {
    id: "understanding-your-kit",
    title: "Unpacking the Jal Jeevan Kit",
    category: "Kit Guide",
    image: { src: "https://kj1bcdn.b-cdn.net/media/88807/jal-jivan-mission.jpg", alt: "The contents of a Jal Jeevan health kit laid out on a table" },
    content: "Your Jal Jeevan kit is a powerful tool for health protection. It contains several key components: IoT water monitors for real-time quality checks, manual test strips for quick contaminant detection, purification tablets for making water safe, and basic first-aid supplies for minor injuries. Familiarize yourself with each component and how to use it. The video guides provide detailed instructions, but this article serves as a quick reference for everything inside your kit."
  }
];

export type EducationalModule = typeof initialEducationalModules[0];
export type EducationalArticle = typeof initialEducationalArticles[0];

export default function EducationPage() {
    const [educationalModules, setEducationalModules] = useState(initialEducationalModules);
    const [educationalArticles, setEducationalArticles] = useState(initialEducationalArticles);
    const [selectedModule, setSelectedModule] = useState(educationalModules[0]);
    const { role, loading } = useAuth();
    const isAdmin = role === 'admin';
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleAddContent = (content: EducationalModule | EducationalArticle) => {
        if ('videoUrl' in content) {
            setEducationalModules(prev => [...prev, content]);
        } else {
            setEducationalArticles(prev => [...prev, content]);
        }
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
        </div>
    );
}
