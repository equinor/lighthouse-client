import { ActionType, createCustomAction } from 'typesafe-actions';
import { DataAction } from './ParkViewContext';

export const actions = {
    setGroupKeys: createCustomAction(DataAction.setGroupKeys, (groupKeys: string[]) => ({
        groupKeys,
    })),

    setExcludeKeys: createCustomAction(DataAction.setExcludeKeys, (excludeKeys: string[]) => ({
        excludeKeys,
    })),

    setGardenKey: createCustomAction(DataAction.setGardenKey, (gardenKey?: string) => ({
        gardenKey,
    })),

    setData: createCustomAction(DataAction.setData, (data: unknown[]) => ({
        data,
    })),
};

export type Actions = ActionType<typeof actions>;
