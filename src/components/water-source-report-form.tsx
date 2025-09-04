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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "@/hooks/use-location";
import { MapPin, Loader2, Camera } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

const formSchema = z.object({
  sourceType: z.string({ required_error: "Please select a water source type." }),
  visualNotes: z.string().min(10, { message: "Please provide more detailed notes (at least 10 characters)." }),
  photo: z.any().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export function WaterSourceReportForm() {
  const { toast } = useToast();
  const { location, loading, getLocation } = useLocation();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        visualNotes: "",
    }
  });

  const photoRef = form.register("photo");

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
      description: "Thank you for submitting the water source report.",
    });
    form.reset();
    setPhotoPreview(null);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="sourceType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Water Source Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a source type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="well">Well</SelectItem>
                  <SelectItem value="tap">Public Tap</SelectItem>
                  <SelectItem value="river">River/Stream</SelectItem>
                  <SelectItem value="borehole">Borehole</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="visualNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Visual Inspection Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the water's color, smell, clarity, and surrounding environment."
                  {...field}
                />
              </FormControl>
              <FormDescription>Be as detailed as possible.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem>
                <FormLabel>Upload Photo</FormLabel>
                <FormControl>
                    <div className="relative">
                        <Input 
                            type="file" 
                            accept="image/*" 
                            {...photoRef}
                            onChange={(e) => {
                                field.onChange(e.target.files ? e.target.files[0] : null);
                                if (e.target.files && e.target.files[0]) {
                                    setPhotoPreview(URL.createObjectURL(e.target.files[0]));
                                } else {
                                    setPhotoPreview(null);
                                }
                            }}
                            className="pl-12"
                        />
                         <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Camera className="h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                </FormControl>
                {photoPreview && (
                    <div className="mt-4">
                        <Image src={photoPreview} alt="Photo preview" width={200} height={200} className="rounded-lg object-cover" />
                    </div>
                )}
                <FormDescription>A photo can provide valuable context.</FormDescription>
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
                Automatically capture the location of this water source.
            </FormDescription>
        </div>

        <Button type="submit" size="lg">Submit Report</Button>
      </form>
    </Form>
  );
}
