import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import DashboardClient, { ErrorFallback } from "./DashboardClient";
import { ErrorBoundary } from "react-error-boundary";

export default async function DashboardPage() {
  const user = await getSession();
  if (!user) {
    redirect("/login");
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <DashboardClient />
    </ErrorBoundary>
  );
}
