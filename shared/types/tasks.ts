export interface Task {
  id: string;
  status: "done" | "in-progress" | "todo";
  priority: "high" | "medium" | "low";
  title: string;
  description?: string;
  createdAt: string;
  finishedAt?: string;
  assignedTo?: string;
}

export interface TasksResponse {
  success: boolean;
  tasks: Task[];
}

export interface TaskCreateBody {
  title: string;
  description?: string;
  status: "done" | "in-progress" | "todo";
  priority: "high" | "medium" | "low";
  finishedAt?: string;
  assignedTo?: string;
}

export interface TaskCreateResponse {
  success: boolean;
  tasks: Task[];
}
