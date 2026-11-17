import { useTranslation } from "react-i18next";
import { PageLayout } from "../../layouts/PageLayout";

export function TermsPage() {
  const { t } = useTranslation();
  return (
    <PageLayout>
      <h1 className="text-2xl font-semibold">{t("legal.terms.title")}</h1>
      <p>{t("legal.terms.body")}</p>
    </PageLayout>
  );
}
