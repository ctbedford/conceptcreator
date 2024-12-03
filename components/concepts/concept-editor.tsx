"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { TagInput } from "./tag-input";
import { FileUpload } from "./file-upload";
import { Toolbar } from "./toolbar";
import type { ConceptFormData } from "@/types/concept";
import { createConcept, uploadAttachment } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
});

export function ConceptEditor() {
  const [isSaving, setIsSaving] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();

  const form = useForm<ConceptFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    onUpdate: ({ editor }) => {
      form.setValue("content", editor.getHTML());
    },
  });

  async function onSubmit(data: ConceptFormData) {
    console.log('[ConceptEditor] Submitting form with data:', data);
    try {
      setIsSaving(true);
      console.log('[ConceptEditor] Creating concept...');
      const concept = await createConcept(data);
      console.log('[ConceptEditor] Concept created:', concept);
      
      if (files.length > 0) {
        console.log('[ConceptEditor] Uploading', files.length, 'attachments');
        const fileUploadPromises = files.map(file => {
          console.log('[ConceptEditor] Uploading file:', file.name);
          return uploadAttachment(concept.id, file);
        });
        await Promise.all(fileUploadPromises);
        console.log('[ConceptEditor] All attachments uploaded successfully');
      }

      toast.success("Concept created successfully");
      router.push("/dashboard");
    } catch (error) {
      console.error('[ConceptEditor] Error in form submission:', error);
      toast.error("Failed to save concept");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter concept title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <TagInput
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Content</FormLabel>
          <Toolbar editor={editor} />
          <EditorContent editor={editor} className="min-h-[200px] border rounded-md p-4" />
        </div>

        <FileUpload files={files} onFilesChange={setFiles} />

        <div className="flex justify-end space-x-4">
          <Button 
            variant="outline" 
            type="button"
            onClick={() => router.push("/dashboard")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Concept"}
          </Button>
        </div>
      </form>
    </Form>
  );
}