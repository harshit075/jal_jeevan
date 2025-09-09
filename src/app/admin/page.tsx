
'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Map, BarChart, ShieldAlert, CalendarClock, UserPlus, Trash2, Users, Database } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { collection, getDocs, addDoc, deleteDoc, doc, writeBatch, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from '@/hooks/use-toast';
import type { AshaWorker, HighRiskHotspot } from '@/lib/types';
import { mockHighRiskHotspots, mockAshaWorkers, mockAdvisories } from '@/lib/seed-data';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const states = ["Arunachal Pradesh", "Assam", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Sikkim", "Tripura"];

type ReportsByDistrict = {
  [key: string]: number;
}

export default function AdminPage() {
  const { toast } = useToast();
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");
  
  const [highRiskHotspots, setHighRiskHotspots] = useState<HighRiskHotspot[]>([]);
  const [ashaWorkers, setAshaWorkers] = useState<AshaWorker[]>([]);

  const [newWorkerName, setNewWorkerName] = useState("");
  const [newWorkerLocation, setNewWorkerLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<HighRiskHotspot | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        try {
            const hotspotsSnapshot = await getDocs(collection(db, "highRiskHotspots"));
            const hotspotsData = hotspotsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as HighRiskHotspot));
            setHighRiskHotspots(hotspotsData);

            const workersSnapshot = await getDocs(collection(db, "ashaWorkers"));
            const workersData = workersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AshaWorker));
            setAshaWorkers(workersData);
        } catch (error) {
            console.error("Error fetching data: ", error);
            toast({ variant: "destructive", title: "Failed to fetch data" });
        }
        setLoading(false);
    };

    fetchData();
  }, [toast]);

  const handleSeedDatabase = async () => {
    const batch = writeBatch(db);

    const hotspotsRef = collection(db, "highRiskHotspots");
    mockHighRiskHotspots.forEach((hotspot) => {
        const docRef = doc(hotspotsRef);
        batch.set(docRef, hotspot);
    });

    const workersRef = collection(db, "ashaWorkers");
    mockAshaWorkers.forEach((worker) => {
        const docRef = doc(workersRef);
        batch.set(docRef, worker);
    });

    const advisoriesRef = collection(db, "advisories");
    mockAdvisories.forEach((advisory) => {
      const docRef = doc(advisoriesRef);
      batch.set(docRef, { ...advisory, createdAt: serverTimestamp() });
    });


    try {
        await batch.commit();
        toast({ title: "Database Seeded!", description: "Mock data has been added to Firestore." });
        // Refetch data
        const hotspotsSnapshot = await getDocs(collection(db, "highRiskHotspots"));
        setHighRiskHotspots(hotspotsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as HighRiskHotspot)));
        const workersSnapshot = await getDocs(collection(db, "ashaWorkers"));
        setAshaWorkers(workersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AshaWorker)));
    } catch (error) {
        console.error("Error seeding database: ", error);
        toast({ variant: "destructive", title: "Failed to seed database" });
    }
  };

  const highRiskCount = highRiskHotspots.filter(h => h.risk === 'High').length;
  
  const reportsByDistrict: ReportsByDistrict = highRiskHotspots.reduce((acc, curr) => {
    const district = curr.district || 'Unknown';
    acc[district] = (acc[district] || 0) + curr.reports;
    return acc;
  }, {} as ReportsByDistrict);

  const chartData = Object.keys(reportsByDistrict).map(district => ({
    name: district,
    reports: reportsByDistrict[district]
  }));

  const mostAffectedDistrict = chartData.length > 0 ? Object.keys(reportsByDistrict).reduce((a, b) => reportsByDistrict[a] > reportsByDistrict[b] ? a : b) : "N/A";
  const mostAffectedState = highRiskHotspots.find(h => h.district === mostAffectedDistrict)?.state || "";
  
  const totalReports = highRiskHotspots.reduce((sum, item) => sum + item.reports, 0);

  const handleDownload = () => {
    if (highRiskHotspots.length === 0) {
      toast({ variant: "destructive", title: "No data to download" });
      return;
    }

    const headers = ["Village", "District", "State", "Risk", "Reports", "Latitude", "Longitude"];
    const csvContent = [
      headers.join(','),
      ...highRiskHotspots.map(item => [
        item.village,
        item.district,
        item.state,
        item.risk,
        item.reports,
        item.position.lat,
        item.position.lng
      ].join(','))
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

  const handleAddWorker = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newWorkerName && newWorkerLocation) {
        const newWorker = {
            name: newWorkerName,
            location: newWorkerLocation,
            reportsFiled: 0
        };
        try {
            const docRef = await addDoc(collection(db, "ashaWorkers"), newWorker);
            setAshaWorkers([...ashaWorkers, { id: docRef.id, ...newWorker }]);
            setNewWorkerName("");
            setNewWorkerLocation("");
            toast({ title: "Worker Added Successfully" });
        } catch (error) {
            console.error("Error adding worker: ", error);
            toast({ variant: "destructive", title: "Failed to add worker" });
        }
    }
  };

  const handleRemoveWorker = async (id: string) => {
      try {
        await deleteDoc(doc(db, "ashaWorkers", id));
        setAshaWorkers(ashaWorkers.filter(worker => worker.id !== id));
        toast({ title: "Worker Removed Successfully" });
      } catch (error) {
        console.error("Error removing worker: ", error);
        toast({ variant: "destructive", title: "Failed to remove worker" });
      }
  };


  return (
    <Dialog onOpenChange={(open) => !open && setSelectedHotspot(null)}>
      <div className="space-y-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage reports and monitor community health data across Northeast India.</p>
          </div>
          <Button onClick={handleSeedDatabase} variant="outline"><Database className="mr-2 h-4 w-4" /> Seed Database</Button>
        </div>


         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="transition-transform hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High-Risk Areas</CardTitle>
              <ShieldAlert className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{loading ? "..." : highRiskCount}</div>
              <p className="text-xs text-muted-foreground">Villages with active advisories</p>
            </CardContent>
          </Card>
          <Card className="transition-transform hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Most Affected District</CardTitle>
              <Map className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? "..." : `${mostAffectedDistrict}, ${mostAffectedState}`}</div>
              <p className="text-xs text-muted-foreground">Highest number of reports</p>
            </CardContent>
          </Card>
           <Card className="transition-transform hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reports (All Time)</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? "..." : totalReports}</div>
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
              <p className="text-xs text-muted-foreground">Fetched on page load</p>
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
                <Button className="w-full" onClick={handleDownload} disabled={highRiskHotspots.length === 0}>
                    <Download className="mr-2 h-4 w-4" />
                    Download CSV
                </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Data Analysis: Reports by District</CardTitle>
            <CardDescription>
              A breakdown of total reports from high-risk areas by district.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              {isClient && <ResponsiveContainer>
                <RechartsBarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))', 
                      borderColor: 'hsl(var(--border))' 
                    }}
                  />
                  <Legend />
                  <Bar dataKey="reports" fill="hsl(var(--chart-1))" name="Reports" stackId="a" />
                  <Bar dataKey="reports" fill="hsl(var(--chart-2))" name="Reports (alt)" stackId="a" />
                </RechartsBarChart>
              </ResponsiveContainer>}
            </div>
          </CardContent>
        </Card>

          <Card>
              <CardHeader>
                  <div className="flex items-center gap-4">
                      <Users className="h-6 w-6 text-primary" />
                      <CardTitle>Manage ASHA Workers</CardTitle>
                  </div>
                  <CardDescription>
                      View, add, or remove ASHA workers from the directory.
                  </CardDescription>
              </CardHeader>
              <CardContent>
                  <form onSubmit={handleAddWorker} className="flex flex-col sm:flex-row items-end gap-4 mb-6 p-4 border rounded-lg bg-muted/20">
                      <div className="grid w-full sm:w-auto flex-grow gap-1.5">
                          <Label htmlFor="worker-name">Worker Name</Label>
                          <Input id="worker-name" placeholder="e.g., Geeta Devi" value={newWorkerName} onChange={(e) => setNewWorkerName(e.target.value)} />
                      </div>
                      <div className="grid w-full sm:w-auto flex-grow gap-1.5">
                          <Label htmlFor="worker-location">Location</Label>
                          <Input id="worker-location" placeholder="e.g., Rampur, Kamrup" value={newWorkerLocation} onChange={(e) => setNewWorkerLocation(e.target.value)} />
                      </div>
                      <Button type="submit" className="w-full sm:w-auto">
                          <UserPlus className="mr-2 h-4 w-4" /> Add Worker
                      </Button>
                  </form>

                  {/* Mobile View: Cards */}
                  <div className="grid grid-cols-1 gap-4 md:hidden">
                      {ashaWorkers.map((worker) => (
                          <Card key={worker.id} className="relative">
                              <CardHeader>
                                  <CardTitle>{worker.name}</CardTitle>
                                  <CardDescription>{worker.location}</CardDescription>
                              </CardHeader>
                              <CardContent>
                                  <p className="text-sm text-muted-foreground">
                                      Reports Filed: <span className="font-bold text-foreground">{worker.reportsFiled}</span>
                                  </p>
                              </CardContent>
                               <div className="absolute top-4 right-4">
                                  <Button variant="ghost" size="icon" onClick={() => handleRemoveWorker(worker.id)}>
                                      <Trash2 className="h-4 w-4 text-destructive" />
                                      <span className="sr-only">Remove</span>
                                  </Button>
                              </div>
                          </Card>
                      ))}
                  </div>

                  {/* Desktop View: Table */}
                  <div className="overflow-x-auto hidden md:block">
                      <table className="min-w-full divide-y divide-border">
                          <thead className="bg-muted/50">
                              <tr>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Name</th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Location</th>
                                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Reports Filed</th>
                                  <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                              </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                              {ashaWorkers.map((worker) => (
                                  <tr key={worker.id}>
                                      <td className="whitespace-nowrap px-6 py-4 font-medium text-foreground">{worker.name}</td>
                                      <td className="whitespace-nowrap px-6 py-4 text-muted-foreground">{worker.location}</td>
                                      <td className="whitespace-nowrap px-6 py-4 text-muted-foreground">{worker.reportsFiled}</td>
                                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                          <Button variant="ghost" size="icon" onClick={() => handleRemoveWorker(worker.id)}>
                                              <Trash2 className="h-4 w-4 text-destructive" />
                                              <span className="sr-only">Remove</span>
                                          </Button>
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
              </CardContent>
          </Card>

        <Card>
          <CardHeader>
            <CardTitle>High-Risk Hotspots</CardTitle>
            <CardDescription>
              Villages and areas with the highest risk levels based on recent reports.
            </CardDescription>
          </CardHeader>
          <CardContent>
              {/* Mobile View: Cards */}
              <div className="grid grid-cols-1 gap-4 md:hidden">
                {highRiskHotspots.map((item) => (
                  <Card key={item.id}>
                    <CardHeader>
                      <CardTitle>{item.village}</CardTitle>
                      <CardDescription>{item.district}, {item.state}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center justify-between">
                         <span className="text-muted-foreground">Risk Level</span>
                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            item.risk === 'High' ? 'bg-red-100 text-red-800' : 
                            item.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {item.risk}
                          </span>
                      </div>
                       <div className="flex items-center justify-between">
                         <span className="text-muted-foreground">Reports</span>
                         <span className="font-medium">{item.reports}</span>
                      </div>
                       <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="w-full mt-4" onClick={() => setSelectedHotspot(item)}>
                              View Details
                          </Button>
                       </DialogTrigger>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Desktop View: Table */}
              <div className="overflow-x-auto hidden md:block">
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
                      <tr key={item.id} className="transition-colors hover:bg-muted/50">
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
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedHotspot(item)}>
                                View Details
                            </Button>
                          </DialogTrigger>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
          </CardContent>
        </Card>
      </div>
      {selectedHotspot && (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Hotspot Details: {selectedHotspot.village}</DialogTitle>
                <DialogDescription>
                    Detailed information for the high-risk hotspot in {selectedHotspot.district}, {selectedHotspot.state}.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="village" className="text-right">Village</Label>
                    <Input id="village" value={selectedHotspot.village} readOnly className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="district" className="text-right">District</Label>
                    <Input id="district" value={selectedHotspot.district} readOnly className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="state" className="text-right">State</Label>
                    <Input id="state" value={selectedHotspot.state} readOnly className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="risk" className="text-right">Risk Level</Label>
                    <Input id="risk" value={selectedHotspot.risk} readOnly className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="reports" className="text-right">Reports</Label>
                    <Input id="reports" value={selectedHotspot.reports} readOnly className="col-span-3" />
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="lat" className="text-right">Latitude</Label>
                    <Input id="lat" value={selectedHotspot.position.lat} readOnly className="col-span-3" />
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="lng" className="text-right">Longitude</Label>
                    <Input id="lng" value={selectedHotspot.position.lng} readOnly className="col-span-3" />
                </div>
            </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
