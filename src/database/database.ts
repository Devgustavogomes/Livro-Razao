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
  const dataStored = await readDB(file);

  dataStored.push(data);

  await writeFile(
    join(process.cwd(), "src", "database", file),
    JSON.stringify(dataStored, null, 2),
    "utf-8"
  );
}
