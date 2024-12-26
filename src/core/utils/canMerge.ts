const requiredLevelByStars = [5, 10, 15, 20, 25];

export const getRequiredLevelText = (stars: number, level: number): string => {
  if (stars >= requiredLevelByStars.length || level > 25) {
    return "Max stars reached";
  }
  return `Required level: ${requiredLevelByStars[stars]}`;
};

export const canMerge = (level: number, stars: number): boolean => {
  if (stars >= requiredLevelByStars.length || level > 25) {
    return false;
  }
  return level >= requiredLevelByStars[stars];
};
