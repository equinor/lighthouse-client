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

export function toggleAppPanel(): void {
    internalUpdateSettings((state) => ({ appsPanelActive: !state.appsPanelActive }));
}

export function toggleFullscreenMenu(): void {
    internalUpdateSettings((state) => ({ fullscreenMenuActive: !state.fullscreenMenuActive }));
}

export function setLoggingState(logging: boolean): void {
    internalUpdateSettings({ logging });
}

export function setEnv(isProduction: boolean, clientEnv: string): void {
    internalUpdateSettings({ isProduction, clientEnv });
}

export function isProduction(): boolean {
    return readClientSettings().isProduction;
}
