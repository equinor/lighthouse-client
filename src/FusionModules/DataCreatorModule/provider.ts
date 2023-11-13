import React from 'react';
import { CreatorManifest, DataCreatorConfig, GetCreatorComponent } from './types';

export interface IDataCreationProvider {
    getCreators(): CreatorManifest[];
    getCreatorById(creatorId: string): CreatorManifest | undefined;
    getCreatorComponentById(id: string): Promise<React.FC<any>>;
    setup(config: DataCreatorConfig): Promise<void>;
}

export class DataCreationProvider implements IDataCreationProvider {
    private creators: CreatorManifest[] = [];
    private getComponent: GetCreatorComponent;
    constructor(protected _config: DataCreatorConfig) {
        this.getComponent = _config.getCreatorComponent;
    }

    async setup(config: DataCreatorConfig): Promise<void> {
        const allCreators = await config.getCreators();

        for (const creator of allCreators) {
            this.checkAccess(creator, config);
        }
    }

    private async checkAccess(creator: CreatorManifest, config: DataCreatorConfig): Promise<void> {
        const hasAccess = await config.getAccessFunction(creator.props.accessCheckFunctionId);

        this.creators.push(creator);
        hasAccess()
            .then((v) => {
                creator.props.hasAccess = v;
            })
            .catch((s) => console.warn(s));
    }

    public getCreators(): CreatorManifest[] {
        return this.creators;
    }

    public getCreatorById(creatorId: string): CreatorManifest | undefined {
        return this.creators.find((creator) => creator.widgetId === creatorId);
    }

    public async getCreatorComponentById(id: string): Promise<React.FC<any>> {
        try {
            return await this.getComponent(id);
        } catch (error) {
            console.error(error);
            return () => null;
        }
    }
}
