import { ActionType, createCustomAction } from 'typesafe-actions';
import { ThreeDInstance } from '../Api/threeD';
import { ViewerInstance } from './3DContextProvider';
import { ModelData } from './3DState';

export enum ThreeDActionsAction {
    setModelData = 'setModelData',
    setThreeDViewer = 'setThreeDViewer',
    setFocusMode = 'setFocusMode',
    setThreeDInstance = 'setThreeDInstance',
    setSelectedNode = 'setSelectedNode'
}
export type Echo3DActionsActionType = typeof ThreeDActionsAction;

export const actions = {
    setThreeDInstance: createCustomAction(
        ThreeDActionsAction.setThreeDInstance,
        (instance: ThreeDInstance) => ({
            instance
        })
    ),
    setModelData: createCustomAction(
        ThreeDActionsAction.setModelData,
        (modelData: ModelData) => ({
            modelData
        })
    ),
    setThreeDViewer: createCustomAction(
        ThreeDActionsAction.setThreeDViewer,
        (threeDViewer: ViewerInstance) => ({
            threeDViewer
        })
    )
};

export type Actions = ActionType<typeof actions>;
