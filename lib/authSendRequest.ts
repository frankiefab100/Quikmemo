import React from "react";
import VerificationEmail from "@/emails/verification-email";
import { sendEmail } from "@/lib/email";

export async function sendVerificationRequest({
  identifier,
  url,
  firstName,
}: {
  identifier: string;
  url: string;
  firstName?: string;
}) {
  await sendEmail({
    to: identifier,
    subject: "Verify your email for Quikmemo",
    text: `Verify your email by clicking this link: ${url}`,
    react: React.createElement(VerificationEmail, {
      url,
      email: identifier,
      firstName,
    }),
  });
}