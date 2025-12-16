import { PagesHeader } from "@/components/client/PagesHeader";

export default function termsPage() {
    return (
      <PagesHeader
        title="Terms and Conditions"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Terms and Conditions" },
        ]}
      />
    );
}