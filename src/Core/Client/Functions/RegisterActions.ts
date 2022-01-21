import { updateGlobalClientState } from '../ClientState/ClientState';
import { ClientRegistry } from '../Types/ClientRegistry';
import { InternalState } from '../Types/InternalState';

export function registerInternalState(internal: InternalState): InternalState {
    updateGlobalClientState(() => ({
        internal,
    }));
    return internal;
}

export function registerClientRegistry(registry: ClientRegistry): ClientRegistry {
    updateGlobalClientState(() => ({
        registry,
    }));
    return registry;
}
