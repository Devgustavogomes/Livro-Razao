import { readFile, writeFile } from "fs/promises";
import { join } from "path";

export async function readDB<T>(file: string): Promise<T[]> {
  try {
    const data = await readFile(
      join(process.cwd(), "src", "database", file),
      "utf-8"
    );

    return JSON.parse(data) as T[];
  } catch {
    return [];
  }
}

export async function writeDB<T>(file: string, data: T): Promise<void> {
  await writeFile(
    join(process.cwd(), "src", "database", file),
    JSON.stringify(data, null, 2),
    "utf-8"
  );
}
