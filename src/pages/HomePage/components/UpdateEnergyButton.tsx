import { useUserStore } from "../../../core/store/useUserStore";

export const UpdateEnergyButton = () => {
  const updateEnergy = useUserStore((state) => state.updateEnergy);

  const handleDecreaseEnergy = () => {
    updateEnergy(50);
  };

  return <button onClick={handleDecreaseEnergy}>Decrease Energy</button>;
};
