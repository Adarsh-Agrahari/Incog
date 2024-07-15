import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";

import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
    username: usernameValidation
});

export async function GET(request: Request){
    await dbConnect();
    
    try {
        const { searchParams } = new URL(request.url);
        const username = searchParams.get('username');

        if (!username) {
            return Response.json({
                success: false,
                message: 'Username parameter is missing'
            }, { status: 400 });
        }

        const result = UsernameQuerySchema.safeParse({ username });
        console.log(result)
        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || [];
            return Response.json({
                success: false,
                message: usernameErrors?.length > 0 ? usernameErrors.join(', ') : 'Invalid query parameters'
            }, { status: 400 });
        }

        const { username: validatedUsername } = result.data;

        const existingVerifiedUser = await UserModel.findOne({ username: validatedUsername, isVerified: true });

        if (existingVerifiedUser) {
            return Response.json({
                success: false,
                message: 'Username is already taken'
            }, { status: 400 });
        }

        return Response.json({
            success: true,
            message: 'Username is unique',
        }, { status: 200 });

    } catch (error) {
        console.error("Error checking username", error);
        return Response.json({
            success: false,
            message: "Error checking username"
        }, { status: 500 });
    }
}
