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

        for await (const creator of allCreators) {
            const hasAccess = await config.getAccessFunction(creator.props.accessCheckFunctionId);

            creator.props.hasAccess = await hasAccess();
            this.creators.push(creator);
        }
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
