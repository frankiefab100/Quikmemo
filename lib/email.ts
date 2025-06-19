import React from "react";
import { Resend } from "resend";
interface SendEmailOptions {
    to: string;
    subject: string;
    text: string;
    html?: string;
    react?: React.ReactElement;
}

export async function sendEmail({ to, subject, text, html, react }: SendEmailOptions) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
        const data = await resend.emails.send({
            from: `Quikmemo <${process.env.FROM_EMAIL}>`,
            to,
            subject,
            text,
            html,
            react,
        });
        // console.log("Resend data:", data);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}