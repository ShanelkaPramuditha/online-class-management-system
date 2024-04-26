import { z } from 'zod';

export const PaymentZodSchema = z.object({
   cardHolderName: z.string().min(3),
   courseName: z.string().min(3),
   courseValue: z.number().positive(),
   offerValue: z.number().int().min(0)
});
