import { type TransportOptions, createTransport } from "nodemailer";
import { env } from "process";
import { EMAIL_SENDER } from "../constants";
import { render } from "@react-email/render";
import { EmailVerification } from "./template/email";

const smtpConfig = {
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
  },
};

const transporter = createTransport(smtpConfig as TransportOptions);

export const sendMail = async (to: string, code: string) => {
  const subject = "Verify your email address";
  const body = render(<EmailVerification code={code} />);

  if (env.NODE_ENV !== "production") {
    console.log("Email sent to:", to);
  }

  return transporter.sendMail({ from: EMAIL_SENDER, to, subject, html: body });
};
