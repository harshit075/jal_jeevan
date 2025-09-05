
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
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import type { EducationalArticle, EducationalModule } from "@/app/education/page";

const formSchema = z.object({
  type: z.enum(["video", "article"], {
    required_error: "You need to select a content type.",
  }),
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  category: z.string().min(3, { message: "Category must be at least 3 characters." }),
  content: z.string().min(20, { message: "Content must be at least 20 characters." }),
  videoUrl: z.string().url({ message: "Please enter a valid URL." }).optional(),
  imageUrl: z.string().url({ message: "Please enter a valid URL." }).optional(),
}).refine(data => {
    if (data.type === 'video') return !!data.videoUrl;
    return true;
}, {
    message: "Video URL is required for video content.",
    path: ["videoUrl"],
}).refine(data => {
    if (data.type === 'article') return !!data.imageUrl;
    return true;
}, {
    message: "Image URL is required for article content.",
    path: ["imageUrl"],
});

type AddEducationContentFormProps = {
  onSubmit: (data: Omit<EducationalModule, 'id'> | Omit<EducationalArticle, 'id'>) => void;
}

export function AddEducationContentForm({ onSubmit }: AddEducationContentFormProps) {
  const [loading, setLoading] = useState(false);
  const [contentType, setContentType] = useState<"video" | "article">("video");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "video",
      title: "",
      category: "",
      content: "",
    },
  });

  async function handleFormSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    
    let newContent: Omit<EducationalModule, 'id'> | Omit<EducationalArticle, 'id'>;

    if (values.type === "video") {
        newContent = {
            title: values.title,
            category: values.category,
            content: values.content,
            videoUrl: values.videoUrl!,
        };
    } else {
        newContent = {
            title: values.title,
            category: values.category,
            content: values.content,
            image: { src: values.imageUrl!, alt: values.title },
        };
    }
    
    await onSubmit(newContent);

    setLoading(false);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content Type</FormLabel>
              <Select onValueChange={(value) => {
                  field.onChange(value);
                  setContentType(value as "video" | "article");
              }} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a content type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="video">Video Module</SelectItem>
                  <SelectItem value="article">Article</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., How to Boil Water Safely" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Water Safety" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content / Description</FormLabel>
              <FormControl>
                <Textarea placeholder="A brief description of the educational content." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {contentType === 'video' && (
             <FormField
                control={form.control}
                name="videoUrl"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>YouTube Video URL</FormLabel>
                        <FormControl>
                            <Input placeholder="https://www.youtube.com/embed/..." {...field} />
                        </FormControl>
                        <FormDescription>Must be an embeddable YouTube URL.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
        )}
        
        {contentType === 'article' && (
             <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                            <Input placeholder="https://example.com/image.jpg" {...field} />
                        </FormControl>
                        <FormDescription>The URL for the article's header image.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
        )}


        <Button type="submit" disabled={loading} className="w-full">
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Add Content
        </Button>
      </form>
    </Form>
  );
}
