"use client";

import Link from "next/link";
import { Bell, MessageCirclePlus, Rss, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

const navigation = [
  {
    href: "/",
    icon: Rss,
    label: "와치리스트",
  },
  {
    href: "/register",
    icon: MessageCirclePlus,
    label: "키워드 등록",
  },
  {
    href: "/notification",
    icon: Bell,
    label: "알림",
  },
  {
    href: "/settings",
    icon: Settings,
    label: "마이",
  },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/50 backdrop-blur-sm border-t border-foreground/10 z-50">
      <div className="flex justify-between">
        {navigation.map((item, index) => (
          <Link href={item.href} key={index}>
            <button
              type="button"
              className={`p-4 flex flex-col items-center gap-1 ${
                pathname === item.href ? "text-primary" : "text-foreground/50"
              }`}
            >
              <item.icon size={20} />
              <p className="text-[10px]">{item.label}</p>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}
