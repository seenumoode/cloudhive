"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchIdeas, fetchEmployees } from "@/lib/api";
import IdeaCard from "./IdeaCard";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import { Employee } from "@/lib/types";
import { FC } from "react";

const IdeaList: FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const {
    data: ideasData,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["ideas", page, search],
    queryFn: () => fetchIdeas(page, search),
  });

  const { data: employees = [] } = useQuery<Employee[]>({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });

  const ideas = ideasData?.ideas || [];
  const total = ideasData?.total || 0;
  const pageSize = 20;
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="space-y-6 p-4 sm:p-6 md:p-8">
      <SearchBar onSearch={setSearch} />
      {isLoading || isFetching ? (
        <p className="text-center text-gray-600">Loading ideas...</p>
      ) : ideas.length === 0 ? (
        <p className="text-center text-gray-600">No ideas found.</p>
      ) : (
        <div className="space-y-4">
          {ideas.map((idea) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              employee={employees.find((emp) => emp.id === idea.employeeId)}
            />
          ))}
        </div>
      )}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default IdeaList;
