import { Suspense } from "react";
import VerifyEmailClient from "./VerifyEmailClient";
import LoadingSpinner from "@/components/shared/Loading";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <VerifyEmailClient />
    </Suspense>
  );
}
