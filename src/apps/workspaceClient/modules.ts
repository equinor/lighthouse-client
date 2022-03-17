import type { ModulesConfigurator } from '@equinor/fusion-framework-module';
import { initializeModules, ModulesInstanceType } from '@equinor/fusion-framework-module';
import workspaceLoader, { WorkSpaceLoaderModule } from './modules/workspaceLoader';

export type Modules = [WorkSpaceLoaderModule];
export const modules: Modules = [workspaceLoader];

export type ModulesInstance = ModulesInstanceType<Modules>;
export type Configurator = ModulesConfigurator<Modules>;

export const initializeWorkspaceModules = async (
    configurator: Configurator
): Promise<ModulesInstance> => initializeModules(configurator, modules);
