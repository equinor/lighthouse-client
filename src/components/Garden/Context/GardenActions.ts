import { ActionType, createCustomAction } from 'typesafe-actions';
import { DataAction } from './GardenContext';

export const actions = {
    setGroupKeys: createCustomAction(DataAction.setGroupKeys, (groupKeys) => ({
        groupKeys,
    })),

    setExcludeKeys: createCustomAction(DataAction.setExcludeKeys, (excludeKeys) => ({
        excludeKeys,
    })),

    setGroupeKey: createCustomAction(DataAction.setGroupeKey, (groupeKey) => ({
        groupeKey,
    })),
};

export type Actions = ActionType<typeof actions>;
