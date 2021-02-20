import React, { useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

const spacing = {
  //Spacing
  spacingXs: "8px",
  spacingS: "16px",
  spacingM: "24px",
  spacingL: "32px",
  spacingXl: "40px",
  spacing2Xl: "48px",

  //Text Sizing
  textXs: "12px",
  textS: "14px",
  textM: "16px",
  textL: "18px",

  //Shadowing => x | y | blur | spread | color
  cardHover: "0px 20px 46px 0px rgba(0, 0, 0, 0.10)",
  cardBase: "0px 3px 2px 0px rgba(0, 0, 0, 0.15)",
  menuBase: "0px 20px 10px 0px rgba(0, 0, 0, 0.10)",
  dialogsBase: "0px 34px 80px 0px rgba(0, 0, 0, 0.06)",

  //Border Radius
  radiusS: "4px",
  radiusL: "8px",

  // responsive breakpoints
  mobile: "768px",
  tablet: "1024px",
};

const light = {
  //Spacing
  spacingXs: "8px",
  spacingS: "16px",
  spacingM: "24px",
  spacingL: "32px",
  spacingXl: "40px",
  spacing2Xl: "48px",
};

const dark = {
  //Spacing
  spacingXs: "8px",
  spacingS: "16px",
  spacingM: "24px",
  spacingL: "32px",
  spacingXl: "40px",
  spacing2Xl: "48px",
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({ ...spacing, ...light });

  const chooseTheme = (type) => {
    switch (type) {
      case "light":
        setTheme({ ...spacing, ...light });
        break;
      case "dark":
        setTheme({ ...spacing, ...dark });
        break;

      default:
        setTheme({ ...spacing, ...light });
        break;
    }
  };

  return (
    <StyledThemeProvider theme={{ theme, chooseTheme }}>
      {children}
    </StyledThemeProvider>
  );
};
