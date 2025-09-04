"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { createAdvisoryAction } from "@/lib/actions";
import { Loader2, Wand2 } from "lucide-react";
import type { Advisory } from "@/lib/types";
import { AdvisoryCard } from "./advisory-card";

const formSchema = z.object({
  symptomsData: z.string().min(10, { message: "Please provide a summary of reported symptoms." }),
  waterSourceData: z.string().min(10, { message: "Please provide a summary of water source data." }),
  location: z.string().min(5, { message: "Please specify the affected area or GPS coordinates." }),
});

export function GenerateAdvisoryForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [generatedAdvisory, setGeneratedAdvisory] = useState<Advisory | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptomsData: "",
      waterSourceData: "",
      location: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setGeneratedAdvisory(null);
    try {
      const result = await createAdvisoryAction(values);
      setGeneratedAdvisory(result);
      toast({
        title: "Advisory Generated Successfully",
        description: "Review the AI-generated advisory below.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="symptomsData"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Symptoms Data</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Multiple reports of acute diarrhea and vomiting, lasting 2-3 days, primarily affecting children under 5."
                    {...field}
                  />
                </FormControl>
                <FormDescription>Summarize all reported symptoms, including type, severity, and duration.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="waterSourceData"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Water Source Data</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Main community well shows cloudy water with a foul smell. Recent tests indicate E. coli presence."
                    {...field}
                  />
                </FormControl>
                <FormDescription>Summarize water source data, including location, inspection notes, and test results.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Sector 15, Township Area or 28.6139° N, 77.2090° E" {...field} />
                </FormControl>
                <FormDescription>Specify the affected geographical area or provide GPS coordinates.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="lg" disabled={loading}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Generate Advisory
          </Button>
        </form>
      </Form>

      {generatedAdvisory && (
        <div className="space-y-4 pt-8 border-t">
          <h2 className="font-headline text-2xl">Generated Advisory</h2>
          <AdvisoryCard advisory={generatedAdvisory} />
        </div>
      )}
    </div>
  );
}
