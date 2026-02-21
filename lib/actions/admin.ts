"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

import { signIn, signOut } from "@/auth";
import { normalizeLocale } from "@/lib/i18n";
import { requireAdmin } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/validators/project";
import { removeLocalFiles, saveFiles } from "@/lib/uploads";

export type AdminLoginState = {
  error?: string;
};

export async function adminLoginAction(
  _previousState: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  const locale = normalizeLocale(String(formData.get("locale") ?? "it"));

  try {
    await signIn("credentials", {
      username,
      password,
      redirectTo: "/admin/dashboard",
    });
    return {};
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: locale === "it" ? "Credenziali non valide." : "Invalid credentials." };
    }
    throw error;
  }
}

export async function adminLogoutAction() {
  await signOut({ redirectTo: "/admin/login" });
}

export async function deleteQuoteRequestAction(formData: FormData) {
  await requireAdmin();
  const requestId = String(formData.get("requestId") ?? "");
  if (!requestId) return;

  const existingRequest = await prisma.quoteRequest.findUnique({
    where: { id: requestId },
    select: { images: true },
  });

  await prisma.quoteRequest.delete({ where: { id: requestId } });

  if (existingRequest?.images.length) {
    await removeLocalFiles(existingRequest.images);
  }

  revalidatePath("/admin/requests");
}

export async function deleteProjectAction(formData: FormData) {
  await requireAdmin();
  const projectId = String(formData.get("projectId") ?? "");
  if (!projectId) return;

  const existingProject = await prisma.project.findUnique({
    where: { id: projectId },
    select: { images: true },
  });

  await prisma.project.delete({ where: { id: projectId } });

  if (existingProject?.images.length) {
    await removeLocalFiles(existingProject.images);
  }

  revalidatePath("/admin/projects");
  revalidatePath("/portfolio");
}

export async function createProjectAction(formData: FormData) {
  await requireAdmin();

  const rawValues = {
    title: String(formData.get("title") ?? ""),
    location: String(formData.get("location") ?? ""),
    description: String(formData.get("description") ?? ""),
    type: String(formData.get("type") ?? ""),
  };

  const parsed = projectSchema.safeParse(rawValues);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Dati progetto non validi.");
  }

  const files = formData
    .getAll("images")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);
  const uploadedImages = await saveFiles(files, "projects");

  if (!uploadedImages.length) {
    throw new Error("Carica almeno una immagine del progetto.");
  }

  await prisma.project.create({
    data: {
      ...parsed.data,
      images: uploadedImages,
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/portfolio");
  redirect("/admin/projects");
}

export async function updateProjectAction(formData: FormData) {
  await requireAdmin();

  const projectId = String(formData.get("projectId") ?? "");
  if (!projectId) {
    throw new Error("ID progetto mancante.");
  }

  const rawValues = {
    title: String(formData.get("title") ?? ""),
    location: String(formData.get("location") ?? ""),
    description: String(formData.get("description") ?? ""),
    type: String(formData.get("type") ?? ""),
  };
  const parsed = projectSchema.safeParse(rawValues);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Dati progetto non validi.");
  }

  const existingProject = await prisma.project.findUnique({
    where: { id: projectId },
    select: { images: true },
  });

  if (!existingProject) {
    throw new Error("Progetto non trovato.");
  }

  const keptImages = formData
    .getAll("existingImages")
    .map((value) => String(value))
    .filter(Boolean);

  const newFiles = formData
    .getAll("images")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);
  const newUploadedImages = await saveFiles(newFiles, "projects");

  const finalImages = [...keptImages, ...newUploadedImages];
  if (!finalImages.length) {
    throw new Error("Il progetto deve contenere almeno una immagine.");
  }

  const removedImages = existingProject.images.filter((image) => !keptImages.includes(image));
  if (removedImages.length) {
    await removeLocalFiles(removedImages);
  }

  await prisma.project.update({
    where: { id: projectId },
    data: {
      ...parsed.data,
      images: finalImages,
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath(`/admin/projects/${projectId}/edit`);
  revalidatePath("/portfolio");
  revalidatePath(`/portfolio/${projectId}`);
  redirect("/admin/projects");
}
