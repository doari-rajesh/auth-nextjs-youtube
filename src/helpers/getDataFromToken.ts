import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request:NextRequest) => {
  console.log("requestToken:", request);

  try {
    const token = request.cookies.get("token")?.value || "";
    const encodedToken :any= jwt.verify(token, process.env.JSON_TOKEN!);
    console.log("encodedToken: ", encodedToken);
    return encodedToken.id;
  } catch (error:any) {
    throw new Error(error.message);
  }
};
