import { ActionType, createCustomAction } from 'typesafe-actions';

export enum PageViewerAction {
    setSelectedTab = 'setSelectedTab',
}

export const actions = {
    setSelectedItem: createCustomAction(PageViewerAction.setSelectedTab, (id: number) => ({ id })),
};

export type Action = ActionType<typeof actions>;
