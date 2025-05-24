"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import TWSelect from "./ui/TWSelect";
import TWButton from "./ui/TWButton";
import { createIdea, fetchEmployees } from "@/lib/api";
import { Employee, Idea } from "@/lib/types";
import { FC } from "react";

interface FormData {
  summary: string;
  description: string;
  employeeId: string;
  priority: "High" | "Medium" | "Low";
}

const IdeaForm: FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient(); // Add queryClient for cache invalidation
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    defaultValues: { priority: "Low", employeeId: "" },
    resolver: async (data) => {
      const errors: any = {};
      if (!data.summary) errors.summary = { message: "Summary is required" };
      if (!data.description)
        errors.description = { message: "Description is required" };
      if (!data.employeeId)
        errors.employeeId = { message: "Employee is required" };
      return { values: data, errors };
    },
  });

  const { data: employees = [] } = useQuery<Employee[]>({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });

  const mutation = useMutation({
    mutationFn: createIdea,
    onSuccess: () => {
      // Invalidate the 'ideas' query to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ["ideas"] });
      router.push("/");
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-xl shadow-md sm:max-w-lg md:p-8"
    >
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Summary
        </label>
        <input
          {...register("summary")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Enter a brief summary"
        />
        {errors.summary && (
          <p className="mt-1 text-sm text-red-500">{errors.summary.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Description
        </label>
        <textarea
          {...register("description")}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-y"
          rows={4}
          placeholder="Describe your idea in detail"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Employee
        </label>
        <TWSelect
          {...register("employeeId")}
          options={employees.map((emp) => ({ value: emp.id, label: emp.name }))}
          placeholder="Select an employee"
          className="w-full"
          onChange={(e) =>
            setValue("employeeId", e.target.value, { shouldValidate: true })
          }
        />
        {errors.employeeId && (
          <p className="mt-1 text-sm text-red-500">
            {errors.employeeId.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Priority
        </label>
        <TWSelect
          {...register("priority")}
          options={[
            { value: "High", label: "High" },
            { value: "Medium", label: "Medium" },
            { value: "Low", label: "Low" },
          ]}
          className="w-full"
          onChange={(e) =>
            setValue("priority", e.target.value as "High" | "Medium" | "Low")
          }
        />
      </div>

      <TWButton type="submit" disabled={mutation.isPending} className="w-full">
        {mutation.isPending ? "Submitting..." : "Submit Idea"}
      </TWButton>
    </form>
  );
};

export default IdeaForm;
