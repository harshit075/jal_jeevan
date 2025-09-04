import { GenerateAdvisoryForm } from "@/components/generate-advisory-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function GenerateAdvisoryPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Generate New Advisory</CardTitle>
        <CardDescription>
          Use the AI-powered tool to generate a public health advisory. Enter the known data about symptoms, water sources, and location, and the AI will draft a clear and actionable advisory.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <GenerateAdvisoryForm />
      </CardContent>
    </Card>
  );
}
