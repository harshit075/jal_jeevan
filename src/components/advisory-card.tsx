import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, MapPin, Siren, AlertTriangle } from 'lucide-react';
import type { Advisory } from '@/lib/types';

interface AdvisoryCardProps {
  advisory: Advisory;
}

export function AdvisoryCard({ advisory }: AdvisoryCardProps) {
  const isWarning = advisory.advisoryTitle.toLowerCase().includes('warning') || advisory.advisoryTitle.toLowerCase().includes('outbreak');
  
  return (
    <Card className={isWarning ? "border-destructive/50" : ""}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
             {isWarning ? <AlertTriangle className="h-6 w-6 text-destructive" /> : <Siren className="h-6 w-6 text-primary" />}
            <CardTitle className="font-headline text-xl">{advisory.advisoryTitle}</CardTitle>
          </div>
          {isWarning && <Badge variant="destructive">Urgent</Badge>}
        </div>
        <CardDescription>{advisory.advisorySummary}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Separator />
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <strong>Affected Area:</strong>
          <span>{advisory.affectedArea}</span>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Recommended Actions:</h3>
          <ul className="space-y-2">
            {advisory.recommendedActions.map((action, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-green-600 shrink-0" />
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
