import { OAuth2Client } from "google-auth-library";

const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
const client = new OAuth2Client(clientId);

export const verifyByPlatform = async (type: string, token: string) => {
  let email = null;
  switch (type) {
    case "google":
      email = await verifyGoogleIdToken(token).catch((error) => {
        throw Error(error);
      });
      break;

    default:
      break;
  }
  return email;
};

const verifyGoogleIdToken = async (token: string) => {
  const ticket = await client
    .verifyIdToken({
      idToken: token,
      audience: clientId,
    })
    .catch((reason) => {
      throw Error("Failed to verify google id_token: " + reason);
    });
  const payload = ticket.getPayload();
  return payload?.email;
};
