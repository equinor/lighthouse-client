import { readGlobalClientState } from '../ClientState/ClientState';
import { AppConfig } from '../Types/AppConfig';
import { ClientContext } from '../Types/ClientContext';
import { ClientRegistry } from '../Types/ClientRegistry';
import { ClientSettings } from '../Types/ClientSettings';
import { InternalState } from '../Types/InternalState';

/**
 * Read an immutable state of the ClientContext
 * @return {*}  {ClientContext}
 */
export function getClientContext(): Readonly<ClientContext> {
    return readGlobalClientState((state) => state.context);
}

/**
 * Read an immutable fusionContextId
 * @return {*}  {string}
 */
export function getFusionContextId(): Readonly<string> {
    return (
        readGlobalClientState((state) => state.context).fusionContext?.id ||
        readGlobalClientState((state) => state.context).fusionContextId
    );
}

/**
 * Read an immutable state of the AppConfig
 * @return {*}  {AppConfig}
 */
export function readAppConfig(): Readonly<AppConfig> {
    return readGlobalClientState((state) => state.appConfig);
}

/**
 * Read an immutable state of the ClientRegister
 * @return {*}  {ClientRegistry}
 */
export function readClientRegistry(): Readonly<ClientRegistry> {
    return readGlobalClientState((state) => state.registry);
}

/**
 * Read an immutable state of the ClientSettings
 * @return {*}  {ClientSettings}
 */
export function readClientSettings(): Readonly<ClientSettings> {
    return readGlobalClientState((state) => state.settings);
}

/**
 * Read an immutable state of the InternalState
 * @return {*}  {ClientSettings}
 */
export function readInternalState(): Readonly<InternalState> {
    return readGlobalClientState((state) => state.internal);
}
