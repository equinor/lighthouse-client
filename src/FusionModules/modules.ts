import type { ModulesConfigurator } from '@equinor/fusion-framework-module';
import { initializeModules, ModulesInstanceType } from '@equinor/fusion-framework-module';

export type Modules = [];
export const modules: Modules = [];

export type ModulesInstance = ModulesInstanceType<Modules>;
export type Configurator = ModulesConfigurator<Modules>;

export const initializeClientModules = async (
    configurator: Configurator
): Promise<ModulesInstance> => initializeModules(configurator, modules);
