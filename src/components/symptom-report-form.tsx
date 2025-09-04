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
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Loader2 } from "lucide-react";
import { useLocation } from "@/hooks/use-location";
import { useEffect } from "react";

const symptoms = [
  { id: "fever", label: "Fever" },
  { id: "cough", label: "Cough" },
  { id: "diarrhea", label: "Diarrhea" },
  { id: "vomiting", label: "Vomiting" },
  { id: "fatigue", label: "Fatigue" },
  { id: "abdominal_pain", label: "Abdominal Pain" },
] as const;

const formSchema = z.object({
  symptoms: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one symptom.",
  }),
  severity: z.enum(["mild", "moderate", "severe"], {
    required_error: "You need to select a severity level.",
  }),
  duration: z.coerce.number().min(1, "Duration must be at least 1 day."),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export function SymptomReportForm() {
  const { toast } = useToast();
  const { location, loading, getLocation } = useLocation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptoms: [],
      duration: 1,
    },
  });

  useEffect(() => {
    if (location.latitude && location.longitude) {
      form.setValue("latitude", location.latitude);
      form.setValue("longitude", location.longitude);
    }
    if (location.error) {
      toast({
        variant: "destructive",
        title: "Location Error",
        description: location.error,
      });
    }
  }, [location, form, toast]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Report Submitted",
      description: "Thank you for submitting the symptom report.",
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="symptoms"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Symptoms</FormLabel>
                <FormDescription>
                  Select all symptoms that apply.
                </FormDescription>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {symptoms.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="symptoms"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="severity"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Severity</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="mild" />
                    </FormControl>
                    <FormLabel className="font-normal">Mild</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="moderate" />
                    </FormControl>
                    <FormLabel className="font-normal">Moderate</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="severe" />
                    </FormControl>
                    <FormLabel className="font-normal">Severe</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration (in days)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 3" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
            <FormLabel>GPS Location</FormLabel>
            <div className="flex flex-col sm:flex-row gap-4">
                 <Button type="button" variant="outline" onClick={getLocation} disabled={loading} className="w-full sm:w-auto">
                    {loading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <MapPin className="mr-2 h-4 w-4" />
                    )}
                    Get Current Location
                </Button>
                <div className="grid grid-cols-2 gap-4 flex-1">
                    <FormField
                    control={form.control}
                    name="latitude"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Latitude" {...field} value={field.value ?? ""} disabled />
                            </FormControl>
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="longitude"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Longitude" {...field} value={field.value ?? ""} disabled />
                            </FormControl>
                        </FormItem>
                    )}
                    />
                </div>
            </div>
            <FormDescription>
                Automatically capture the location of this health report.
            </FormDescription>
        </div>


        <Button type="submit" size="lg">Submit Report</Button>
      </form>
    </Form>
  );
}
