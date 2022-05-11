import type { Module } from '@equinor/fusion-framework-module';
import type { ConfigModule } from '../Config';
import { ClientConfigurator, IClientConfigurator } from './configurator';
import { ConfigProvider, IConfigProvider } from './provider';
export type ClientConfigModule = Module<
    'clintConfig',
    IConfigProvider,
    IClientConfigurator,
    [ConfigModule]
>;

export const module: ClientConfigModule = {
    name: 'clintConfig',
    postInitialize: (re) => {
        new ClientConfigurator(re.initClintConfig);
    },
    configure: (ref) => {
        return new ClientConfigurator(ref);
    },
    initialize: () => new ConfigProvider(),
};

export default module;

declare module '@equinor/lighthouse-portal-client' {
    interface Modules {
        clintConfig: ClientConfigModule;
    }
}
