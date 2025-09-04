
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Video } from "lucide-react";

const educationalModules = [
  {
    id: "handwashing",
    title: "Step 1: The 5 Steps of Proper Handwashing",
    content: "Handwashing is your first line of defense against many illnesses. Following these five simple steps—wet, lather, scrub, rinse, and dry—can prevent the spread of germs and keep you and your community healthy.",
    videoUrl: "https://www.youtube.com/embed/e_y7n_fESnE" 
  },
  {
    id: "water_treatment",
    title: "Step 2: How to Make Water Safe for Drinking",
    content: "If you're unsure about your water's safety, treat it first. The most reliable method is to bring water to a rolling boil for at least one full minute. If boiling isn't possible, use purification tablets from your kit as instructed.",
    videoUrl: "https://www.youtube.com/embed/h9-rhNwF_U4"
  },
  {
    id: "iot_monitor",
    title: "Kit Guide: Using the IoT Water Quality Monitor",
    content: "The IoT monitor provides real-time data on your water's safety. Simply place the sensor into the water source, and the results will be sent to your Jal Jeevan app, giving you instant insights and alerts.",
    videoUrl: "https://www.youtube.com/embed/9CyZ3-qdyq0" 
  },
  {
    id: "test_strips",
    title: "Kit Guide: How to Use Manual Test Strips",
    content: "Manual test strips are a quick way to check for contaminants. Dip a strip into a water sample, wait for the indicated time, and compare the color on the strip to the chart on the container to read the results.",
    videoUrl: "https://www.youtube.com/embed/n0IIz-i8-4k"
  },
  {
    id: "cholera",
    title: "Disease Info: Recognizing and Preventing Cholera",
    content: "Cholera is a severe diarrheal disease caused by contaminated food or water. Key symptoms include severe watery diarrhea ('rice-water stool') and vomiting. Prevention is key: always use safe water and wash hands frequently.",
    videoUrl: "https://www.youtube.com/embed/L-Ac-sZ12XU"
  },
   {
    id: "typhoid",
    title: "Disease Info: Understanding Typhoid Fever",
    content: "Typhoid is a bacterial infection spread through contaminated food and water. Symptoms include high fever, headache, stomach pain, and constipation or diarrhea. Vaccination and safe hygiene practices are the best prevention.",
    videoUrl: "https://www.youtube.com/embed/n0-IZd2BG44"
  },
  {
    id: "dysentery",
    title: "Disease Info: What is Dysentery?",
    content: "Dysentery is an intestinal inflammation that causes bloody diarrhea. It is often spread through poor hygiene. The most critical treatment is rehydration, and handwashing with soap is the most important preventive measure.",
    videoUrl: "https://www.youtube.com/embed/1-yD0p_iA94"
  },
  {
    id: "food_safety",
    title: "General Health: The 4 Core Rules of Food Safety",
    content: "Prevent foodborne illness by following four key principles: Clean, Separate, Cook, and Chill. These steps help prevent the spread of harmful bacteria in your kitchen and ensure your food is safe to eat.",
    videoUrl: "https://www.youtube.com/embed/8yY-Ua-p-z4"
  },
  {
    id: "sanitation",
    title: "General Health: Safe Sanitation Practices",
    content: "Proper disposal of human waste is critical to preventing the spread of waterborne diseases. Always use latrines or designated toilet facilities, and keep them clean to protect your community's water sources.",
    videoUrl: "https://www.youtube.com/embed/1ye0_e4O6Yc"
  },
  {
    id: "first_aid",
    title: "Kit Guide: Using Your First-Aid Supplies",
    content: "Your kit includes supplies for treating minor cuts and scrapes. Clean any wound thoroughly with safe water and an antiseptic wipe before applying a bandage to prevent infection, which is especially important during monsoon season.",
    videoUrl: "https://www.youtube.com/embed/I4i2sA56Fpg"
  }
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
              Learn essential hygiene practices, disease prevention strategies, and how to use your Jal Jeevan kit.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {educationalModules.map((module) => (
            <AccordionItem key={module.id} value={module.id}>
              <AccordionTrigger className="text-xl font-semibold hover:no-underline text-left">
                {module.title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-6 pt-4">
                  <p className="text-base leading-relaxed">{module.content}</p>
                  <div className="aspect-video overflow-hidden rounded-lg shadow-md border">
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
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
