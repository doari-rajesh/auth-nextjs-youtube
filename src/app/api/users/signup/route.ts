import { dbConnect } from "@/dbconfig/dbConfig"
import User from "@/models/User"
import bcryptjs from "bcryptjs"
import { NextRequest, NextResponse } from "next/server"
import { sendEmail } from "@/helpers/mailer"


dbConnect()


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { username, email, password } = reqBody;

        console.log(reqBody);
        
        if (!username || !email || !password) {
            return NextResponse.json({
                success: false,
                messsage:"All fields are required"
            })
        }

        // Check user already exits
        const user = await User.findOne({ email })
        
        console.log("user",user);
        
        if ( user) {
            return NextResponse.json({
                error: "user already exits",
                status:400
            })
        }
        
        // hash password 

        const salt = await bcryptjs.genSaltSync(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        console.log("hashedPassword",hashedPassword);
        

        const savedUser = await User.create({
            username,
            email,
            password:hashedPassword
        })

        console.log(savedUser);

        // send verification email

       await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})

        return NextResponse.json({
            success:true,
            message: 'User created successfully',
            user:savedUser
        })
        


    } catch (error:any) {
        return NextResponse.json({
            success:false,
            error: error.message,
            status:500
        })
    }
    
}