export async function fetchConfig(): Promise<AppConfig> {
    const response = await fetch(process.env.funcUrl || '');
    return await response.json();
}

export interface AppConfig {
    settings: {
        clientId: string;
        tenantId: string;
    };
    scope: {
        fusion: string;
        procosys: string;
        echoModelDistClient: string;
    };
    urls: {
        echoModelDistUrl: string;
    };
}
