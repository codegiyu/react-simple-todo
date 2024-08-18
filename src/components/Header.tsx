import sun from "/icons/sun.svg";
import moon from "/icons/moon.svg";
import { useCallback, useEffect } from "react";

const Header = () => {
  const setTheme = (theme: "light" | "dark") => {
    localStorage.setItem("todo-theme", theme);
    const html = document.documentElement;

    if (theme === "light") {
        html.classList.remove("dark");
    } else {
        html.classList.add("dark");
    }
  };

  const handleTheme = useCallback(() => {
    const storedTheme = localStorage.getItem("todo-theme");

    if (storedTheme === "light") {
        setTheme("light");
    } else if (storedTheme === "dark") {
        setTheme("dark");
    } else {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }
  }, []);

  useEffect(() => handleTheme(), [handleTheme]);

  return (
    <header>
      <h1>TODO</h1>
      <div className="theme">
        <button className="theme-btn focus-visible set-light-theme-btn" onClick={() => setTheme("light")}>
            <img src={sun} alt="sun" title="set light theme" />
        </button>
        <button className="theme-btn focus-visible set-dark-theme-btn" onClick={() => setTheme("dark")}>
            <img src={moon} alt="moon" title="set dark theme" />
        </button>
      </div>
    </header>
  )
}

export default Header