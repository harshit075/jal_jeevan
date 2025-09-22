
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, MapPin, Siren, AlertTriangle, Info } from 'lucide-react';
import type { Advisory } from '@/lib/types';
import { cn } from '@/lib/utils';

interface AdvisoryCardProps {
  advisory: Advisory;
}

export function AdvisoryCard({ advisory }: AdvisoryCardProps) {
  const isHighRisk = advisory.riskLevel === 'High';
  const isMediumRisk = advisory.riskLevel === 'Medium';

  const riskStyles = {
    High: {
      border: 'border-destructive/50',
      bg: 'bg-destructive/5',
      icon: <AlertTriangle className="h-8 w-8 text-destructive shrink-0" />,
      badge: <Badge variant="destructive">Urgent</Badge>
    },
    Medium: {
      border: 'border-yellow-500/50',
      bg: 'bg-yellow-500/5',
      icon: <Siren className="h-8 w-8 text-yellow-500 shrink-0" />,
      badge: <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-700 border-yellow-500/20">Warning</Badge>
    },
    Low: {
      border: 'border-border',
      bg: 'bg-card',
      icon: <Info className="h-8 w-8 text-primary shrink-0" />,
      badge: null
    }
  }

  const styles = riskStyles[advisory.riskLevel] || riskStyles.Low;
  
  return (
    <Card className={cn(
      "flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
      styles.border,
      styles.bg
    )}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
             {styles.icon}
            <CardTitle className="font-headline text-xl leading-tight">{advisory.advisoryTitle}</CardTitle>
          </div>
          {styles.badge}
        </div>
        <CardDescription className="pt-2">{advisory.advisorySummary}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex flex-col flex-grow">
        <Separator />
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0" />
          <strong>Affected Area:</strong>
          <span>{advisory.affectedArea}</span>
        </div>
        <div className="flex-grow">
          <h3 className="font-semibold mb-3">Recommended Actions:</h3>
          <ul className="space-y-2">
            {advisory.recommendedActions.map((action, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 mt-0.5 text-green-600 shrink-0" />
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
