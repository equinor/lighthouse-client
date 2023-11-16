import { IHttpClient } from '@equinor/fusion-framework-module-http';
import { AppConfig } from './AppConfig';
import { ClientContext } from './ClientContext';
import { ClientRegistry } from './ClientRegistry';
import { ClientSettings } from './ClientSettings';
import { InternalState } from './InternalState';
import { HttpClients } from './HttpClients';

/**
 * The Global Client State is the brian in the ppo client
 * Providing all information to apps and the client,
 * the state is awaitable trough the `getGlobalClientState`
 * and `useGlobalClientState` hook.
 */
export interface GlobalClientState {
    context: ClientContext;
    registry: ClientRegistry;
    settings: ClientSettings;
    appConfig: AppConfig;
    clients: HttpClients;
    internal: InternalState;
}
