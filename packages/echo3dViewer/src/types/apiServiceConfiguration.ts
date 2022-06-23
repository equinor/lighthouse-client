export interface ApiServiceConfiguration {
    baseUrl: string;
    getAccessToken: () => Promise<string>;
}
