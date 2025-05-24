import { Idea, Employee } from "./types";

export async function fetchEmployees(): Promise<Employee[]> {
  const res = await fetch("/api/employees");
  if (!res.ok) throw new Error("Failed to fetch employees");
  return res.json();
}

export async function fetchIdeas(
  page: number,
  search: string
): Promise<{ ideas: Idea[]; total: number }> {
  const res = await fetch(
    `/api/ideas?page=${page}&search=${encodeURIComponent(search)}`
  );
  if (!res.ok) throw new Error("Failed to fetch ideas");
  return res.json();
}

export async function createIdea(
  data: Omit<Idea, "id" | "upvotes" | "downvotes" | "createdAt">
): Promise<Idea> {
  const res = await fetch("/api/ideas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create idea");
  return res.json();
}

export async function voteIdea(
  id: string,
  action: "upvote" | "downvote"
): Promise<Idea> {
  const res = await fetch(`/api/ideas/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action }),
  });
  if (!res.ok) throw new Error("Failed to vote");
  return res.json();
}

export async function deleteIdea(id: string): Promise<void> {
  const res = await fetch(`/api/ideas/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete idea");
}
