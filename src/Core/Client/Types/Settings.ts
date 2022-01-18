export interface Scope {
    fusion: string;
    procosys: string;
    echoModelDistClient: string;
    scopeChange: string;
    constructionProgress: string;
    pipeTest?: string;
    FAM: string;
    STID: string;
}
export interface Urls {
    echoModelDistClient: string;
    fusion:string;
    procosys:string;
    copeChange: string;
    constructionProgress: string;
    pipeTest?: string;
    FAM: string;
    STID: string;
}

export interface ClientSettings {
    logging: boolean;
    clientId: string;
    tenantId: string;
}
export interface AppConfig {
    settings: ClientSettings;
    scope: Scope;
    urls: Urls;
}