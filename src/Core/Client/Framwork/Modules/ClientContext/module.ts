import type { Module } from '@equinor/fusion-framework-module';
import type { GlobalStateModule } from '../GlobalState';
import { ClientContextConfigurator, IClientContextConfigurator } from './configurator';
import { ClientContextProvider, IClientContextProvider } from './provider';

export type ContextModule = Module<
    'clientContext',
    IClientContextProvider,
    IClientContextConfigurator,
    [GlobalStateModule]
>;

export const module: ContextModule = {
    name: 'clientContext',
    configure: () => new ClientContextConfigurator(),
    initialize: ({ clientContext }, { globalState }) =>
        new ClientContextProvider(clientContext, globalState),
};

export default module;

declare module '@equinor/lighthouse-portal-client' {
    interface Modules {
        context: ContextModule;
    }
}
