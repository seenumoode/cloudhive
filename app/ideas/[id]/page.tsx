"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchIdeas, fetchEmployees } from "@/lib/api";
import { useParams } from "next/navigation";
import { Employee } from "@/lib/types";
import Link from "next/link";

export default function IdeaDetails() {
  const { id } = useParams<{ id: string }>();

  const { data: ideasData } = useQuery({
    queryKey: ["ideas", 1, ""], // Fetch all ideas to find the one with the given ID
    queryFn: () => fetchIdeas(1, ""),
  });

  const { data: employees = [] } = useQuery<Employee[]>({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });

  const idea = ideasData?.ideas.find((idea) => idea.id === id);

  if (!idea) {
    return <p className="text-center text-gray-600">Idea not found.</p>;
  }

  const employee = employees.find((emp) => emp.id === idea.employeeId);

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 md:p-8">
      <Link href="/" className="text-blue-600 hover:underline mb-4 block">
        Back to Ideas
      </Link>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {idea.summary}
        </h1>
        <p className="text-sm text-gray-600 mb-1">
          Submitted by: {employee?.name || "Unknown"}
        </p>
        <p className="text-sm text-gray-600 mb-1">Priority: {idea.priority}</p>
        <p className="text-sm text-gray-600 mb-4">
          Upvotes: {idea.upvotes} | Downvotes: {idea.downvotes}
        </p>
        <p className="text-gray-700">{idea.description}</p>
      </div>
    </div>
  );
}
