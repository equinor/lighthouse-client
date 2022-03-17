import type { Module } from '@equinor/fusion-framework-module';
import { IWorkspaceLoaderConfigurator, WorkspaceLoaderConfigurator } from './configurator';
import { IWorkspaceLoaderProvider, WorkspaceLoaderProvider } from './provider';

export type WorkSpaceLoaderModule = Module<
    'workspaceLoader',
    IWorkspaceLoaderProvider,
    IWorkspaceLoaderConfigurator,
    []
>;

export const module: WorkSpaceLoaderModule = {
    name: 'workspaceLoader',
    configure: () => new WorkspaceLoaderConfigurator(),
    initialize: (instance) => new WorkspaceLoaderProvider(instance.workspaceLoader.config),
};

export default module;

declare module '@equinor/portal-client' {
    interface Modules {
        workspaceLoader: WorkSpaceLoaderModule;
    }
}
