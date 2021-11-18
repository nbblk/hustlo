import { PublicClientApplication, Logger, LogLevel } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_MS_CLIENT_ID!,
    redirectUri: process.env.REACT_APP_MS_REDIRECT_URI,
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: any, message: any, containsPii: any) => {
          if (containsPii) {
              return;
          }
          switch (level) {
              case LogLevel.Error:
                  console.error(message);
                  return;
              case LogLevel.Info:
                  console.info(message);
                  return;
              case LogLevel.Verbose:
                  console.debug(message);
                  return;
              case LogLevel.Warning:
                  console.warn(message);
                  return;
              default:
                  console.debug(message)
                  return;
          }
      },
      logLevel: LogLevel.Verbose
  }
  }
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
  scopes: ["User.Read"],
};

export const maslInstance = new PublicClientApplication(msalConfig);
