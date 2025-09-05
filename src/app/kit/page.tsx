
'use client';
import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ShoppingCart, TestTube, PlusSquare, ShieldCheck, Heart, FileText, PlusCircle, HeartPulse, Building } from 'lucide-react';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

type KitContent = {
    name: string;
};

type Kit = {
    id: string;
    name: string;
    price: string;
    description: string;
    image: { src: string, alt: string, 'data-ai-hint'?: string };
    contents: KitContent[];
};

const kits: Kit[] = [
    {
        id: "kit-1",
        name: "Asha Worker Kit",
        price: "1499",
        description: "A comprehensive kit designed for community health workers to monitor multiple water sources and serve larger groups.",
        image: { src: '/images/hero-kit.jpeg', alt: "A basic first aid kit.", "data-ai-hint": "first aid kit" },
        contents: [
            { name: "IoT Water Quality Monitor" },
            { name: "Manual Water Test Strips" },
            { name: "Water Purification Tablets" },
            { name: "Basic First-Aid Supplies" },
        ]
    },
    {
        id: "kit-2",
        name: "Swasthya Kit",
        price: "899",
        description: "An essential starter kit for every household to monitor water quality and manage basic health needs.",
        image: { src: '/images/kit-rakshak.jpg', alt: "A larger community health kit.", "data-ai-hint": "community health kit" },
        contents: [
            
            { name: "Manual Water Test Strips (100 pack)" },
            { name: "Water Purification Tablets" },
            { name: "First-Aid Supplies" },
        ]
    },
    {
        id: "kit-3",
        name: "Parikshan Health Kit",
        price: "999",
        description: "An expanded kit for families, providing more supplies for health monitoring and emergency preparedness.",
        image: { src: '/images/kit-parikshan.jpg', alt: "A family sized first aid and health kit.", "data-ai-hint": "family first aid" },
        contents: [
            
            { name: "Manual Water Test Strips (50 pack)" },
            { name: "Water Purification Tablets" },
            { name: "Basic First-Aid Supplies" },
        ]
    }
];

const manualSections = [
    {
        id: "benefits",
        title: "Why Own a Health & Water Kit?",
        icon: Heart,
        content: "In areas prone to water contamination, having a Jal Jeevan kit is a crucial step towards proactive health management. It empowers you to monitor drinking water, purify it when necessary, and handle minor health issues promptly, preventing the spread of disease and ensuring your family's well-being."
    },
    {
        id: "iot_monitor",
        title: "Using the IoT Water Quality Monitor",
        icon: Package,
        content: "The IoT monitor provides real-time data on your water's safety. Follow these steps:\n1. **Activate:** Ensure the device is charged and powered on.\n2. **Submerge:** Place the sensor end fully into the water source you want to test.\n3. **Analyze:** The device will automatically analyze parameters like pH, turbidity, and temperature.\n4. **Sync:** Results are sent to your Jal Jeevan app, providing instant insights and alerts if any parameter is unsafe."
    },
    {
        id: "test_strips",
        title: "How to Use Manual Test Strips",
        icon: TestTube,
        content: "Manual strips are a quick way to check for contaminants:\n1. **Collect Sample:** Use a clean container to get a sample of your water.\n2. **Dip:** Submerge a test strip into the water for the time specified on the packaging (usually 1-2 seconds).\n3. **Wait:** Remove the strip without shaking off excess water and wait for the indicated time (typically 30-60 seconds).\n4. **Compare:** Match the colors on the strip to the chart on the container to read the results for bacteria, pH, chlorine, etc."
    },
    {
        id: "first_aid",
        title: "First-Aid & Purification Tablets",
        icon: PlusSquare,
        content: "**First-Aid:** For minor cuts, clean the wound with an antiseptic wipe, then apply a bandage to prevent infection.\n\n**Purification Tablets:** When you can't boil water, drop one tablet into the specified amount of water (check the packaging). Wait at least 30 minutes before drinking to ensure harmful bacteria and viruses are neutralized."
    }
];

// Lucide icon mapping
const iconMap: { [key: string]: React.ElementType } = {
    "IoT Water Quality Monitor": Package,
    "Manual Water Test Strips": TestTube,
    "Manual Water Test Strips (50 pack)": TestTube,
    "Water Purification Tablets": ShieldCheck,
    "Basic First-Aid Supplies": PlusSquare,
};


export default function KitPage() {
  const { role, loading: authLoading } = useAuth();
  const isAdmin = role === 'admin';
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useState(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  });

  return (
    <div className="space-y-8">
       <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">Jal Jeevan Kits</h1>
          <p className="text-muted-foreground">Your complete solution for water safety and community health. All prices are in INR.</p>
        </div>
        {!authLoading && isAdmin && (
          <Button className="transition-transform hover:scale-105">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Kit
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {kits.map((kit) => {
            return (
                <Card key={kit.id} className="flex flex-col overflow-hidden shadow-lg transition-shadow hover:shadow-xl">
                    <div className="relative h-56 w-full">
                        <Image
                            src={kit.image.src}
                            alt={kit.image.alt}
                            fill
                            className="object-cover"
                            {...(kit.image['data-ai-hint'] && { 'data-ai-hint': kit.image['data-ai-hint'] })}
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
                                {kit.contents.map((item, index) => {
                                    const IconComponent = iconMap[item.name] || Package;
                                    return (
                                        <li key={index} className="flex items-center gap-3">
                                            <IconComponent className="h-5 w-5 text-primary" />
                                            <span>{item.name}</span>
                                        </li>
                                    )
                                })}
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
            )
        })}
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
                <AccordionContent className="pt-4 text-base leading-relaxed whitespace-pre-line">
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
