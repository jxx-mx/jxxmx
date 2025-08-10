import { TermsOfService } from "@/components/terms-of-service";
import ThemeSwitcher from "@/components/theme-switcher";
import { OrganizationSwitcher } from "@clerk/nextjs";

export default function SettingsPage() {
  return (
    <div>
      <ThemeSwitcher />
      <TermsOfService />
      <OrganizationSwitcher />
    </div>
  );
}
