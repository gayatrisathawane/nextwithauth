import { connect } from "@/dbConfig/dbconfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server"; //
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
// import { sendEmail} from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();
    const { email, password } = reqbody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "user does not exist" },
        { status: 500 }
      );
    }

    console.log("user exist");

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        { error: "check your credintial" },
        { status: 400 }
      );
    }

    const tokendata = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokendata, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    }); // "!" 100% sure hai hai he yanga

    const response = NextResponse.json({
      message: "logged in user",
      success: true,
    });

    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
