"use client";

import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-8">
             <div className="flex flex-col items-center text-center">
                <Image src="/images/logo-health.png" alt="Ministry of Health and Family Welfare Logo" width={60} height={60} className="h-16 w-auto"/>
                <p className="text-xs text-muted-foreground mt-2 max-w-40">Ministry of Health and Family Welfare</p>
             </div>
             <div className="flex flex-col items-center text-center">
                <Image src="/images/logo-jal-shakti.png" alt="Ministry of Jal Shakti Logo" width={60} height={60} className="h-16 w-auto"/>
                <p className="text-xs text-muted-foreground mt-2 max-w-40">Ministry of Jal Shakti</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center md:text-right">
            &copy; {new Date().getFullYear()} Aarogya jal Sanket. All rights reserved.
            <br />
            A community health and water monitoring initiative.
          </p>
        </div>
      </div>
    </footer>
  );
}
