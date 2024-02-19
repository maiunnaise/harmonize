import React, { useState } from "react";
import Toggle from "react-toggle";
import { useMediaQuery } from "react-responsive";
import "react-toggle/style.css"
import "./DarkModeToggle.css";

export const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  let toggle = document.querySelector('.react-toggle');
  
  const lightMode = localStorage.getItem("lightMode");
  if (lightMode && toggle !== null) {
    if (lightMode === "light") {
      document.querySelector("body").classList.add("light");
      toggle.classList.remove("react-toggle--checked");
      toggle.classList.add("react-toggle--focus");
    } else {
      document.querySelector("body").classList.remove("light");
      toggle.classList.remove("react-toggle--focus");
      toggle.classList.add("react-toggle--checked");
    }
  // } else if (systemPrefersDark) {
  //   document.querySelector("body").classList.add("light");
  }


  const switchLight = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.querySelector("body").classList.add("light");
      localStorage.setItem("lightMode", "light");
    } else {
      document.querySelector("body").classList.remove("light");
      localStorage.setItem("lightMode", "dark");
    }
  };

  return (
    <Toggle
      checked={isDark}
      // onChange={({ target }) => setIsDark(target.checked)}
      onChange={switchLight}
      icons={{ checked: "🌙", unchecked: "🔆" }}
      aria-label="Dark mode toggle"
    />
  );
};