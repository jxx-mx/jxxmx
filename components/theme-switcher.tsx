"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center border rounded-full p-0.5 w-fit">
      <button
        onClick={() => setTheme("light")}
        className={`flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium transition-colors ${
          theme === "light" ? "bg-secondary border" : "bg-transparent"
        }`}
      >
        <Sun size={14} />
        라이트
      </button>

      <button
        onClick={() => setTheme("dark")}
        className={`flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium transition-colors ${
          theme === "dark" ? "bg-secondary border" : "bg-transparent"
        }`}
      >
        <Moon size={14} />
        다크
      </button>

      <button
        onClick={() => setTheme("system")}
        className={`flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium transition-colors ${
          theme === "system" ? "bg-secondary border" : "bg-transparent"
        }`}
      >
        <Laptop size={14} />
        자동
      </button>
    </div>
  );
}
