import { useTheme } from "next-themes";

const useCurrentTheme = () => {
  let { theme, systemTheme, setTheme } = useTheme();
  if (theme === "system") theme = systemTheme;
  if (!theme) {
    theme = localStorage.getItem('theme') || 'light';
  }

  return { theme: theme as string, setTheme };
};

export default useCurrentTheme;
