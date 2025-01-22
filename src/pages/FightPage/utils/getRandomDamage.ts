export const getRandomDamage = (value: number) => {
  const min = Math.round(value * 0.85);
  const max = Math.round(value * 1.15);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
