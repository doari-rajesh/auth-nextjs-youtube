import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/User";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hash token
    // const salt = await bcryptjs.genSaltSync(10);
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    console.log("hashedToken: ", hashedToken);

    if (emailType === "VERIFY") {
      const updatedUser = await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });

      console.log("updatedUser", updatedUser);
    } else if (emailType === "RESET") {
      const updatedUser = await User.findByIdAndUpdate(userId, {
        forgotPassword: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: "devrajesh280@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here<a/>
            ${
              emailType === "VERIFY"
                ? "Verify your email"
                : "Reset your password"
            }
            <p>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>
            </p>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    console.log("mailResponse: ", mailResponse);
    return mailResponse;
  } catch (error: any) {
    console.log("error:", error.message);
    throw new Error(error.message);
  }
};
