import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { Idea } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";

const filePath = path.join(process.cwd(), "ideas.json");

async function readIdeas(): Promise<Idea[]> {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

async function writeIdeas(ideas: Idea[]): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(ideas, null, 2));
}

// GET: Fetch ideas with pagination
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const search = searchParams.get("search") || "";
  const pageSize = 20;

  let ideas = await readIdeas();

  // Filter ideas based on search term
  if (search) {
    ideas = ideas.filter(
      (idea) =>
        idea.summary.toLowerCase().includes(search.toLowerCase()) ||
        idea.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Sort by upvotes (descending)
  ideas.sort((a, b) => b.upvotes - a.upvotes);

  // Paginate
  const total = ideas.length;
  const start = (page - 1) * pageSize;
  const paginatedIdeas = ideas.slice(start, start + pageSize);

  return NextResponse.json({ ideas: paginatedIdeas, total });
}

// POST: Create a new idea
export async function POST(request: Request) {
  const body = await request.json();
  const { summary, description, employeeId, priority } = body;

  if (!summary || !description || !employeeId) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const ideas = await readIdeas();
  const newIdea: Idea = {
    id: uuidv4(),
    summary,
    description,
    employeeId,
    priority: priority || "Low",
    upvotes: 0,
    downvotes: 0,
    createdAt: new Date().toISOString(),
  };

  ideas.push(newIdea);
  await writeIdeas(ideas);

  return NextResponse.json(newIdea);
}

// PATCH: Update votes for an idea
export async function PATCH(
  request: Request,
  { params }: { params: { id?: string[] } }
) {
  const id = params.id?.[0];
  if (!id) {
    return NextResponse.json({ error: "Idea ID is required" }, { status: 400 });
  }

  const body = await request.json();
  const { action } = body; // 'upvote' or 'downvote'

  const ideas = await readIdeas();
  const ideaIndex = ideas.findIndex((idea) => idea.id === id);

  if (ideaIndex === -1) {
    return NextResponse.json({ error: "Idea not found" }, { status: 404 });
  }

  if (action === "upvote") {
    ideas[ideaIndex].upvotes += 1;
  } else if (action === "downvote") {
    ideas[ideaIndex].downvotes += 1;
  } else {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  await writeIdeas(ideas);
  return NextResponse.json(ideas[ideaIndex]);
}

// DELETE: Delete an idea
export async function DELETE(
  request: Request,
  { params }: { params: { id?: string[] } }
) {
  const id = params.id?.[0];
  if (!id) {
    return NextResponse.json({ error: "Idea ID is required" }, { status: 400 });
  }

  const ideas = await readIdeas();
  const updatedIdeas = ideas.filter((idea) => idea.id !== id);

  if (ideas.length === updatedIdeas.length) {
    return NextResponse.json({ error: "Idea not found" }, { status: 404 });
  }

  await writeIdeas(updatedIdeas);
  return NextResponse.json({ message: "Idea deleted" });
}
