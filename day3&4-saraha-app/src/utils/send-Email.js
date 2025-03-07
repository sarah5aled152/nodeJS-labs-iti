// send email service

import nodemailer from "nodemailer";

const sendEmailService = async ({
  to = "",
  subject = "no-reply",
  message = "<h1>no-message</h1>",
  attachments = [],
}) => {
  // email configuration
  const transporter = nodemailer.createTransport({
    host: "localhost", // smtp.gmail.com
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: `saraha app <${process.env.EMAIL}>`, // sender address
    to,
    subject,
    html: message,
    attachments,
  });

  return info.accepted.length ? true : false;
};

export default sendEmailService;
