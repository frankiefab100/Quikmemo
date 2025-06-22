import { redirect } from "next/navigation";
import DashboardClient, { ErrorFallback } from "./DashboardClient";
import { ErrorBoundary } from "react-error-boundary";
import { getSession } from "@/lib/getSession";

export default async function DashboardPage() {
  const session = await getSession();

  if (typeof window !== "undefined") {
    // localStorage.setItem("user session", JSON.stringify(session));
    console.log({
      session,
    });
  }

  // if (!session) {
  //   redirect("/login");
  // }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <DashboardClient />
    </ErrorBoundary>
  );
}
