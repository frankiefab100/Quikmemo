import { sendVerificationEmail } from "./email";

export async function sendVerificationRequest({
  email,
  token,
  firstName,
}: {
  email: string;
  token: string;
  firstName?: string;
}) {
  await sendVerificationEmail(email, token, firstName);
}