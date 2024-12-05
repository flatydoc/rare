import { useUserStore } from "../../../core/store/useUserStore";

export const EnergyDisplay: React.FC = () => {
  const energy = useUserStore((state) => state.user?.energy);

  if (energy === undefined) {
    return <div>Loading energy...</div>;
  }

  return (
    <div style={{ fontSize: "18px", fontWeight: "bold", margin: "10px 0" }}>
      Current Energy: {energy}
    </div>
  );
};
