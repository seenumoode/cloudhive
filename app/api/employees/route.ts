import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { Employee } from "@/lib/types";

export async function GET() {
  const filePath = path.join(process.cwd(), "employees.json");
  const data = await fs.readFile(filePath, "utf-8");
  const employees: Employee[] = JSON.parse(data);
  return NextResponse.json(employees);
}
