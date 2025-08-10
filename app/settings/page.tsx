import { TermsOfService } from "@/components/terms-of-service";
import ThemeSwitcher from "@/components/theme-switcher";

export default function SettingsPage() {
  return (
    <div>
      <ThemeSwitcher />
      <TermsOfService />
    </div>
  );
}
