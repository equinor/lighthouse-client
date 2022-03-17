import { WorkspaceProps } from '@equinor/WorkSpace';

export type WorkSpace = (props: WorkspaceProps) => JSX.Element;

export interface WorkspaceLoaderConfig {
    loaderUri?: string;
    WorkSpace?: WorkSpace;
}

export interface IWorkspaceLoaderConfigurator {
    config: WorkspaceLoaderConfig | undefined;
    configure(_config: WorkspaceLoaderConfig): void;
}

export class WorkspaceLoaderConfigurator implements IWorkspaceLoaderConfigurator {
    config: WorkspaceLoaderConfig | undefined;

    constructor() {
        this.config = undefined;
    }

    configure(_config: WorkspaceLoaderConfig): void {
        if (!_config.WorkSpace && !_config.loaderUri) {
            console.warn('No WorkspaceLoader config Provided.');
            return;
        }

        this.config = _config;
    }
}
