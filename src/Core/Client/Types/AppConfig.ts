import { Scope, Urls } from './ScopeAndUrls';

export type AppConfig = {
    scope: Scope;
    urls: Urls;
};

export type AppConfigResult = AppConfig & {
    settings: AppConfigSettings;
    isProduction: boolean;
};

export type AppConfigSettings = {
    logging: boolean;
    clientId: string;
    tenantId: string;
    contactPerson: string;
    ai?: string;
};
