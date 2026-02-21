import { NextResponse } from "next/server";

import { normalizeLocale } from "@/lib/i18n";
import { sendQuoteNotification } from "@/lib/mailer";
import { prisma } from "@/lib/prisma";
import { saveFiles } from "@/lib/uploads";
import { createQuoteRequestFormSchema } from "@/lib/validators/quote-request";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const locale = normalizeLocale(String(formData.get("locale") ?? "it"));
    const quoteRequestFormSchema = createQuoteRequestFormSchema(locale);

    const rawValues = {
      nome: String(formData.get("nome") ?? ""),
      telefono: String(formData.get("telefono") ?? ""),
      email: String(formData.get("email") ?? ""),
      tipoIntervento: String(formData.get("tipoIntervento") ?? ""),
      citta: String(formData.get("citta") ?? ""),
      messaggio: String(formData.get("messaggio") ?? ""),
      privacy: formData.get("privacy") === "true" || formData.get("privacy") === "on",
    };

    const parsed = quoteRequestFormSchema.safeParse(rawValues);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: locale === "it" ? "Errore di validazione" : "Validation error",
          details: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    const files = formData
      .getAll("foto")
      .filter((entry): entry is File => entry instanceof File && entry.size > 0);
    const uploadedImages = await saveFiles(files, "quotes");

    const createdRequest = await prisma.quoteRequest.create({
      data: {
        name: parsed.data.nome,
        phone: parsed.data.telefono,
        email: parsed.data.email,
        serviceType: parsed.data.tipoIntervento,
        city: parsed.data.citta,
        message: parsed.data.messaggio,
        images: uploadedImages,
        privacyAccepted: parsed.data.privacy,
      },
    });

    await sendQuoteNotification({
      id: createdRequest.id,
      name: createdRequest.name,
      phone: createdRequest.phone,
      email: createdRequest.email,
      serviceType: createdRequest.serviceType,
      city: createdRequest.city,
      message: createdRequest.message,
      images: createdRequest.images,
    });

    return NextResponse.json({ ok: true, id: createdRequest.id }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unexpected error while sending the request.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
