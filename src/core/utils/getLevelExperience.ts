export const MAX_LEVEL = 50;
export const EXP_FOR_MAX_LEVEL = 100_000n;

export const getLevelExperience = (level: number): bigint => {
  if (level >= MAX_LEVEL) {
    return EXP_FOR_MAX_LEVEL;
  }

  const base = 100;
  const growRate = 1.775;

  const currentExp = BigInt(Math.round(base * Math.pow(level - 1, growRate)));
  const nextLevelExp = BigInt(Math.round(base * Math.pow(level, growRate)));

  return nextLevelExp - currentExp;
};
