import { colors } from "../theme/colors";
import { Element } from "../types";

export const getElementColor = (element: Element): string => {
  return colors[element] || "#000000";
};
