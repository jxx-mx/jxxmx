import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/drawer";
import { Button } from "@/components/button";
import ThemeSwitcher from "./theme-switcher";

export function Footer() {
  return (
    <Drawer>
      <DrawerTrigger asChild className="my-4">
        <Button
          variant="outline"
          className="w-full text-xs font-normal text-secondary-foreground"
        >
          이용안내 및 주의사항
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle className="sr-only" />
        <footer className="mt-8 max-w-7xl mx-auto p-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-xs text-foreground/50">
              © {new Date().getFullYear()} ISSUE CHECK
            </p>
            <p className="text-xs text-foreground/50">
              본 서비스는 GNews API를 통해 수집된 외부 뉴스 기사를 키워드
              기반으로 제공하며 DeepL API를 통해 번역된 내용을 포함할 수
              있습니다. 번역 과정에서 의미 왜곡이나 오류가 발생할 수 있으며
              제공되는 정보의 정확성·완전성·시의성에 대해 보장하지 않습니다.
              뉴스 콘텐츠의 저작권은 각 원문 출처에 있으며 투자·법률·의료 등
              중요한 의사결정에 앞서 반드시 원문과 공신력 있는 출처를 확인하시기
              바랍니다.
            </p>
          </div>
          <ThemeSwitcher />
        </footer>
      </DrawerContent>
    </Drawer>
  );
}
