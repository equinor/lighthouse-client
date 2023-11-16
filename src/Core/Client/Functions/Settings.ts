import { User } from '@microsoft/microsoft-graph-types';
import { updateGlobalClientState } from '../ClientState/ClientState';
import { ClientSettings } from '../Types/ClientSettings';
import { readClientSettings } from './Readers';

function internalUpdateSettings(
    update: ((settings: ClientSettings) => Partial<ClientSettings>) | Partial<ClientSettings>
) {
    updateGlobalClientState((state) => {
        const settings = typeof update === 'function' ? update(state.settings) : update;
        return {
            settings: {
                ...state.settings,
                ...settings,
            },
        };
    });
}

export function setLoggingState(logging: boolean): void {
    internalUpdateSettings({ logging });
}

export function setContactPerson(contactPerson: string): void {
    internalUpdateSettings({ contactPerson });
}

export function setEnv(isProduction: boolean, clientEnv: string): void {
    internalUpdateSettings({ isProduction, clientEnv });
}
export function setClientEnv(clientEnv: string): void {
    internalUpdateSettings({ clientEnv });
}

export function isProduction(): boolean {
    return readClientSettings().isProduction;
}
export function setUserImageUrl(url?: string): void {
    internalUpdateSettings({ userImageUrl: url });
}

export function setUser(user?: User): void {
    user && internalUpdateSettings({ user });
}
