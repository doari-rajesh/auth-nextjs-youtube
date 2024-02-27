import { dbConnect } from "@/dbconfig/dbConfig";
import User from "@/models/User";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

dbConnect();

export  async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check user already exits
    const user = await User.findOne({ email });

    console.log("user", user);

    if (!user) {
      return NextResponse.json({
        error: "user not exists",
        status: 400,
      });
    }

    // check password is correct

    const validPassword = await bcryptjs.compare(password, user.password);

    console.log("validPassword", validPassword);

    if (!validPassword) {
      return NextResponse.json({
        error: "Invalid password",
        status: 400,
      });
    }

    console.log("validPassword", validPassword);
    //create token data

  const tokenData = {
    id: user._id,
    username: user.username,
    email: user.email,
  };

  // create token
  const token = await jwt.sign(tokenData, process.env.JSON_TOKEN!, {
    expiresIn: "1d",
  });

  console.log("token :", token);

  const response = NextResponse.json({
    message: "Login successfull",
    success: true,
  });

  response.cookies.set("token", token, {
    httpOnly: true,
  });

  return response;
  } catch (error :any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      status: 500,
    });
  }

  
}
