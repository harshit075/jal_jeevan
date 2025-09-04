"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account and application preferences.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>
            Manage your account settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
           <div>
             <Button variant="outline">Sign Out</Button>
           </div>
           <div>
             <Button variant="destructive">Delete Account</Button>
             <CardDescription className="mt-2">
                Permanently delete your account and all associated data. This action cannot be undone.
             </CardDescription>
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
