/** biome-ignore-all lint/performance/noImgElement: <Image do Next não funciona> */
import { useEffect, useState } from "react";

interface SkillIconProps {
  icon: string;
}

export function SkillIcon({ icon }: SkillIconProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  });

  return (
    <img
      src={`https://skillicons.dev/icons?i=${icon}&theme=${isDark ? "dark" : "light"}`}
      alt={`icon`}
      width={icon.includes(",") ? 50 : 25}
      height={25}
    />
  );
}
