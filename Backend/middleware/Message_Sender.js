import nodemailer from "nodemailer";

const transpoter = nodemailer.createTransport({
  secure: "true",
  host: "smtp.google.com",
  port: 456,
  auth: {
    user: "anujdalwadi33@gmail.com",
    pass: "",
  },
});

const sendMail = (to, sub, msg) => {
  transpoter.sendMail({
    to: to,
    subject: sub,
    message: msg,
  });
};

sendMail(
  "anujdalwadi33@gmail.com",
  "This is simpledemo",
  "anujdalwadi33@gmail.com",
);
