import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import Image from "next/image";

const educationalModules = [
  {
    id: "handwashing",
    title: "The 5 Steps of Proper Handwashing",
    content: "Handwashing is your first line of defense against many illnesses. Following these five simple steps can prevent the spread of germs and keep you and your community healthy. This should be done before eating, after using the toilet, and after coughing or sneezing.",
    image: {
      src: "https://picsum.photos/600/400",
      alt: "A person washing their hands with soap and water under a faucet.",
      hint: "hand washing"
    },
    videoUrl: "https://www.youtube.com/embed/e_y7n_fESnE" 
  },
  {
    id: "water_treatment",
    title: "How to Make Water Safe for Drinking",
    content: "Contaminated water can carry diseases like cholera, typhoid, and dysentery. If you're unsure about your water's safety, treat it first. The most reliable method is to bring water to a rolling boil for at least one full minute. If boiling isn't possible, use a water filter certified to remove pathogens or add a disinfectant like chlorine bleach as per instructions.",
    image: {
      src: "https://picsum.photos/600/400",
      alt: "A pot of water boiling vigorously on a gas stove.",
      hint: "boiling water"
    },
    videoUrl: "https://www.youtube.com/embed/h9-rhNwF_U4"
  },
  {
    id: "food_safety",
    title: "The 4 Core Rules of Food Safety",
    content: "Prevent foodborne illness by following four key principles: Clean, Separate, Cook, and Chill. Clean your hands, surfaces, and produce. Separate raw meats from other foods to avoid cross-contamination. Cook foods to the correct internal temperature to kill harmful bacteria. Chill leftovers and perishables promptly.",
    image: {
      src: "https://picsum.photos/600/400",
      alt: "A person carefully chopping fresh vegetables on a clean cutting board.",
      hint: "food preparation"
    },
    videoUrl: "https://www.youtube.com/embed/8yY-Ua-p-z4"
  },
  {
    id: "cholera_prevention",
    title: "Recognizing and Preventing Cholera",
    content: "Cholera is a severe diarrheal disease caused by ingesting contaminated food or water. Key symptoms include severe watery diarrhea (often called 'rice-water stool'), vomiting, and rapid dehydration. Prevention is key: always use safe water, practice good sanitation by using latrines, and wash hands frequently with soap.",
    image: {
      src: "https://picsum.photos/600/400",
      alt: "A public health worker providing oral rehydration solution to a patient.",
      hint: "health worker"
    },
    videoUrl: "https://www.youtube.com/embed/L-Ac-sZ12XU"
  },
];

export default function EducationPage() {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-4">
          <BookOpen className="w-8 h-8 text-primary" />
          <div>
            <CardTitle className="font-headline text-3xl">Educational Resources</CardTitle>
            <CardDescription className="text-base">
              Learn essential hygiene practices and disease prevention strategies. This content is available offline.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {educationalModules.map((module) => (
            <AccordionItem key={module.id} value={module.id}>
              <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                {module.title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-6 pt-4">
                  <p className="text-base leading-relaxed">{module.content}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <div className="overflow-hidden rounded-lg shadow-md">
                      <Image
                        src={module.image.src}
                        alt={module.image.alt}
                        data-ai-hint={module.image.hint}
                        width={600}
                        height={400}
                        className="object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <div className="aspect-video overflow-hidden rounded-lg shadow-md">
                       <iframe
                          className="w-full h-full"
                          src={module.videoUrl}
                          title={`YouTube video for ${module.title}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
