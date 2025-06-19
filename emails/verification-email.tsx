import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Button,
} from "@react-email/components";

interface VerificationEmailProps {
  url: string;
  firstName?: string;
  email: string;
}

export default function VerificationEmail({
  url,
  firstName,
  email,
}: VerificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Verify your email for Quikmemo</Preview>
      <Body style={{ background: "#f9f9f9", fontFamily: "sans-serif" }}>
        <Container
          style={{
            background: "#fff",
            borderRadius: 8,
            margin: "40px auto",
            padding: 32,
            maxWidth: 480,
          }}
        >
          <Section>
            <Text
              style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}
            >
              Welcome, {firstName || email}!
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 24 }}>
              Please verify your email address to activate your Quikmemo
              account.
            </Text>
            <Button
              href={url}
              style={{
                background: "#2563eb",
                color: "#fff",
                padding: "12px 24px",
                borderRadius: 6,
                fontWeight: "bold",
                textDecoration: "none",
                fontSize: 16,
              }}
            >
              Verify Email
            </Button>
            <Text style={{ fontSize: 14, marginTop: 32, color: "#888" }}>
              If you did not sign up for Quikmemo, you can safely ignore this
              email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
