import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/dbconfig/dbConfig";
import User from "@/models/User";

dbConnect()

export async function POST(request: NextRequest) {
    
    try {
        const reqBody = await request.json()
        const { token } = reqBody;

        console.log(token)

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: {$gt: Date.now()}
        })

        console.log("user:", user)
        
        if (!user) {
            return NextResponse.json({
                error: "Invalid error",
                status:400
            })
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({
            message: "email verified successfully",
            success:true

        })
    } catch (error:any) {
         return NextResponse.json({
             error: error.message,
             success: false,
             status:500

        })
    }
    
}