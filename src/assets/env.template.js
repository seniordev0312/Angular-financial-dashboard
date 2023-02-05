(function (window) {
    window["env"] = window["env"] || {};
    window["env"]["production"] = false;
    window["env"]["identityAPIServerURL"] = "${IDENTITY_API_SERVER_URL}";
    window["env"]["customerServiceSignalRHub"] = "${CUSTOMER_SERVICE_SIGNAL_R_HUB}";
    window["env"]["customerService"] = "${CUSTOMER_SERVICE}";
    window["env"]["identityServerURL"] = "${IDENTITY_SERVER_URL}";
    window["env"]["systemSetupApiUrl"] = "${SYSTEM_SETUP_API_URL}";
    window["env"]["accountingUrl"] = "${ACCOUNTING_URL}";
    window["env"]["entityApiUrl"] = "${ENTITY_API_URL}";
    window["env"]["postLogoutRedirectUri"] = "${POST_LOGOUT_REDIRECT_URI}";
})(this);