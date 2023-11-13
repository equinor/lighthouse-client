import type { ModulesConfigurator } from '@equinor/fusion-framework-module';
import { initializeModules, ModulesInstanceType } from '@equinor/fusion-framework-module';
import dataCreator, { DataCreatorModule } from './DataCreatorModule';

export type Modules = [DataCreatorModule];
export const modules: Modules = [dataCreator];

export type ModulesInstance = ModulesInstanceType<Modules>;
export type Configurator = ModulesConfigurator<Modules>;

export const initializeClientModules = async (
    configurator: Configurator
): Promise<ModulesInstance> => initializeModules(configurator, modules);
