import { z } from "zod";

export const maskinerSchema = z.object({
    id: z.coerce.number().optional(),
    name: z
      .string()
      .min(2, { message: "Ange ett namn, minst tre tecken!" }),
    regNo: z.string().optional(),
    img: z.instanceof(File).optional(),
    
    typer: z.coerce.number() // array of ids
  });
  
  export type MaskinerSchema = z.infer<typeof maskinerSchema>;