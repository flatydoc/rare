import React from "react";
import { getElementColor } from "../../core/utils/getElementColor";
import { Element } from "../../core/types";

export const formatTextWithElements = (text: string): React.ReactNode => {
  const elements: Element[] = [
    "flame",
    "frost",
    "shock",
    "earth",
    "holy",
    "darkness",
    "simple",
    "poison",
  ];

  const regex = new RegExp(
    `(#([^#\\r\\n]+)#)|(\\b${elements.join("\\b|\\b")}\\b)`,
    "gi"
  );

  let lastIndex = 0;
  const matches = [];
  const result: React.ReactNode[] = [];

  text.replace(regex, (match, hashMatch, hashContent, elementMatch, offset) => {
    if (offset > lastIndex) {
      matches.push({ type: "text", content: text.slice(lastIndex, offset) });
    }

    if (hashMatch) {
      matches.push({ type: "hash", content: hashContent });
    } else if (elementMatch) {
      matches.push({ type: "element", content: elementMatch });
    }

    lastIndex = offset + match.length;
    return "";
  });

  if (lastIndex < text.length) {
    matches.push({ type: "text", content: text.slice(lastIndex) });
  }

  matches.forEach((match, index) => {
    if (match.type === "hash") {
      let color = "#fff";
      if (match.content.includes("+")) {
        color = "rgb(0, 190, 0)";
      } else if (match.content.includes("-")) {
        color = "rgb(190, 0, 0)";
      }

      result.push(
        <span
          key={index}
          style={{
            color,
            fontWeight: "500",
          }}
        >
          {match.content}
        </span>
      );
    } else if (match.type === "element") {
      result.push(
        <span
          key={index}
          style={{
            color: getElementColor(match.content as Element),
            fontWeight: "600",
          }}
        >
          {match.content.charAt(0).toUpperCase() + match.content.slice(1)}
        </span>
      );
    } else {
      result.push(<span key={index}>{match.content}</span>);
    }
  });

  return result;
};
