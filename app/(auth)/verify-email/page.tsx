import { verifyEmail } from "@/actions/verification.action";
import VerifyEmailMessage from "./VerifyEmailMessage";

interface VerifyEmailPageProps {
  searchParams: {
    token?: string;
  };
}

const VerifyEmailPage = async ({ searchParams }: VerifyEmailPageProps) => {
  const token = searchParams.token;
  const result = token ? await verifyEmail(token) : { error: "Invalid token" };

  return <VerifyEmailMessage result={result} />;
};

export default VerifyEmailPage;
