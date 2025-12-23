"use client";

import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSearchParams } from "next/navigation";
import { submitContactForm, FormState } from "@/app/actions";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const formSchema = z.object({
  service: z.string().min(1, "Please select a service"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  city: z.string().min(1, "Please enter your city"),
  date: z.string().optional(),
  guests: z.string().optional(),
  budget: z.string().optional(),
  website: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  goal: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy.",
  }),
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service");
  const packageParam = searchParams.get("package");

  const [state, formAction] = useFormState<FormState, FormData>(
    // @ts-ignore
    submitContactForm,
    { message: "", success: false }
  );
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service: serviceParam || "",
      name: "",
      email: "",
      phone: "",
      city: "",
      date: "",
      guests: "",
      budget: "",
      website: "",
      goal: "",
      message: packageParam ? `Hi, I'm interested in the ${packageParam} package.` : "",
      consent: false,
    },
  });

  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const selectedService = form.watch("service");

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: "Success!",
          description: state.message,
        });
        form.reset();
      }
    }
    if (state.issues) {
      state.issues.forEach(issue => {
        // This is a simplified error mapping. For a more complex form, you might need a more robust solution.
        const fieldName = issue.includes("service") ? "service" : 
                          issue.includes("Name") ? "name" :
                          issue.includes("email") ? "email" :
                          issue.includes("city") ? "city" :
                          issue.includes("Message") ? "message" :
                          issue.includes("agree") ? "consent" : "root";
        form.setError(fieldName as keyof FormData, { type: 'manual', message: issue });
      });
    }
  }, [state, form, toast]);


  return (
    <div>
        {state.success ? (
             <Alert>
                <Terminal className="h-4 w-4" />
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>{state.message}</AlertDescription>
            </Alert>
        ) : (
        <Form {...form}>
            <form
            ref={formRef}
            action={formAction}
            className="space-y-6"
            >
            <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Service of Interest</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="consulting">Restaurant Consulting</SelectItem>
                        <SelectItem value="catering">Catering / Private Chef</SelectItem>
                        <SelectItem value="websites">Hospitality Websites</SelectItem>
                    </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
                )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                        <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Phone (Optional)</FormLabel>
                    <FormControl>
                        <Input placeholder="+31 6 12345678" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>City / Region</FormLabel>
                    <FormControl>
                        <Input placeholder="Amsterdam" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>

            {selectedService === "catering" && (
                <div className="p-6 border border-border rounded-lg space-y-6 bg-card">
                    <p className="font-headline text-lg">Catering Details</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Event Date</FormLabel>
                                <FormControl>
                                <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="guests"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Number of Guests</FormLabel>
                                <FormControl>
                                <Input type="number" placeholder="e.g., 25" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="budget"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Budget Range (p.p.)</FormLabel>
                                <FormControl>
                                <Input placeholder="e.g., €100-€150" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                </div>
            )}

            {(selectedService === "consulting" || selectedService === "websites") && (
                 <div className="p-6 border border-border rounded-lg space-y-6 bg-card">
                     <p className="font-headline text-lg">Project Details</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="website"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Current Website URL</FormLabel>
                                <FormControl>
                                <Input placeholder="https://myrestaurant.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="goal"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Biggest Goal</FormLabel>
                                <FormControl>
                                <Input placeholder="Increase direct bookings" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                </div>
            )}

            <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Your Message</FormLabel>
                    <FormControl>
                    <Textarea
                        placeholder="Tell me a bit about your project or challenge..."
                        className="min-h-[150px]"
                        {...field}
                    />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="consent"
                render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border border-border bg-card">
                    <FormControl>
                    <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                    />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                    <FormLabel>
                        I agree to the privacy policy.
                    </FormLabel>
                    <FormDescription>
                        Your information is used only to respond to your inquiry.
                    </FormDescription>
                    <FormMessage />
                    </div>
                </FormItem>
                )}
            />
            
            <Button 
                type="submit" 
                size="lg" 
                className="w-full md:w-auto font-semibold"
                disabled={form.formState.isSubmitting}
            >
                {form.formState.isSubmitting ? "Sending..." : "Send Message"}
            </Button>
            </form>
        </Form>
        )}
    </div>
  );
}
