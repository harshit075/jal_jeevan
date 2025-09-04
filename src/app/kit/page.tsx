
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Package, ShoppingCart, TestTube, Thermometer } from "lucide-react";
import Image from "next/image";

const kitContents = [
  { name: "IoT Water Quality Monitor", icon: Package },
  { name: "Basic First-Aid Medicines", icon: Thermometer },
  { name: "Manual Water Test Strips", icon: TestTube },
];

export default function KitPage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Jal Jeevan Kit</h1>
        <p className="text-muted-foreground">Your complete solution for water safety and community health.</p>
      </div>

      <Card className="overflow-hidden shadow-lg transition-shadow hover:shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative h-64 md:h-full">
                 <Image
                    src="https://picsum.photos/600/800"
                    alt="Jal Jeevan Medical and Water Testing Kit"
                    fill
                    style={{ objectFit: 'cover' }}
                    data-ai-hint="medical kit water testing"
                    />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            <div className="p-8">
                <CardHeader className="p-0">
                    <CardTitle className="font-headline text-2xl">Complete Health & Water Monitoring Kit</CardTitle>
                    <CardDescription className="pt-2">
                        Empower your community with the tools to monitor water quality and manage basic health needs. This all-in-one kit is designed for easy use and reliable results.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-0 pt-6">
                    <div className="space-y-4">
                        <h3 className="font-semibold">What's Inside:</h3>
                        <ul className="space-y-3">
                            {kitContents.map((item, index) => (
                            <li key={index} className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <span>{item.name}</span>
                            </li>
                            ))}
                        </ul>

                         <div className="pt-4 text-center">
                             <div className="text-4xl font-bold font-headline mb-4">$49.99</div>
                             <Button size="lg" className="w-full transition-transform hover:scale-105">
                                <ShoppingCart className="mr-2 h-5 w-5" />
                                Buy Now
                             </Button>
                         </div>
                    </div>
                </CardContent>
            </div>
        </div>
      </Card>
    </div>
  );
}
