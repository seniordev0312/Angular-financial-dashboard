(function (window) {
    window["env"] = window["env"] || {};
    window["env"]["production"] = false;
    window["env"]["identityAPIServerURL"] = "https://dev.api.identity.aperatureuk.com/api";
    window["env"]["customerServiceSignalRHub"] = "https://dev.customerservice.aperatureuk.com";
    window["env"]["customerService"] = "https://dev.customerservice.aperatureuk.com";
    window["env"]["identityServerURL"] = "https://dev.identity.sts.aperatureuk.com";
    window["env"]["systemSetupApiUrl"] = "https://dev.api.accounting.aperatureuk.com/v1";
    window["env"]["accountingUrl"] = "https://dev.api.accounting.aperatureuk.com/v1/";
    window["env"]["entityApiUrl"] = "https://dev.api.entity.aperatureuk.com/api";
    window["env"]["postLogoutRedirectUri"] = "http://localhost:4200/dashboard";
})(this);