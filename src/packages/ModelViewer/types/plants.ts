import { Cognite3DModel } from '@cognite/reveal';
import {
    AssetMetadataSimpleDto,
    Echo3dMultiSelectionActions,
    EchoSetupObject
} from '@equinor/echo3dweb-viewer';
import { Message } from './message';

export interface ModelViewerState {
    cognite3DModel: Cognite3DModel | undefined;
    echo3DClient: EchoSetupObject | undefined;
    plants: AssetMetadataSimpleDto[];
    currentPlant: AssetMetadataSimpleDto | undefined;
    message?: Message;
    isLoading: boolean;
    tags?: string[];
    selection?: Echo3dMultiSelectionActions;
    padding?: number;
    isCropped: boolean;
    modelIsVisible: boolean;
    tagsIsVisible: boolean;
    hasDefaultColor: boolean;
    viewerSelection: { position: THREE.Vector3; tagNo: string }[];
}
