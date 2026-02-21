import { z } from "zod";

import type { Locale } from "@/lib/i18n";

const phoneRegex = /^[+0-9\s().-]{6,25}$/;

export function createQuoteRequestFormSchema(locale: Locale) {
  const messages =
    locale === "it"
      ? {
          name: "Inserisci il tuo nome.",
          phone: "Inserisci un numero di telefono valido.",
          email: "Inserisci un indirizzo email valido.",
          serviceType: "Seleziona il tipo di intervento.",
          city: "Inserisci la citta.",
          messageMin: "Il messaggio deve contenere almeno 10 caratteri.",
          messageMax: "Il messaggio e troppo lungo.",
          privacy: "Devi accettare la privacy policy.",
        }
      : {
          name: "Please enter your name.",
          phone: "Please enter a valid phone number.",
          email: "Please enter a valid email address.",
          serviceType: "Please select a service type.",
          city: "Please enter your city.",
          messageMin: "The message must contain at least 10 characters.",
          messageMax: "The message is too long.",
          privacy: "You must accept the privacy policy.",
        };

  return z.object({
    nome: z.string().trim().min(2, messages.name),
    telefono: z.string().trim().regex(phoneRegex, messages.phone),
    email: z.string().trim().email(messages.email),
    tipoIntervento: z.string().trim().min(2, messages.serviceType),
    citta: z.string().trim().min(2, messages.city),
    messaggio: z.string().trim().min(10, messages.messageMin).max(2500, messages.messageMax),
    privacy: z.boolean().refine((value) => value, {
      message: messages.privacy,
    }),
  });
}

export type QuoteRequestFormValues = z.infer<ReturnType<typeof createQuoteRequestFormSchema>>;
