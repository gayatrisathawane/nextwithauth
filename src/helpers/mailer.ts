import User from "@/model/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailtype, userId }: any) => {
  try {
    //todo config mail usage

    const hashToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailtype === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashToken,
        verifyTokenExpiry: Date.now() + 360000,
      });
    } else if (emailtype === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashToken,
        forgotPasswordTokenExpiry: Date.now() + 360000,
      });
    }
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "4734db897e508f",
        pass: "4db9ef359d9244",
      },
    });

    const mailOption = {
      from: "gayatripsathawane@gmail.com", // sender address
      to: email,
      subject:
        emailtype === "VERIFY" ? "verify your email" : "Reset your password",
      html: `<p>click here to ${
        emailtype === "VERIFY" ? "verify your email" : "reset your password"
      } </p>`, // html body
    };

    const mailResponse = await transport.sendMail(mailOption);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
