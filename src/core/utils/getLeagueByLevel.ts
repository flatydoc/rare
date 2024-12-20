export const getLeagueByLevel = (level: number): string => {
  if (level < 1 || level > 100) {
    throw new Error("Level must be between 1 and 100");
  }

  const leagues = [
    "Unranked",
    "Bronze",
    "Silver",
    "Gold",
    "Platinum",
    "Diamond",
    "Master",
  ];
  const thresholds = [1, 9, 29, 49, 69, 89, 100];

  const index = thresholds.findIndex((threshold) => level <= threshold);
  return leagues[index];
};
