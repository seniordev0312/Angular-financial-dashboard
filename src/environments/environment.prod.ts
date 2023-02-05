export const environment = {
  production: window[<any>"env"][<any>"production"] || true,
  apiUrl: window[<any>"env"][<any>"apiUrl"] || "default",
  identityAPIServerURL: window[<any>"env"][<any>"identityAPIServerURL"] || "default",
  signalRHub: window[<any>"env"][<any>"signalRHub"] || "default",
  customerServer: window[<any>"env"][<any>"customerServer"] || "default",
  identityServerURL: window[<any>"env"][<any>"identityServerURL"] || "default",
  systemSetupApiUrl: window[<any>"env"][<any>"systemSetupApiUrl"] || "default",
  accountingUrl: window[<any>"env"][<any>"accountingUrl"] || "default",
  entityApiUrl: window[<any>"env"][<any>"entityApiUrl"] || "default",
  postLogoutRedirectUri: window[<any>"env"][<any>"postLogoutRedirectUri"] || "default",
};
