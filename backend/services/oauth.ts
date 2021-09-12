import axios, { AxiosError, AxiosResponse } from "axios";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import NodeRSA from "node-rsa";

const googleClientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
const client = new OAuth2Client(googleClientId);

export const verifyTokenByPlatform = async (user: {
  type: string;
  id_token: string;
  email?: string;
}) => {
  let email = null;
  switch (user.type) {
    case "google":
      email = await verifyGoogleIdToken(user.id_token).catch((error: Error) => {
        throw new Error(error.message);
      });
      break;
    case "ms":
      await verifyMsIdToken(user.id_token).catch((error: Error) => {
        throw new Error(error.message);
      });
      email = user.email;
      break;
    // case "apple":
    //   await verifyAppleIdToken(user.id_token).catch((error: Error) => {
    //     throw new Error(error.message);
    //   });
    //   email = user.email;
    //   break;
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
    .catch((error: Error) => {
      throw Error("Failed to verify google id_token: " + error.message);
    });
  const payload = ticket.getPayload();
  return payload?.email;
};

const verifyMsIdToken = async (id_token: string) => {
  // need to verify id_token
  try {
    const keys = await _getMsalPublicKeys();
    const decodedToken = jwt.decode(id_token, { complete: true }); // extract kid
    const kid = decodedToken?.header.kid;
    const key = keys.find((k: { kid: string | undefined }) => k.kid === kid);

    // build RSA
    const pubKey = new NodeRSA();
    pubKey.importKey(
      { n: Buffer.from(key.n, "base64"), e: Buffer.from(key.e, "base64") },
      "components-public"
    );
    const userKey = pubKey.exportKey("public");
    jwt.verify(id_token, userKey, { algorithms: ["RS256"] });
  } catch (error: unknown) {
    throw new Error("Failed to verify MS id_token");
  }
};

async function _getMsalPublicKeys() {
  return axios
    .request({
      method: "GET",
      url: "https://login.microsoftonline.com/common/discovery/v2.0/keys",
    })
    .then((response: AxiosResponse) => response.data.keys)
    .catch((error: AxiosError) => {
      throw new Error(error.message);
    });
}

// const verifyAppleIdToken = async (id_token: string) => {
//   try {
//     const keys = await _getApplePublicKeys(); // fetch multiple keys from apple server
//     const decodedToken = jwt.decode(id_token, { complete: true }); // extract kid
//     const kid = decodedToken?.header.kid;
//     const key = keys.find((k: { kid: string | undefined }) => k.kid === kid); // check which key matches the kid

//     // build RSA
//     const pubKey = new NodeRSA();
//     pubKey.importKey(
//       { n: Buffer.from(key.n, "base64"), e: Buffer.from(key.e, "base64") },
//       "components-public"
//     );
//     const userKey = pubKey.exportKey("public");
//     jwt.verify(id_token, userKey, { algorithms: ["RS256"] });
//   } catch (error: unknown) {
//     throw new Error("Failed to verify apple id_token");
//   }
// };

// async function _getApplePublicKeys() {
//   return axios
//     .request({ method: "GET", url: "https://appleid.apple.com/auth/keys" })
//     .then((response: AxiosResponse) => response.data.keys)
//     .catch((error: Error) => {
//       throw new Error(error.message);
//     });
// }
