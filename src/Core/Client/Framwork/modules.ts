import type { ModulesConfigurator } from '@equinor/fusion-framework-module';
import { initializeModules, ModulesInstanceType } from '@equinor/fusion-framework-module';
import clientConfig, { ClientConfigModule } from './Modules/ClientConfig';
import config, { ConfigModule } from './Modules/Config';
import state, { GlobalStateModule } from './Modules/GlobalState';
import settings, { SettingsModule } from './Modules/Settings';

export type Modules = [ConfigModule, GlobalStateModule, ClientConfigModule, SettingsModule];
export const modules: Modules = [config, state, clientConfig, settings];

export type ModulesInstance = ModulesInstanceType<Modules>;
export type Configurator = ModulesConfigurator<Modules>;

export const initializeClientModules = async (
    configurator: Configurator
): Promise<ModulesInstance> => initializeModules(configurator, modules);
