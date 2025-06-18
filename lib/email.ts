import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

interface SendEmailOptions {
    to: string;
    subject: string;
    text: string;
    html?: string;
}

export async function sendEmail({ to, subject, text, html }: SendEmailOptions) {
    try {
        const data = await resend.emails.send({
            from: "Quikmemo <no-reply@quikmemo.frankiefab.com>",
            to,
            subject,
            text,
            html,
        });

        // console.log("Resend data:", data);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}
