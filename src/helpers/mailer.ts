import nodemailer from "nodemailer";

export const sendEmail = async ({ email, emailtype, userId }: any) => {
  try {

    //todo config mail usage
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D",
      },
    });

    const mailOption = {
      from: "gayatripsathawane@gmail.com", // sender address
      to: email,
      subject:
        emailtype === "VERIFY" ? "verify your email" : "Reset your password",
      html: "<b>Hello world?</b>", // html body
    };

    const mailResponse = await transporter.sendMail(mailOption);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
