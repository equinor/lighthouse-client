import { ActionType, createCustomAction } from 'typesafe-actions';
import { DataState } from './DataProvider';

export enum DataAction {
    setData = 'setData',
    setInstance = 'setInstance',
}

export const actions = {
    setData: createCustomAction(DataAction.setData, (data: any[]) => ({ data })),
    setInstance: createCustomAction(DataAction.setInstance, (instance: DataState) => ({
        instance,
    })),
};

export type Action = ActionType<typeof actions>;
