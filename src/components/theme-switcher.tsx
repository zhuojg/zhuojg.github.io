import { Button } from "@base-ui/react/button";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/utils";

export function ThemeSwitcher({className}: {className?:string}) {
  const { theme, systemTheme, setTheme } = useTheme();

  return (
    <Button
      className={cn("text-left hover:underline underline-offset-4 cursor-pointer", className)}
      onClick={() => {
        if (theme === "system") {
          if (systemTheme === "dark") {
            setTheme("light");
          } else {
            setTheme("dark");
          }
        } else if (theme === "dark") {
          setTheme("light");
        } else {
          setTheme("dark");
        }
      }}
    >
      {theme === "system" ? systemTheme : theme}
    </Button>
  );
}
