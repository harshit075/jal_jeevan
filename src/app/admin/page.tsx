
'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Map, BarChart, ShieldAlert, CalendarClock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

const states = ["Arunachal Pradesh", "Assam", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Sikkim", "Tripura"];

const highRiskHotspots = [
  { village: "Rampur", district: "Kamrup", state: "Assam", risk: "High", reports: 42, position: { lat: 26.1445, lng: 91.7362 } },
  { village: "Sitapur", district: "West Siang", state: "Arunachal Pradesh", risk: "High", reports: 28, position: { lat: 28.23, lng: 94.86 } },
  { village: "Gopalganj", district: "Bishnupur", state: "Manipur", risk: "Medium", reports: 15, position: { lat: 24.66, lng: 93.84 } },
  { village: "Madhupur", district: "East Khasi Hills", state: "Meghalaya", risk: "High", reports: 35, position: { lat: 25.57, lng: 91.88 } },
  { village: "Aizawl", district: "Aizawl", state: "Mizoram", risk: "Low", reports: 5, position: { lat: 23.73, lng: 92.72 } },
  { village: "Kohima", district: "Kohima", state: "Nagaland", risk: "Medium", reports: 12, position: { lat: 25.66, lng: 94.10 } },
];

export default function AdminPage() {
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");

  const highRiskCount = highRiskHotspots.filter(h => h.risk === 'High').length;
  
  const reportsByDistrict = highRiskHotspots.reduce((acc, curr) => {
    acc[curr.district] = (acc[curr.district] || 0) + curr.reports;
    return acc;
  }, {} as Record<string, number>);

  const mostAffectedDistrict = Object.keys(reportsByDistrict).reduce((a, b) => reportsByDistrict[a] > reportsByDistrict[b] ? a : b);
  const mostAffectedState = highRiskHotspots.find(h => h.district === mostAffectedDistrict)?.state || "";
  
  const totalReports = highRiskHotspots.reduce((sum, item) => sum + item.reports, 0);

  const handleDownload = () => {
    const headers = ["village", "district", "state", "risk", "reports"];
    const csvContent = [
      headers.join(','),
      ...highRiskHotspots.map(row => headers.map(header => row[header as keyof typeof row]).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.href) {
      URL.revokeObjectURL(link.href);
    }
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'high-risk-hotspots.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage reports and monitor community health data across Northeast India.</p>
      </div>

       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="transition-transform hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High-Risk Areas</CardTitle>
            <ShieldAlert className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{highRiskCount}</div>
            <p className="text-xs text-muted-foreground">Villages with active advisories</p>
          </CardContent>
        </Card>
        <Card className="transition-transform hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Affected District</CardTitle>
            <Map className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mostAffectedDistrict}, {mostAffectedState}</div>
            <p className="text-xs text-muted-foreground">Highest number of reports</p>
          </CardContent>
        </Card>
         <Card className="transition-transform hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports (All Time)</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReports}</div>
            <p className="text-xs text-muted-foreground">From high-risk areas</p>
          </CardContent>
        </Card>
        <Card className="transition-transform hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Update</CardTitle>
            <CalendarClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Live Data</div>
            <p className="text-xs text-muted-foreground">Updated on page load</p>
          </CardContent>
        </Card>
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Regional Risk Map of Northeast India</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="aspect-video w-full bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                 <Image src="https://www.q-files.com/media/article/3024/467ffe22-2ebc-4a9f-b709-460ceee7f3b9.jpg" alt="Map of Northeast India" width={1200} height={800} data-ai-hint="satellite map" className="object-cover w-full h-full" />
             </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Download Reports</CardTitle>
            <CardDescription>
              Filter by region to download reports.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
              <div>
                  <label className="text-sm font-medium">State</label>
                  <Select onValueChange={setSelectedState} value={selectedState}>
                      <SelectTrigger>
                          <SelectValue placeholder="Select a State" />
                      </SelectTrigger>
                      <SelectContent>
                          {states.map(state => <SelectItem key={state} value={state}>{state}</SelectItem>)}
                      </SelectContent>
                  </Select>
              </div>
               <div>
                  <label className="text-sm font-medium">District</label>
                  <Select onValueChange={setSelectedDistrict} value={selectedDistrict} disabled={!selectedState}>
                      <SelectTrigger>
                          <SelectValue placeholder="Select a District" />
                      </SelectTrigger>
                       <SelectContent>
                          {/* This would be dynamically populated based on selectedState */}
                          <SelectItem value="kamrup">Kamrup</SelectItem>
                          <SelectItem value="west-siang">West Siang</SelectItem>
                          <SelectItem value="bishnupur">Bishnupur</SelectItem>
                          <SelectItem value="east-khasi-hills">East Khasi Hills</SelectItem>
                      </SelectContent>
                  </Select>
              </div>
               <div>
                  <label className="text-sm font-medium">Ward</label>
                   <Select onValueChange={setSelectedWard} value={selectedWard} disabled={!selectedDistrict}>
                      <SelectTrigger>
                          <SelectValue placeholder="Select a Ward" />
                      </SelectTrigger>
                       <SelectContent>
                          {/* This would be dynamically populated based on selectedDistrict */}
                          <SelectItem value="ward1">Ward 1</SelectItem>
                          <SelectItem value="ward2">Ward 2</SelectItem>
                          <SelectItem value="ward3">Ward 3</SelectItem>
                      </SelectContent>
                  </Select>
              </div>
              <Button className="w-full" onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" />
                  Download CSV
              </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>High-Risk Hotspots</CardTitle>
          <CardDescription>
            Villages and areas with the highest risk levels based on recent reports.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted/50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Village
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      District
                    </th>
                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      State
                    </th>
                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Risk Level
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Report Count
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Details</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {highRiskHotspots.map((item) => (
                    <tr key={item.village} className="transition-colors hover:bg-muted/50">
                      <td className="whitespace-nowrap px-6 py-4 font-medium text-foreground">{item.village}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-muted-foreground">{item.district}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-muted-foreground">{item.state}</td>
                       <td className="whitespace-nowrap px-6 py-4">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.risk === 'High' ? 'bg-red-100 text-red-800' : 
                          item.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {item.risk}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-muted-foreground">{item.reports}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
