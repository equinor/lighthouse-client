import { ActionType, createCustomAction } from 'typesafe-actions';
import { DataAction } from './ParkViewContext';

export const actions = {
    setGroupKeys: createCustomAction(DataAction.setGroupKeys, (groupKeys: string[]) => ({
        groupKeys,
    })),

    setGardenKey: createCustomAction(DataAction.setGardenKey, (gardenKey?: string) => ({
        gardenKey,
    })),

    setData: createCustomAction(DataAction.setData, (data: unknown[]) => ({
        data,
    })),
};

export type Actions = ActionType<typeof actions>;
