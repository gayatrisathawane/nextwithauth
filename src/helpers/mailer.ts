import User from "@/model/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailtype, userId }: any) => {
  try {

    //todo config mail usage

     const hashToken = await  bcryptjs.hash(userId.toString(),10)

    if(emailtype==="VERIFY"){
      await User.findByIdAndUpdate(userId,{verifyToken:hashToken,verifyTokenExpiry:Date.now()+360000})

    }else if(emailtype==="VERIFY"){
      await User.findByIdAndUpdate(userId,{forgotPasswordToken:hashToken, forgotPasswordTokenExpiry:Date.now()+360000})

    }
    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "37b3d82234a7a4",//😍
        pass: "b04c4c0bc94d24"//✅
      }
    });

    const mailOption = {
      from: "gayatripsathawane@gmail.com", // sender address
      to: email,
      subject:
        emailtype === "VERIFY" ? "verify your email" : "Reset your password",
      html: `<p>click here to ${emailtype==="VERIFY" ?"verify your email":"reset your password"} </p>`, // html body
    };

    const mailResponse = await transporter.sendMail(mailOption);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
