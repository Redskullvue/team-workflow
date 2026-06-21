import { requireAuth } from "~~/server/utils/checkAuth";
import type { TeamMember, TeamResponse } from "#shared/types/team";
export default defineEventHandler(async (event): Promise<TeamResponse> => {
  await requireAuth(event);

  const members: TeamMember[] = [
    {
      id: "1",
      name: "Johnathan Smith",
      role: "Member",
      avatarInitials: "JS",
      tasksCount: 2,
    },
    {
      id: "2",
      name: "Amber Burgermap",
      role: "Moderator",
      avatarInitials: "AB",
      tasksCount: 5,
    },
    {
      id: "3",
      name: "Jordan Kane",
      role: "Member",
      avatarInitials: "JK",
      tasksCount: 1,
    },
    {
      id: "4",
      name: "Samire Atalay",
      role: "Admin",
      avatarInitials: "SA",
      tasksCount: 7,
    },
  ];

  return { members };
});
