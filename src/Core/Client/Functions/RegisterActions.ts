import { updateGlobalClientState } from '../ClientState/ClientState';
import { AppConfigResult } from '../Types/AppConfig';
import { ClientRegistry } from '../Types/ClientRegistry';
import { HttpClients } from '../Types/HttpClients';
import { InternalState } from '../Types/InternalState';
import { setContactPerson } from './Settings';

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

export function registerAppConfig(appConfig: AppConfigResult): AppConfigResult {
  setContactPerson(appConfig.settings.contactPerson);
  updateGlobalClientState(() => ({
    appConfig,
  }));
  return appConfig;
}

export function registerClients(client: HttpClients) {
  updateGlobalClientState(() => ({
    clients: client,
  }));

  return client;
}
