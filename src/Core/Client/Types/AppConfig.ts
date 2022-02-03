import { Scope, Urls } from './ScopeAndUrls';

export interface AppConfig {
    scope: Scope;
    urls: Urls;
}

export interface AppConfigResult extends AppConfig {
    settings: AppConfigSettings;
    isProduction: boolean;
}

export interface AppConfigSettings {
    logging: boolean;
    clientId: string;
    tenantId: string;
}
