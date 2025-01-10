export const darkenColor = (hex: string): string => {
  // Убираем символ #, если он есть
  const normalizedHex = hex.startsWith("#") ? hex.slice(1) : hex;

  // Преобразуем HEX в RGB
  const r = parseInt(normalizedHex.substring(0, 2), 16);
  const g = parseInt(normalizedHex.substring(2, 4), 16);
  const b = parseInt(normalizedHex.substring(4, 6), 16);

  // Функция для затемнения на 60%
  const darken = (color: number): number =>
    Math.max(0, Math.floor(color * 0.4));

  // Применяем затемнение
  const newR = darken(r);
  const newG = darken(g);
  const newB = darken(b);

  // Конвертируем обратно в HEX
  const toHex = (color: number): string => color.toString(16).padStart(2, "0");

  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
};
