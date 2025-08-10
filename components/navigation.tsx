"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/drawer";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navigation = [
  {
    href: "/",
    label: "와치리스트",
    description: "와치리스트를 확인할 수 있어요.",
  },
  {
    href: "/register",
    label: "키워드 등록",
    description: "새로운 키워드를 등록할 수 있어요.",
  },
  {
    href: "/settings",
    label: "설정",
    description: "설정을 변경할 수 있어요.",
  },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Drawer direction="top" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <div className="text-sm font-semibold flex items-center gap-2">
          <p>ISSUE CHECK</p>
          <button className="text-foreground/50 bg-secondary p-[0.05rem] rounded-md">
            <ChevronDown size={18} />
          </button>
        </div>
      </DrawerTrigger>
      <DrawerTitle className="sr-only" />
      <DrawerContent className="flex flex-col gap-2 p-4">
        {navigation.map((item, index) => (
          <Link
            onClick={() => setIsOpen(false)}
            href={item.href}
            key={index}
            className={cn(
              pathname === item.href ? "bg-secondary/80" : "bg-transparent",
              "flex items-center gap-1 px-4 py-2 rounded-2xl"
            )}
          >
            <button type="button" className="text-left">
              <p className="text-xs font-semibold">{item.label}</p>
              <p className="text-[10px] font-normal text-foreground/50">
                {item.description}
              </p>
            </button>
          </Link>
        ))}
      </DrawerContent>
    </Drawer>
  );
}
