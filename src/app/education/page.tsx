import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const educationalModules = [
  {
    id: "handwashing",
    title: "The 5 Steps of Handwashing",
    content: "Proper handwashing is one of the most effective ways to prevent the spread of germs. Follow these five steps every time: Wet your hands with clean, running water. Lather your hands by rubbing them together with soap. Scrub your hands for at least 20 seconds. Rinse your hands well under clean, running water. Dry your hands using a clean towel or air dry them.",
    image: {
      src: "https://picsum.photos/600/400",
      alt: "A person washing their hands with soap and water.",
      hint: "hand washing"
    }
  },
  {
    id: "water_treatment",
    title: "How to Make Water Safe for Drinking",
    content: "If you are unsure about the safety of your tap water, you can make it safe by boiling, using disinfectants, or filtering. Boiling is the most effective method; bring water to a rolling boil for at least one minute. If you can't boil water, use household bleach or water purification tablets as directed. A portable water filter can also remove bacteria and protozoa.",
    image: {
      src: "https://picsum.photos/600/400",
      alt: "A pot of water boiling on a stove.",
      hint: "boiling water"
    }
  },
  {
    id: "food_safety",
    title: "Basic Food Safety Rules",
    content: "Prevent foodborne illness with four simple steps: Clean, Separate, Cook, and Chill. Clean your hands, surfaces, and produce. Separate raw meats from other foods to prevent cross-contamination. Cook to the right temperature to kill harmful bacteria. Chill leftovers and other refrigerated foods promptly.",
    image: {
      src: "https://picsum.photos/600/400",
      alt: "A person chopping fresh vegetables on a clean cutting board.",
      hint: "food preparation"
    }
  },
  {
    id: "cholera_prevention",
    title: "Recognizing and Preventing Cholera",
    content: "Cholera is an acute diarrhoeal disease that can kill within hours if left untreated. It is caused by ingesting contaminated food or water. Symptoms include severe watery diarrhea, vomiting, and leg cramps. Prevention focuses on ensuring access to safe drinking water, proper sanitation, and basic hygiene practices.",
    image: {
      src: "https://picsum.photos/600/400",
      alt: "A diagram showing the transmission cycle of cholera.",
      hint: "health diagram"
    }
  },
];

export default function EducationPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Educational Modules</CardTitle>
        <CardDescription>
          Learn essential hygiene practices and disease prevention strategies. This content is available offline.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {educationalModules.map((module) => (
            <AccordionItem key={module.id} value={module.id}>
              <AccordionTrigger className="text-lg">{module.title}</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="leading-relaxed">{module.content}</p>
                  <div className="overflow-hidden rounded-lg">
                    <Image
                      src={module.image.src}
                      alt={module.image.alt}
                      data-ai-hint={module.image.hint}
                      width={600}
                      height={400}
                      className="object-cover transition-transform hover:scale-105"
                    />
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
