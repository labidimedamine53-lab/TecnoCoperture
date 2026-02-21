import nodemailer from "nodemailer";

type QuoteNotificationPayload = {
  id: string;
  name: string;
  phone: string;
  email: string;
  serviceType: string;
  city: string;
  message: string;
  images: string[];
};

function hasSmtpConfig() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASSWORD &&
      process.env.QUOTE_NOTIFICATION_EMAIL,
  );
}

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

export async function sendQuoteNotification(payload: QuoteNotificationPayload) {
  if (!hasSmtpConfig()) {
    return;
  }

  const transporter = createTransporter();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const imagesList = payload.images.length
    ? payload.images.map((image) => `${baseUrl}${image}`).join("\n")
    : "Nessuna foto allegata.";

  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
    to: process.env.QUOTE_NOTIFICATION_EMAIL,
    subject: `Nuova richiesta preventivo - ${payload.serviceType}`,
    text: [
      `ID richiesta: ${payload.id}`,
      `Nome: ${payload.name}`,
      `Telefono: ${payload.phone}`,
      `Email: ${payload.email}`,
      `Tipo intervento: ${payload.serviceType}`,
      `Citta: ${payload.city}`,
      "Messaggio:",
      payload.message,
      "",
      "Foto caricate:",
      imagesList,
    ].join("\n"),
  });
}
