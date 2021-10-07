/* eslint-disable @typescript-eslint/explicit-function-return-type */
import axios from 'axios';

const Settings = require('../settings.json');

export type AuthSettings = {
    clientId: string;
    authority: string;
    scopes: string[];
};

export type ProcosysApiSettings = {
    baseUrl: string;
    apiVersion: string;
    scope: string[];
};

type AppInsightsConfig = {
    instrumentationKey: string;
};

type AuthConfigResponse = {
    clientId: string;
    authority: string;
    scopes: string[];
    configurationScope: string[];
    configurationEndpoint: string;
};

export type FeatureFlags = {
    mcAppIsEnabled: boolean;
};

export type AppConfig = {
    procosysWebApi: ProcosysApiSettings;
    appInsights: AppInsightsConfig;
    ocrFunctionEndpoint: string;
};

type AppConfigResponse = {
    configuration: AppConfig;
    featureFlags: FeatureFlags;
};

export const getAuthConfig = async () => {
    const { data } = await axios.get<AuthConfigResponse>(
        Settings.authSettingsEndpoint
    );
    // Todo: TypeGuard authsettings
    const clientSettings = {
        auth: {
            clientId: data.clientId,
            authority: data.authority,
            redirectUri: window.location.origin + '/mc',
        },
    };
    const scopes = data.scopes;
    const configurationScope = data.configurationScope;
    const configurationEndpoint = data.configurationEndpoint;

    return {
        clientSettings,
        scopes,
        configurationScope,
        configurationEndpoint,
    };
};

export const getAppConfig = async (endpoint: string, accessToken: string) => {
    const { data } = await axios.get<AppConfigResponse>(endpoint, {
        headers: {
            Authorization: 'Bearer ' + accessToken,
        },
    });

    const appConfig: AppConfig = data.configuration;
    const featureFlags: FeatureFlags = data.featureFlags;
    return { appConfig, featureFlags };
};
