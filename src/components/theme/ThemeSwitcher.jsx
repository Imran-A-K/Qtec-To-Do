import { useState, useEffect } from "react";

import {
  XMarkIcon,
  SunIcon,
  MoonIcon,
  SwatchIcon,
} from "@heroicons/react/24/outline";

import styles from "./ThemeSwitcher.module.css";
import useLocalStorage from "../../hooks/useLocalStorage";

const ThemeSwitcher = () => {
  const [hue, setHue] = useLocalStorage("todo.color", "73");

  //   const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "todo.theme",
    "dark"
    // defaultDark ? "dark" : "light"
  );

  const [isColorPicking, setIsColorPicking] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("color-scheme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty("--_hue", hue);
  }, [hue]);

  return (
    <aside className={styles.wrapper}>
      {isColorPicking ? (
        <div className={styles.themeSwitch}>
          <input
            className={styles.picker}
            type="range"
            min="0"
            max="360"
            aria-label="Change color theme slider"
            value={hue}
            onInput={(e) => setHue(e.target.value)}
          />
          <button
            className="btn"
            aria-label="Close color picking mode"
            onClick={() => setIsColorPicking(false)}
          >
            <XMarkIcon />
          </button>
        </div>
      ) : (
        <div className={styles.btns}>
          <button
            className="btn"
            aria-label={`Change theme to ${
              theme === "light" ? "dark" : "light"
            } mode`}
            role="switch"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            className="btn"
            aria-label="Enable color picking mode"
            onClick={() => setIsColorPicking(true)}
          >
            <SwatchIcon />
          </button>
        </div>
      )}
    </aside>
  );
};
export default ThemeSwitcher;
