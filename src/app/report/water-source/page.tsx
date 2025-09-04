import { WaterSourceReportForm } from '@/components/water-source-report-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ReportWaterSourcePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Report Water Source</CardTitle>
        <CardDescription>
          Submit details about a water source. Your report helps in monitoring water quality and safety.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <WaterSourceReportForm />
      </CardContent>
    </Card>
  );
}
