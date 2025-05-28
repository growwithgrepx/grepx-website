"use server";

import { z } from "zod";

// Schema for Career Application
const careerApplicationSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  portfolioLink: z.string().url().optional().or(z.literal('')),
  message: z.string().min(10).max(1000),
});
export type CareerApplicationData = z.infer<typeof careerApplicationSchema>;

// Schema for Contact Form
const inquiryTypes = ["General Inquiry", "Request Demo", "Partnership", "Media Inquiry"] as const;
const contactFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().min(2).max(100).optional().or(z.literal('')),
  inquiryType: z.enum(inquiryTypes),
  message: z.string().min(10).max(2000),
});
export type ContactFormData = z.infer<typeof contactFormSchema>;


interface SubmissionResult {
  success: boolean;
  error?: string;
}

export async function submitCareerApplication(data: CareerApplicationData): Promise<SubmissionResult> {
  const validation = careerApplicationSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, error: "Invalid data provided." };
  }

  // In a real application, you would save this to a database or send an email.
  // For MVP, we'll just log it to the console.
  console.log("Career Application Received:", validation.data);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { success: true };
}

export async function submitContactForm(data: ContactFormData): Promise<SubmissionResult> {
  const validation = contactFormSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, error: "Invalid data provided." };
  }

  // In a real application, you would save this to a database, send an email, or integrate with a CRM.
  // For MVP, we'll just log it to the console.
  console.log("Contact Form Submission Received:", validation.data);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Example of simulating an error
  // if (validation.data.email.includes("error")) {
  //  return { success: false, error: "Simulated server error for this email." };
  // }

  return { success: true };
}
