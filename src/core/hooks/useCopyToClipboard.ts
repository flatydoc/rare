import { useState, useEffect } from "react";

export const useCopyToClipboard = (
  resetTime: number
): [boolean, (text: string) => Promise<void>] => {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
  };

  useEffect(() => {
    if (!resetTime || !copied) return;
    const id = setTimeout(() => {
      setCopied(false);
    }, resetTime);
    return () => clearTimeout(id);
  }, [resetTime, copied]);

  return [copied, copy];
};
