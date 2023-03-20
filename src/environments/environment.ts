export const environment = {
  production: window[<any>"env"][<any>"production"] || true,
  identityAPIServerURL: window[<any>"env"][<any>"identityAPIServerURL"] || "default",
  customerServiceSignalRHub: window[<any>"env"][<any>"customerServiceSignalRHub"] || "default",
  customerService: window[<any>"env"][<any>"customerService"] || "default",
  identityServerURL: window[<any>"env"][<any>"identityServerURL"] as unknown as string || '',
  systemSetupApiUrl: window[<any>"env"][<any>"systemSetupApiUrl"] || "default",
  accountingUrl: window[<any>"env"][<any>"accountingUrl"] || "default",
  entityApiUrl: window[<any>"env"][<any>"entityApiUrl"] || "default",
  postLogoutRedirectUri: window[<any>"env"][<any>"postLogoutRedirectUri"] as unknown as string || '',
};
