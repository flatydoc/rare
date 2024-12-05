import { useUserStore } from "../../../core/store/useUserStore";

export const UsernameDisplay = () => {
  const username = useUserStore((state) => state.user?.username);

  if (!username) return <div>Loading username...</div>;

  return <div>Welcome, {username}!</div>;
};
