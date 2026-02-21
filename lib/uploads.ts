import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
] as const;

const MAX_FILE_SIZE = 8 * 1024 * 1024;

function extensionFromMimeType(mimeType: string) {
  if (mimeType === "image/png") return "png";
  if (mimeType === "image/webp") return "webp";
  if (mimeType === "image/avif") return "avif";
  return "jpg";
}

export async function saveFiles(
  files: File[],
  folder: "quotes" | "projects",
): Promise<string[]> {
  const destination = path.join(process.cwd(), "public", "uploads", folder);
  await mkdir(destination, { recursive: true });

  const savedPaths: string[] = [];

  for (const file of files) {
    if (!file.size) continue;

    if (!ALLOWED_MIME_TYPES.includes(file.type as (typeof ALLOWED_MIME_TYPES)[number])) {
      throw new Error("Formato file non supportato.");
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new Error("Un file supera il limite massimo di 8MB.");
    }

    const extension = extensionFromMimeType(file.type);
    const fileName = `${Date.now()}-${randomUUID()}.${extension}`;
    const targetFile = path.join(destination, fileName);
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    await writeFile(targetFile, fileBuffer);
    savedPaths.push(`/uploads/${folder}/${fileName}`);
  }

  return savedPaths;
}

export async function removeLocalFiles(files: string[]) {
  const operations = files
    .filter((filePath) => filePath.startsWith("/uploads/"))
    .map((filePath) => {
      const absolutePath = path.join(process.cwd(), "public", filePath.replace(/^\//, ""));
      return unlink(absolutePath).catch(() => undefined);
    });

  await Promise.all(operations);
}
