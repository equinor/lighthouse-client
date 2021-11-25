import { ActionType, createCustomAction } from 'typesafe-actions';
import { DataAction } from './GardenContext';

export const actions = {
    setGroupKeys: createCustomAction(DataAction.setGroupKeys, (groupKeys: string[]) => ({
        groupKeys,
    })),

    setExcludeKeys: createCustomAction(DataAction.setExcludeKeys, (excludeKeys: string[]) => ({
        excludeKeys,
    })),

    setGroupeKey: createCustomAction(DataAction.setGroupeKey, (groupeKey: string) => ({
        groupeKey,
    })),
};

export type Actions = ActionType<typeof actions>;
