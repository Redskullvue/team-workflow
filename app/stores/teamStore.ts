export const useTeamStore = defineStore("teamStore", () => {
  const authStore = useAuthStore();
  const teamMembers = ref<TeamMember[]>([]);
  const getTeamMembers = async (): Promise<void> => {
    try {
      const response = await $fetch<TeamResponse>("/api/team/members", {
        method: "GET",
        headers: {
          Authorization: `${authStore.token}`,
        },
      });
      teamMembers.value = response.members;
    } catch (error: unknown) {
      const msg =
        (error as any)?.data?.message || "Failed to fetch team members";
      throw new Error(msg);
    }
  };

  return {
    teamMembers,
    getTeamMembers,
  };
});
