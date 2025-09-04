
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Users, BarChart, Siren } from "lucide-react";

const reportData = [
  { village: "Rampur", reports: 42, type: "Water Quality" },
  { village: "Sitapur", reports: 28, type: "Symptom" },
  { village: "Gopalganj", reports: 15, type: "Water Quality" },
  { village: "Madhupur", reports: 35, type: "Symptom" },
];

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage reports and monitor community health data.</p>
      </div>

       <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="transition-transform hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card className="transition-transform hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Villages</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Reporting data this week</p>
          </CardContent>
        </Card>
         <Card className="transition-transform hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Actions</CardTitle>
            <Siren className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Advisories to review</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Download Reports by Village</CardTitle>
          <CardDescription>
            Select a village to download all submitted reports in CSV format.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* For larger screens: Table view */}
          <div className="hidden md:block">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted/50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Village
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Report Count
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Download</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {reportData.map((item) => (
                    <tr key={item.village} className="transition-colors hover:bg-muted/50">
                      <td className="whitespace-nowrap px-6 py-4 font-medium text-foreground">{item.village}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-muted-foreground">{item.reports}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download CSV
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* For smaller screens: Card view */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {reportData.map((item) => (
               <Card key={item.village} className="transition-shadow hover:shadow-md">
                 <CardContent className="flex items-center justify-between p-4">
                   <div>
                     <p className="font-semibold">{item.village}</p>
                     <p className="text-sm text-muted-foreground">{item.reports} reports</p>
                   </div>
                   <Button variant="outline" size="sm">
                     <Download className="mr-2 h-4 w-4" />
                     CSV
                   </Button>
                 </CardContent>
               </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
