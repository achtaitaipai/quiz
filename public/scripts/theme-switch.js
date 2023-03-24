const storageKey = "theme";
let currentTheme;

/**
 *
 * @returns "dark" | "light"
 */
const getTheme = () => {
  const preference = localStorage.getItem(storageKey);
  if (preference) return preference;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const setPreference = () => {
  localStorage.setItem(storageKey, currentTheme);
  setTheme();
};

const setTheme = () => {
  document.documentElement.setAttribute("data-theme", currentTheme);
  document
    ?.getElementById("theme-switch")
    ?.setAttribute("aria-label", currentTheme);
};

window.onload = () => {
  console.log(document.getElementById("theme-switch"));
  setTheme();
  document
    .getElementById("theme-switch")
    .addEventListener("click", handleClick);
};

const handleClick = () => {
  currentTheme = currentTheme === "light" ? "dark" : "light";
  setPreference();
};

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches: isDark }) => {
    currentTheme = isDark ? "dark" : "light";
    setPreference();
  });

currentTheme = getTheme();
