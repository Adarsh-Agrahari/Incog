import transporter from "@/lib/nodemailer";
import VerificationEmail from "../../emails/VerificationEmails";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER as string,  // Ensure this is a string
            to: email,                              // List of recipients
            subject: 'Verify Your Email',           // Subject line
            html: VerificationEmail({ username, otp: verifyCode }), // HTML body content
        };

        await transporter.sendMail(mailOptions);

        return { success: true, message: "Verification email sent successfully" };
    } catch (emailError) {
        console.error("Error sending verification email", emailError);
        return { success: false, message: "Failed to send verification email" };
    }
}
