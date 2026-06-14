export interface Task {
  id: string;
  status: "done" | "in-progress" | "todo";
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
