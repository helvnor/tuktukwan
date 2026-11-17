import { useTranslation } from "react-i18next";
import { PageLayout } from "../../layouts/PageLayout";

export function PrivacyPage() {
  const { t } = useTranslation();
  return (
    <PageLayout>
      <h1 className="text-2xl font-semibold">{t("legal.privacy.title")}</h1>
      <p className="max-w-[65ch]">{t("legal.privacy.body")}</p>
    </PageLayout>
  );
}
