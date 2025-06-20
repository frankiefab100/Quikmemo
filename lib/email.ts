import { Resend } from "resend"
import { render } from "@react-email/render"
import VerificationEmail from "@/emails/verification-email"

const resend = new Resend(process.env.RESEND_API_KEY!)

interface SendEmailOptions {
    to: string
    subject: string
    text: string
    html?: string
}

export async function sendEmail({ to, subject, text, html }: SendEmailOptions) {
    try {
        const data = await resend.emails.send({
            from: "Quikmemo <no-reply@quikmemo.frankiefab.com>",
            to,
            subject,
            text,
            html,
        })

        return data
    } catch (error) {
        console.error("Error sending email:", error)
        throw error
    }
}

export async function sendVerificationEmail(email: string, token: string, firstName?: string) {
    const url = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`

    const emailHtml = await render(
        VerificationEmail({
            url,
            firstName,
            email,
        })
    )

    return await sendEmail({
        to: email,
        subject: "Verify your email address",
        text: `Please verify your email by visiting: ${url}`,
        html: emailHtml,
    })
}
