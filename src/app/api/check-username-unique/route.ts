import { NextRequest, NextResponse } from 'next/server';
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
    username: usernameValidation
});

export async function GET(request: NextRequest) {
    await dbConnect();
    
    try {
        const username = request.nextUrl.searchParams.get('username');

        if (!username) {
            return NextResponse.json({
                success: false,
                message: 'Username parameter is missing'
            }, { status: 400 });
        }

        const result = UsernameQuerySchema.safeParse({ username });
        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || [];
            return NextResponse.json({
                success: false,
                message: usernameErrors?.length > 0 ? usernameErrors.join(', ') : 'Invalid query parameters'
            }, { status: 400 });
        }

        const { username: validatedUsername } = result.data;

        const existingVerifiedUser = await UserModel.findOne({ 
            username: { $regex: new RegExp(`^${validatedUsername}$`, 'i') },
            isVerified: true 
        });

        if (existingVerifiedUser) {
            return NextResponse.json({
                success: false,
                message: 'Username is already taken'
            }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            message: 'Username is unique',
        }, { status: 200 });

    } catch (error) {
        console.error("Error checking username", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while checking the username"
        }, { status: 500 });
    }
}