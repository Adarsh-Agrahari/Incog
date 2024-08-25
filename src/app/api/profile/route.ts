import { NextRequest, NextResponse } from 'next/server';
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function GET(request: NextRequest) {
    await dbConnect();
    
    try {
        const profiles = await UserModel.find();

        return NextResponse.json({
            success: true,
            profiles,
        }, { status: 200 });

    } catch (error) {
        console.error("Error checking username", error);
        return NextResponse.json({
            success: false,
            message: "An error occurred while checking the username"
        }, { status: 500 });
    }
}