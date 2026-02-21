import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().trim().min(3, "Il titolo deve avere almeno 3 caratteri."),
  location: z.string().trim().min(2, "Inserisci la localita del progetto."),
  description: z
    .string()
    .trim()
    .min(20, "La descrizione deve avere almeno 20 caratteri.")
    .max(3000, "La descrizione e troppo lunga."),
  type: z.string().trim().min(2, "Inserisci una tipologia valida."),
});

export type ProjectInput = z.infer<typeof projectSchema>;
