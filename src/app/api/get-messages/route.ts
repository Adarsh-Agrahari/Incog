import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(request: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const user: User | undefined = session?.user;

    if (!session || !user) {
        return Response.json({
            success: false,
            message: "Not Authenticated"
        }, { status: 401 });
    }

    const userId = new mongoose.Types.ObjectId(user._id);
    try {
        const userMessages = await UserModel.aggregate([
            { $match: { _id: userId } },
            { $unwind: '$messages' },
            { $sort: { 'messages.createdAt': -1 } },
            { $group: { _id: '$_id', messages: { $push: '$messages' } } }
        ]);

        if (!userMessages || userMessages.length === 0) {
            return Response.json({
                success: false,
                message: "No messages found for the user"
            }, { status: 404 });
        }

        return Response.json({
            success: true,
            messages: userMessages[0].messages
        }, { status: 200 });
    } catch (error) {
        console.error("An unexpected error occurred while fetching messages:", error);
        return Response.json({
            success: false,
            message: "An error occurred while fetching messages"
        }, { status: 500 });
    }
}
