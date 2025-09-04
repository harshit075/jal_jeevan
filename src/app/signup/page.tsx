import { SignupForm } from "@/components/signup-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplet } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
            <Droplet className="h-12 w-auto text-primary" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground font-headline">
          Create a new account
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Or{' '}
          <Link href="/login" className="font-medium text-primary hover:text-primary/90">
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardContent className="pt-6">
            <SignupForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
