import { z } from 'zod';

// Define validation for insert data
export const createLiveSchema = z.object({
   sessionName: z.string().min(1).max(255),
   sessiontime: z.string().min(1).max(100),
   description: z.string().min(1),
   link: z.string().url()
});

// Define Zod schema for validation
export const editLiveSchema = z.object({
   sessionName: z.string().min(1).max(255),
   sessiontime: z.string().min(1).max(100),
   description: z.string().min(1),
   link: z.string().url()
});
