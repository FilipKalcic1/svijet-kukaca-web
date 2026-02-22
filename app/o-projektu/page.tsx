import LegalPage from "@/components/LegalPage";
import { legalPages } from "@/lib/legal";

export default function Page() {
  return <LegalPage page={legalPages["o-projektu"]} />;
}
