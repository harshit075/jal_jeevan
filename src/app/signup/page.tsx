import { SignupForm } from "@/components/signup-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

function Logo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-12 w-auto text-primary"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
      <path d="M12 4.13c-2.61 0-4.95 1.06-6.66 2.77.3.3.61.62.92.92C7.94 6.2 9.89 5.13 12 5.13s4.06 1.07 5.74 2.7.31-.31.62-.62C16.95 5.19 14.61 4.13 12 4.13zM12 19.87c2.61 0-4.95-1.06 6.66-2.77l-.92-.92c-1.68 1.62-3.63 2.7-5.74 2.7s-4.06-1.08-5.74-2.7l-.92.92c1.71 1.71 4.05 2.77 6.66 2.77z" opacity=".3" />
      <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
    </svg>
  );
}

export default function SignupPage() {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
            <Logo />
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
