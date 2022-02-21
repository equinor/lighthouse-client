import { AppConfig } from './AppConfig';
import { ClientContext } from './ClientContext';
import { ClientRegistry } from './ClientRegistry';
import { ClientSettings } from './ClientSettings';
import { InternalState } from './InternalState';

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
    internal: InternalState;
}
