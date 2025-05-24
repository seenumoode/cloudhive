export interface Employee {
  id: string;
  name: string;
}

export interface Idea {
  id: string;
  summary: string;
  description: string;
  employeeId: string;
  priority: "High" | "Medium" | "Low";
  upvotes: number;
  downvotes: number;
  createdAt: string;
}
