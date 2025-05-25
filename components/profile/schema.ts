import { z } from "zod";

export const addressFormSchema = z.object({
  label: z.string().min(1, "Label is required"),
  recipient_name: z.string().min(1, "Recipient name is required"),
  phone_number: z.string().min(8, "Valid phone number is required"),
  address_line1: z.string().min(5, "Address is required"),
  address_line2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  postal_code: z.string().min(5, "Valid postal code is required"),
  country: z.string().default("Indonesia"),
  is_default: z.boolean().default(false),
});

export const profileFormSchema = z.object({
  full_name: z.string().min(2, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(8, "Valid phone number is required"),
  birth_date: z.string().optional(),
  skin_type: z.string().optional(),
});

export type AddressFormValues = z.infer<typeof addressFormSchema>;
export type ProfileFormValues = z.infer<typeof profileFormSchema>;