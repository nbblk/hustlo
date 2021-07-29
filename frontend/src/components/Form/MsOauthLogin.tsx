import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_MS_CLIENT_ID!,
    redirectUri: process.env.REACT_APP_MS_REDIRECT_URI,
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
  scopes: ["User.Read"],
};

export const maslInstance = new PublicClientApplication(msalConfig);
