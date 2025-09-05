

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, TestTube, PlusSquare, ShieldCheck, HelpCircle, FileText, Heart } from "lucide-react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


const kits = [
  {
    name: "Jal Suraksha Kit",
    price: "499",
    description: "Comprehensive water and health monitoring solution.",
    image: { src: "/images/kit-suraksha.jpg", alt: "Complete water and health monitoring kit" },
    contents: [
      { name: "IoT Water Quality Monitor", icon: Package },
      { name: "Manual Water Test Strips", icon: TestTube },
      { name: "Water Purification Tablets", icon: ShieldCheck },
      { name: "Basic First-Aid Supplies", icon: PlusSquare },
    ]
  },
  {
    name: "Swasthya Rakshak Kit",
    price: "249",
    description: "Essential first-aid and water purification supplies.",
    image: { src: "/images/kit-rakshak.jpg", alt: "First-aid and water purification supplies" },
    contents: [
      { name: "Basic First-Aid Supplies", icon: PlusSquare },
      { name: "Water Purification Tablets", icon: ShieldCheck },
    ]
  },
  {
    name: "Jal Parikshan Kit",
    price: "99",
    description: "Quick and easy manual water testing.",
    image: { src: "/images/kit-parikshan.jpg", alt: "Pack of manual water testing strips" },
    contents: [
      { name: "Manual Water Test Strips (50 pack)", icon: TestTube },
    ]
  }
];

const manualSections = [
  {
    id: "benefits",
    title: "Why Own a Health & Water Kit?",
    icon: Heart,
    content: "In areas prone to water contamination, especially during monsoons, having a Jal Jeevan kit is a crucial step towards proactive health management. Our kits empower you to monitor your drinking water, purify it when necessary, and handle minor health issues promptly, preventing the spread of waterborne diseases and ensuring your family's well-being."
  },
  {
    id: "iot_monitor",
    title: "Using the IoT Water Quality Monitor",
    icon: Package,
    content: "The IoT monitor provides real-time data on your water's safety. Simply place the sensor end into the water source. The device will automatically analyze parameters like pH, turbidity, and temperature. The results will be sent to your Jal Jeevan app, giving you instant insights and alerts if any parameter falls outside the safe range."
  },
  {
    id: "test_strips",
    title: "How to Use Manual Test Strips",
    icon: TestTube,
    content: "Manual test strips are a quick, effective way to check for common contaminants. Dip a strip into a water sample for the time specified on the packaging (usually 1-2 seconds). Remove it without shaking off excess water, and wait for the indicated time (typically 30-60 seconds). Compare the color on the strip to the chart on the container to read the results for bacteria, pH, chlorine, and hardness."
  },
  {
    id: "first_aid",
    title: "First-Aid & Purification Tablets",
    icon: PlusSquare,
    content: "The first-aid supplies are for treating minor cuts and scrapes to prevent infection. Clean any wound before applying a bandage. The water purification tablets are a lifesaver when you can't boil water. Drop one tablet into a specified amount of water (check the packaging), and wait for at least 30 minutes before drinking to ensure harmful bacteria and viruses are neutralized."
  }
];

export default function KitPage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Jal Jeevan Kits</h1>
        <p className="text-muted-foreground">Your complete solution for water safety and community health. All prices are in INR.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {kits.map((kit) => (
            <Card key={kit.name} className="flex flex-col overflow-hidden shadow-lg transition-shadow hover:shadow-xl">
                <div className="relative h-56 w-full">
                    <Image
                        src={kit.image.src}
                        alt={kit.image.alt}
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">{kit.name}</CardTitle>
                    <CardDescription>{kit.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                    <div className="space-y-3 flex-grow">
                        <h3 className="text-sm font-semibold uppercase text-muted-foreground">What's Inside:</h3>
                        <ul className="space-y-2">
                            {kit.contents.map((item, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <item.icon className="h-5 w-5 text-primary" />
                                    <span>{item.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-6 text-center">
                        <div className="text-4xl font-bold font-headline mb-4">₹{kit.price}</div>
                        <Button size="lg" className="w-full transition-transform hover:scale-105">
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            Buy Now
                        </Button>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>

      <Card className="mt-12 shadow-lg transition-shadow hover:shadow-xl">
        <CardHeader>
           <div className="flex items-center gap-4">
              <FileText className="w-8 h-8 text-primary" />
              <div>
                <CardTitle className="font-headline text-3xl">Your Guide to Using the Kits</CardTitle>
                <CardDescription className="text-base">
                  Learn the benefits and how to use each component effectively to safeguard your family's health.
                </CardDescription>
              </div>
            </div>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {manualSections.map((section) => (
              <AccordionItem key={section.id} value={section.id}>
                <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                  <div className="flex items-center gap-3">
                    <section.icon className="h-6 w-6 text-primary/80" />
                    {section.title}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-base leading-relaxed">
                  {section.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
