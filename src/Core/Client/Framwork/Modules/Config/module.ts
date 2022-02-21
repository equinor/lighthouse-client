import type { Module } from '@equinor/fusion-framework-module';
import { Configurator, IConfigurator } from './configurator';
import { ConfigProvider, IConfigProvider } from './provider';

export type ConfigModule = Module<'initClintConfig', IConfigProvider, IConfigurator, []>;

export const module: ConfigModule = {
    name: 'initClintConfig',
    configure: () => new Configurator(),
    initialize: ({ initClintConfig }) => new ConfigProvider(initClintConfig),
};

export default module;

declare module '@equinor/portal-client' {
    interface Modules {
        initClintConfig: ConfigModule;
    }
}
