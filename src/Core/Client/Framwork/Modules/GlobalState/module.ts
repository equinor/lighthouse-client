import type { Module } from '@equinor/fusion-framework-module';
import { GlobalStateConfigurator, IGlobalStateConfigurator } from './configurator';
import { GlobalStateProvider, IGlobalStateProvider } from './provider';

export type GlobalStateModule = Module<
    'globalState',
    IGlobalStateProvider,
    IGlobalStateConfigurator,
    []
>;

export const module: GlobalStateModule = {
    name: 'globalState',
    configure: () => new GlobalStateConfigurator(),
    initialize: (instance) => new GlobalStateProvider(instance.globalState.initialState),
};

export default module;

declare module '@equinor/portal-client' {
    interface Modules {
        globalState: GlobalStateModule;
    }
}
