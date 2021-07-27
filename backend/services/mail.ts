import * as dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const sgMail = require("@sendgrid/mail");

export const send = async (email: string, hash: string) => {
  const content = {
    to: email, // Change to your recipient
    from: process.env.HOST_EMAIL, // Change to your verified sender
    subject: "Welcome Hustlo",
    text: "Finish the signup process",
    html: `<h1>Almost done😉</h1><p>Please click the <a clicktracking="off" href="${process.env.SERVER_BASE_URL}/confirm-email?h=${hash}">link</a> to finish the signup process</p>`,
    tracking_settings: {
      click_tracking: { enable: false },
      open_tracking: { enable: false },
    },
  };

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  await sgMail.send(content).catch((error: any) => {
    throw Error(error);
  });
};
