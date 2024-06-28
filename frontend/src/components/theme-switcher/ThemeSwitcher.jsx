import { React, useState } from "react";
import "./ThemeSwitcher.css";

const ThemeSwitcher = () => {
  const themes = [
    "light-theme",
    "dark-theme",
    "mocha-theme",
    "blue-theme",
    "mint-theme",
    "pink-theme",
  ];

  const [currentTheme, setCurrentTheme] = useState("light-theme");

  const switchTheme = (theme) => {
    // const nextTheme = (currentTheme + 1) % themes.length;
    document.body.classList.remove(currentTheme);
    document.body.classList.add(theme);
    setCurrentTheme(theme);
  };

  return (
    <>
      <div className="switcher">
        {themes.map((theme, index) => (
          <button
            className="theme-button"
            key={index}
            onClick={() => switchTheme(theme)}
            style={{ backgroundColor: `var(--primary-color-${theme})` }}
          ></button>
        ))}
      </div>
    </>
  );
};

export default ThemeSwitcher;
