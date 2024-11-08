import { createContext, useState, useEffect } from "react";
export const MyContext = createContext();
const MyContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleDarkMode = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme) {
      setTheme(localTheme);
    }
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  return (
    <MyContext.Provider value={{ theme, toggleDarkMode }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;
