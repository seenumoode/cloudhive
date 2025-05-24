"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { voteIdea, deleteIdea } from "@/lib/api";
import { Idea, Employee } from "@/lib/types";
import TWButton from "./ui/TWButton";
import Link from "next/link";
import { FC } from "react";

interface IdeaCardProps {
  idea: Idea;
  employee: Employee | undefined;
}

const IdeaCard: FC<IdeaCardProps> = ({ idea, employee }) => {
  const queryClient = useQueryClient();

  const voteMutation = useMutation({
    mutationFn: (action: "upvote" | "downvote") => voteIdea(idea.id, action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ideas"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteIdea(idea.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ideas"] });
    },
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-lg transition-shadow">
      <div className="flex-1">
        <Link href={`/ideas/${idea.id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
            {idea.summary}
          </h3>
        </Link>
        <p className="text-sm text-gray-600">
          Submitted by: {employee?.name || "Unknown"}
        </p>
        <p className="text-sm text-gray-600">Priority: {idea.priority}</p>
        <p className="text-sm text-gray-600">
          Upvotes: {idea.upvotes} | Downvotes: {idea.downvotes}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <TWButton
          onClick={() => voteMutation.mutate("upvote")}
          disabled={voteMutation.isPending}
        >
          Upvote
        </TWButton>
        <TWButton
          variant="secondary"
          onClick={() => voteMutation.mutate("downvote")}
          disabled={voteMutation.isPending}
        >
          Downvote
        </TWButton>
        <TWButton
          variant="danger"
          onClick={() => deleteMutation.mutate()}
          disabled={deleteMutation.isPending}
        >
          Delete
        </TWButton>
      </div>
    </div>
  );
};

export default IdeaCard;
