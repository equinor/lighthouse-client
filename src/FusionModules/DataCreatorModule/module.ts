import type { Module } from '@equinor/fusion-framework-module';
import { IDataCreatorConfigurator } from './configurator';
import { IDataCreationProvider } from './provider';

export type DataCreatorModule = Module<
    'dataCreator',
    IDataCreationProvider,
    IDataCreatorConfigurator,
    []
>;
