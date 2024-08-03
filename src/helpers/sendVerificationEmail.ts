import emailjs from "@emailjs/browser";
import VerificationEmail from "../../emails/VerificationEmails";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse>{
    try {
        await emailjs
        .send(
          // EMAILJS_SERVICE_ID,
          "",
          // EMAILJS_TEMPLATE_ID,
          "",
          {
            // Add other variables that used in email js
            to_name: "Rishab",
            to_email: email,
            message: VerificationEmail({username, otp: verifyCode}),
          },
          // EMAILJS_PUBLIC_KEY
          ""
        )
        return {success: true, message: "Verification email send successfully"}
    } catch (emailError) {
        console.error("Error sending verification email", emailError)
        return {success: false, message: "Failed to send verification email"}
    }
}