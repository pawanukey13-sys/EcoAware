import { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  const [darkMode, setdarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme","dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme","light");
    }
  }, [darkMode]);
  const toggletheme = () => {
    setdarkMode((prev) => !prev);
  };
  return (
    <ThemeContext.Provider value={{ darkMode, toggletheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useTheme = () => useContext(ThemeContext);
