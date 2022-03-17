/* eslint-disable react-hooks/rules-of-hooks */

import { WorkSpace, WorkspaceLoaderConfig } from './configurator';
import { EmptyWorkspace } from './emptyWorkspace';

export interface IWorkspaceLoaderProvider {
    Workspace: WorkSpace;
    config?: WorkspaceLoaderConfig;
    loadWorkspace(loader: (url: string) => Promise<WorkSpace>): Promise<void>;
}

export class WorkspaceLoaderProvider implements IWorkspaceLoaderProvider {
    Workspace: WorkSpace;
    config: WorkspaceLoaderConfig | undefined;

    constructor(config?: WorkspaceLoaderConfig) {
        if (!config) {
            console.warn('No workspace configuration provided setting default empty workspace.');
            this.Workspace = EmptyWorkspace;
            return;
        }

        if (config.WorkSpace) {
            this.Workspace = config.WorkSpace;
            return;
        }

        this.Workspace = EmptyWorkspace;
        this.config = config;
    }

    async loadWorkspace(loader: (url: string) => Promise<WorkSpace>): Promise<void> {
        if (!this.config?.WorkSpace && this.config?.loaderUri)
            this.Workspace = await loader(this.config?.loaderUri);
    }
}
