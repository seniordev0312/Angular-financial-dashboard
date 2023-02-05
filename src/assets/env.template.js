(function (window) {
    window["env"] = window["env"] || {};
    window["env"]["production"] = false;
    window["env"]["apiUrl"] = "${API_URL}";
    window["env"]["identityAPIServerURL"] = "${IDENTITY_API_SERVER_URL}";
    window["env"]["signalRHub"] = "${SIGNAL_R_HUB}";
    window["env"]["customerServer"] = "${CUSTOMER_SERVER}";
    window["env"]["identityServerURL"] = "${IDENTITY_SERVER_URL}";
    window["env"]["systemSetupApiUrl"] = "${SYSTEM_SETUP_API_URL}";
    window["env"]["accountingUrl"] = "${ACCOUNTING_URL}";
    window["env"]["entityApiUrl"] = "${ENTITY_API_URL}";
    window["env"]["postLogoutRedirectUri"] = "${POST_LOGOUT_REDIRECT_URI}";
})(this);