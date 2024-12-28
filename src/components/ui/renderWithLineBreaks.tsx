import { formatTextWithElements } from "./formatTextWithElements";

export const renderWithLineBreaks = (formattedText: string | undefined) => {
  if (!formattedText) return null;

  return formattedText.split("\n").map((line, index) => (
    <span key={index}>
      {formatTextWithElements(line)}
      <br />
    </span>
  ));
};
