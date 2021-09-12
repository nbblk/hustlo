const sgMail = require("@sendgrid/mail");

export type template = {
  title: string,
  text: string,
  html: string
};

export const send = async (email: string, content: template) => {
  const mail = {
    to: email, // Change to your recipient
    from: process.env.HOST_EMAIL, // Change to your verified sender
    subject: content.title,
    text: content.text,
    html: content.html,
    tracking_settings: {
      click_tracking: { enable: false },
      open_tracking: { enable: false },
    },
  };

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  await sgMail.send(mail).catch((error: any) => {
    throw Error(error);
  });
};
