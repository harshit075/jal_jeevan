
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, TestTube, PlusSquare, ShieldCheck } from "lucide-react";
import Image from "next/image";

const kits = [
  {
    name: "Jal Suraksha Kit",
    price: "499",
    description: "Comprehensive water and health monitoring solution.",
    image: { src: "https://picsum.photos/400/300", hint: "complete water kit" },
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
    image: { src: "https://picsum.photos/400/300", hint: "first aid water" },
    contents: [
      { name: "Basic First-Aid Supplies", icon: PlusSquare },
      { name: "Water Purification Tablets", icon: ShieldCheck },
    ]
  },
  {
    name: "Jal Parikshan Kit",
    price: "99",
    description: "Quick and easy manual water testing.",
    image: { src: "https://picsum.photos/400/300", hint: "water testing strips" },
    contents: [
      { name: "Manual Water Test Strips (50 pack)", icon: TestTube },
    ]
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
                        alt={`Image of ${kit.name}`}
                        fill
                        style={{ objectFit: 'cover' }}
                        data-ai-hint={kit.image.hint}
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
    </div>
  );
}
