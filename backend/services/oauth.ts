import { OAuth2Client } from "google-auth-library";

const googleClientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
const client = new OAuth2Client(googleClientId);

export const verifyTokenByPlatform = async (user: any) => {
  let email = null;
  switch (user.type) {
    case "google":
      email = await verifyGoogleIdToken(user.id_token).catch((error) => {
        throw Error(error);
      });
      break;
    case "ms":
      email = await verifyMsIdToken(user.id_token, user.email).catch(
        (error) => {
          throw Error(error);
        }
      );
      break;
    case "apple":
      email = await verifyAppleIdToken(user.id_token, user.email).catch(
        (error) => {
          throw Error(error);
        }
      );
    default:
      break;
  }
  return email;
};

const verifyGoogleIdToken = async (token: string) => {
  const ticket = await client
    .verifyIdToken({
      idToken: token,
      audience: googleClientId,
    })
    .catch((reason) => {
      throw Error("Failed to verify google id_token: " + reason);
    });
  const payload = ticket.getPayload();
  return payload?.email;
};

const verifyMsIdToken = async (token: string, email: string) => {
  return email;
};

const verifyAppleIdToken = async (token: string, email: string) => {
  return email;
};
