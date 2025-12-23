"use server";

import { z } from "zod";

const contactFormSchema = z.object({
  service: z.string().min(1, "Please select a service"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  city: z.string().min(1, "Please enter your city"),
  date: z.string().optional(),
  guests: z.string().optional(),
  budget: z.string().optional(),
  website: z.string().optional(),
  goal: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  consent: z.literal("on", {
    errorMap: () => ({ message: "You must agree to the privacy policy" }),
  }),
});

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  success: boolean;
};

export async function submitContactForm(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = contactFormSchema.safeParse(formData);

  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => issue.message);
    return {
      message: "Invalid form data.",
      issues,
      fields: formData as Record<string, string>,
      success: false,
    };
  }
  
  // Here you would typically:
  // 1. Save the data to a Firestore 'leads' collection
  //    e.g., await db.collection('leads').add(parsed.data);
  // 2. Send an email notification
  //    e.g., await sendEmail({ to: 'admin@example.com', ... });

  console.log("Lead captured:", parsed.data);

  return {
    message: "Thank you for your message! We'll be in touch soon.",
    success: true,
  };
}
