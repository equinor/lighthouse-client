import type { Module } from '@equinor/fusion-framework-module';
import { DataCreatorConfigurator, IDataCreatorConfigurator } from './configurator';
import { DataCreationProvider, IDataCreationProvider } from './provider';

export type DataCreatorModule = Module<
    'dataCreator',
    IDataCreationProvider,
    IDataCreatorConfigurator,
    []
>;

export const module: DataCreatorModule = {
    name: 'dataCreator',
    configure: () => new DataCreatorConfigurator(),
    initialize: ({ dataCreator }) => new DataCreationProvider(dataCreator.configuration),
};

export default module;

declare module '@equinor/lighthouse-fusion-modules' {
    interface Modules {
        dataCreator: DataCreatorModule;
    }
}
