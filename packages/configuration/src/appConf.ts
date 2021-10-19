export async function fetchConfig(): Promise<AppConfig> {
    const response = await fetch(
        'https://lighthouse-func.azurewebsites.net/api/LighthouseConfig'
    );
    return await response.json();
}

export interface AppConfig {
    fusion: string;
    procosys: string;
    clientId: string;
    tenant: string;
}
