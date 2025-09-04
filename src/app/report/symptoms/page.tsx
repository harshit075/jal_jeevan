import { SymptomReportForm } from '@/components/symptom-report-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ReportSymptomsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Report Symptoms</CardTitle>
        <CardDescription>
          Fill out the form below to report health symptoms. This information is crucial for early outbreak detection.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SymptomReportForm />
      </CardContent>
    </Card>
  );
}
