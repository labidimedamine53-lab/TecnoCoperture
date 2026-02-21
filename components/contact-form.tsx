"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { getInterventionOptions } from "@/lib/constants";
import { isItalian, type Locale } from "@/lib/i18n";
import {
  createQuoteRequestFormSchema,
  type QuoteRequestFormValues,
} from "@/lib/validators/quote-request";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type ContactFormProps = {
  locale: Locale;
};

export function ContactForm({ locale }: ContactFormProps) {
  const italian = isItalian(locale);
  const interventionOptions = getInterventionOptions(locale);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const quoteRequestFormSchema = createQuoteRequestFormSchema(locale);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuoteRequestFormValues>({
    resolver: zodResolver(quoteRequestFormSchema),
    defaultValues: {
      nome: "",
      telefono: "",
      email: "",
      tipoIntervento: "",
      citta: "",
      messaggio: "",
      privacy: false,
    },
  });

  const onSubmit = async (values: QuoteRequestFormValues) => {
    setServerSuccess(null);
    setServerError(null);

    const payload = new FormData();
    payload.set("nome", values.nome);
    payload.set("telefono", values.telefono);
    payload.set("email", values.email);
    payload.set("tipoIntervento", values.tipoIntervento);
    payload.set("citta", values.citta);
    payload.set("messaggio", values.messaggio);
    payload.set("privacy", String(values.privacy));
    payload.set("locale", locale);

    attachedFiles.forEach((file) => payload.append("foto", file));

    const response = await fetch("/api/quote-requests", {
      method: "POST",
      body: payload,
    });

    const responseBody = (await response.json()) as { error?: string };
    if (!response.ok) {
      setServerError(
        responseBody.error ??
          (italian
            ? "Impossibile inviare la richiesta in questo momento."
            : "Unable to send your request right now."),
      );
      return;
    }

    setServerSuccess(
      italian
        ? "Richiesta inviata con successo. Ti ricontatteremo entro 24 ore lavorative."
        : "Request sent successfully. We will contact you within 24 business hours.",
    );
    reset();
    setAttachedFiles([]);
    setFileInputKey((current) => current + 1);
  };

  return (
    <Card className="border-slate-200 shadow-xl">
      <CardHeader>
        <CardTitle>{italian ? "Richiedi Preventivo" : "Request a Quote"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nome">{italian ? "Nome" : "Name"}</Label>
              <Input id="nome" placeholder={italian ? "Mario Rossi" : "John Smith"} {...register("nome")} />
              {errors.nome ? <p className="text-xs text-red-600">{errors.nome.message}</p> : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefono">{italian ? "Telefono" : "Phone"}</Label>
              <Input id="telefono" placeholder="+39 333 1234567" {...register("telefono")} />
              {errors.telefono ? (
                <p className="text-xs text-red-600">{errors.telefono.message}</p>
              ) : null}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder={italian ? "nome@email.it" : "name@email.com"} {...register("email")} />
              {errors.email ? <p className="text-xs text-red-600">{errors.email.message}</p> : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="citta">{italian ? "Citta" : "City"}</Label>
              <Input id="citta" placeholder={italian ? "Milano" : "Milan"} {...register("citta")} />
              {errors.citta ? <p className="text-xs text-red-600">{errors.citta.message}</p> : null}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tipoIntervento">{italian ? "Tipo Intervento" : "Service Type"}</Label>
            <Select id="tipoIntervento" defaultValue="" {...register("tipoIntervento")}>
              <option value="" disabled>
                {italian ? "Seleziona un intervento" : "Select a service"}
              </option>
              {interventionOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
            {errors.tipoIntervento ? (
              <p className="text-xs text-red-600">{errors.tipoIntervento.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="messaggio">{italian ? "Messaggio" : "Message"}</Label>
            <Textarea
              id="messaggio"
              placeholder={
                italian
                  ? "Descrivi il tuo progetto o il problema riscontrato..."
                  : "Describe your project or the issue you found..."
              }
              {...register("messaggio")}
            />
            {errors.messaggio ? (
              <p className="text-xs text-red-600">{errors.messaggio.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="foto">
              {italian
                ? "Foto del tetto (opzionale, max 8MB ciascuna)"
                : "Roof photos (optional, max 8MB each)"}
            </Label>
            <Input
              key={fileInputKey}
              id="foto"
              type="file"
              accept="image/*"
              multiple
              onChange={(event) => {
                const files = event.target.files ? Array.from(event.target.files) : [];
                setAttachedFiles(files);
              }}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-start gap-3 text-sm text-slate-700">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-500 focus:ring-sky-400"
                {...register("privacy")}
              />
              <span>
                {italian ? "Accetto la " : "I accept the "}
                <a href="/privacy-policy" className="font-semibold text-slate-900 underline">
                  Privacy Policy
                </a>{" "}
                {italian
                  ? "e autorizzo il trattamento dei dati personali."
                  : "and authorize the processing of personal data."}
              </span>
            </label>
            {errors.privacy ? (
              <p className="text-xs text-red-600">{errors.privacy.message}</p>
            ) : null}
          </div>

          {serverSuccess ? (
            <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{serverSuccess}</p>
          ) : null}
          {serverError ? (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{serverError}</p>
          ) : null}

          <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
            {isSubmitting
              ? italian
                ? "Invio in corso..."
                : "Sending..."
              : italian
                ? "Invia Richiesta"
                : "Send Request"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
