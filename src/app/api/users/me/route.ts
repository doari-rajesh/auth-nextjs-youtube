import User from "@/models/User";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { dbConnect } from "@/dbconfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function GET(request:NextRequest) {
  try {
    const userId = getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password").exec();
    console.log("user" ,user);
    return NextResponse.json({
      message: "user found",
      user: user,
    });
  } catch (error:any) {
    console.log("error: ", error.message);
    return NextResponse.json({
      message: "user not found",
      error: error.message,
      success: false,
    });
  }
}
