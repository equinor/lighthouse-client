import { DataCreatorConfig } from './types';

export interface IDataCreatorConfigurator {
    configuration: DataCreatorConfig;
    configure(configuration: DataCreatorConfig): void;
}

export class DataCreatorConfigurator implements IDataCreatorConfigurator {
    configuration: DataCreatorConfig;

    constructor() {
        this.configuration = {} as DataCreatorConfig;
    }

    configure(configuration: DataCreatorConfig): void {
        this.configuration = configuration;
    }
}
