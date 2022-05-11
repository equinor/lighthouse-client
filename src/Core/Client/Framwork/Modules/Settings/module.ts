import type { Module } from '@equinor/fusion-framework-module';
import type { GlobalStateModule } from '../GlobalState';
import { ISettingsConfigurator, SettingsConfigurator } from './configurator';
import { ISettingsProvider, SettingsProvider } from './provider';

export type SettingsModule = Module<
    'settings',
    ISettingsProvider,
    ISettingsConfigurator,
    [GlobalStateModule]
>;

export const module: SettingsModule = {
    name: 'settings',
    configure: () => new SettingsConfigurator(),
    initialize: ({ settings }, { globalState }) => new SettingsProvider(settings.init, globalState),
};

export default module;

declare module '@equinor/lighthouse-portal-client' {
    interface Modules {
        settings: SettingsModule;
    }
}
