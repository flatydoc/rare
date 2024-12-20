export const formatNumber = (number: number) => {
  if (number < 1000) {
    return number.toString();
  } else if (number < 100000) {
    const str = number.toString();
    return str.length === 4
      ? `${str[0]} ${str.slice(1)}`
      : `${str.slice(0, 2)} ${str.slice(2)}`;
  } else if (number < 1000000) {
    const rounded = (number / 1000).toFixed(1);
    return `${rounded}K`;
  } else {
    const rounded = (number / 1000000).toFixed(1);
    return `${rounded}M`;
  }
};
