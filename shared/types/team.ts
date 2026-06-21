export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatarInitials: string;
  tasksCount: number;
}

export interface TeamResponse {
  members: TeamMember[];
}
