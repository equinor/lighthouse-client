import { AuthenticationProvider } from '@equinor/authentication';

export interface InternalState {
    clientId: string;
    tenantId: string;
    authProvider: AuthenticationProvider;
}
