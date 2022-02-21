import { User } from '@microsoft/microsoft-graph-types';
import { ClientSettings } from '../../../Types/ClientSettings';
import { IGlobalStateProvider } from '../GlobalState/provider';

export interface ISettingsProvider {
    /**
     * Read an immutable state of the ClientSettings
     * @return {*}  {ClientSettings}
     */
    readClientSettings(): Readonly<ClientSettings>;
    toggleAppPanel(): void;
    toggleFullscreenMenu(): void;
    setLoggingState(logging: boolean): void;
    setEnv(isProduction: boolean, clientEnv: string): void;
    setClientEnv(clientEnv: string): void;
    isProduction(): boolean;
    setUserImageUrl(url?: string): void;
    setUser(user?: User): void;
}

export class SettingsProvider implements ISettingsProvider {
    globalStateProvider: IGlobalStateProvider;

    constructor(
        protected _settings: ClientSettings,
        protected _globalStateProvider: IGlobalStateProvider
    ) {
        this.globalStateProvider = _globalStateProvider;
        this._globalStateProvider.updateGlobalClientState((state) => ({
            ...state,
            settings: _settings,
        }));
    }

    readClientSettings(): Readonly<ClientSettings> {
        return this.globalStateProvider.readGlobalClientState((state) => state.settings);
    }

    internalUpdateSettings(
        update: ((settings: ClientSettings) => Partial<ClientSettings>) | Partial<ClientSettings>
    ): void {
        this.globalStateProvider.updateGlobalClientState((state) => {
            const settings = typeof update === 'function' ? update(state.settings) : update;
            return {
                settings: {
                    ...state.settings,
                    ...settings,
                },
            };
        });
    }

    toggleAppPanel(): void {
        this.internalUpdateSettings((state) => ({ appsPanelActive: !state.appsPanelActive }));
    }

    toggleFullscreenMenu(): void {
        this.internalUpdateSettings((state) => ({
            fullscreenMenuActive: !state.fullscreenMenuActive,
        }));
    }

    setLoggingState(logging: boolean): void {
        this.internalUpdateSettings({ logging });
    }

    setEnv(isProduction: boolean, clientEnv: string): void {
        this.internalUpdateSettings({ isProduction, clientEnv });
    }
    setClientEnv(clientEnv: string): void {
        this.internalUpdateSettings({ clientEnv });
    }

    isProduction(): boolean {
        return this.readClientSettings().isProduction;
    }
    setUserImageUrl(url?: string): void {
        this.internalUpdateSettings({ userImageUrl: url });
    }

    setUser(user?: User): void {
        user && this.internalUpdateSettings({ user });
    }
}
