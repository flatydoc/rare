import { forwardRef } from "react";
import { colors } from "../core/theme/colors";

type ButtonProp = {
  prefixSvg?: React.ReactNode;
  children: React.ReactNode;
  variant?: string;
  fullWidth?: boolean;
  stylesProp?: React.CSSProperties;
  isTonItem?: boolean;
  postfixSvg?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const MainButton = forwardRef<HTMLButtonElement, ButtonProp>(
  (
    {
      prefixSvg,
      postfixSvg,
      children,
      disabled,
      fullWidth,
      stylesProp,
      variant = "primary",
      ...restProp
    },
    ref
  ) => {
    const styledByVariant = {
      primary: {
        borderRadius: "14px",
        padding: "8px 16px",
        minHeight: "48px",
        background: disabled ? "rgba(225, 225, 225, 0.2)" : colors.secondary,
        border: `1px solid ${
          disabled ? colors.secondaryTextColor : "rgb(15,15,15)"
        }`,
        cursor: disabled ? "not-allowed" : "pointer",
      },
      ton: {
        borderRadius: "16px",
        padding: "14px",
        minHeight: "48px",
        background: "#31A6F5",
        border: `none`,
        cursor: "pointer",
      },
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        style={{
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
          width: fullWidth ? "100%" : "fit-content",
          minWidth: "100px",
          ...styledByVariant[variant as keyof typeof styledByVariant],
          ...stylesProp,
        }}
        {...restProp}
      >
        {prefixSvg}
        {children}
        {postfixSvg}
      </button>
    );
  }
);
