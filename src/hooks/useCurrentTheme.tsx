import { useTheme } from "next-themes";

const useCurrentTheme = () => {
  let { theme, systemTheme, setTheme } = useTheme();
  if (theme === "system") theme = systemTheme;

  return { theme: theme as string, setTheme };
};

export default useCurrentTheme;
