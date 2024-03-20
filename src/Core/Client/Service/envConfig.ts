export interface EnvConfig {
  readonly CLIENT_ENV: string;
}
declare global {
  interface Window {
    AUTH_CONFIG: string;
    JC_CONFIG: string;
    SERVICE_MESSAGE: string;
  }
}
export async function fetchClientConfig(): Promise<EnvConfig> {
  if (!window.AUTH_CONFIG) {
    throw new Error('Missing auth config.');
  }
  try {
    return JSON.parse(window.AUTH_CONFIG);
  } catch (e) {
    console.error(e);
    throw new Error('Failed to parset auth config');
  }
}
