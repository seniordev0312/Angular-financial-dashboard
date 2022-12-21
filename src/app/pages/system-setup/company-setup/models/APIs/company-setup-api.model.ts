export class CompanySetupAPI {
    address: string;
    website: string;
    email: string;
    phoneNumber: String;
    extensions: Extensions[]
}
export class Extensions {
    name: string;
    isEnable: string;
    extensionDetails: ExtensionDetails;
}

export class ExtensionDetails {
    apiKeyInformation: string;
    apiSecret: string;
}