import CameraControls from 'camera-controls';

export * from '@esfx/async-canceltoken';
export * from './controls/CameraControlsExtended';
export * from './controls/FirstPersonCameraControls';
export { MultiPointerCache } from './controls/MultiPointerCache';
export { Echo3dClient } from './services/echo3dClient';
export * from './services/echo3dMultiSelectionActions';
export * from './services/echo3dMultiSelectionHandler';
export { Echo3dSelectionHandler } from './services/echo3dSelectionHandler';
export { Echo3dViewer } from './services/echo3DViewer';
// ApiException is exported twice, this will cause an error so need to export all exports from generated files
export type {
    AabbModel,
    ApiException as HierarchyApiException,
    DataMaintenanceClient,
    HierarchyClient,
    HierarchyNodeModel,
    HierarchyNodeModelListResult, IDataMaintenanceClient,
    IHierarchyClient,
    IHierarchyNodeModel,
    IHierarchyNodeModelListResult,
    INodeWithLeafNodes,
    INodeWithLeafNodesListResult,
    ISimpleNodeModel,
    IStatusClient,
    IStringListResult,
    IUInt32ListResult,
    IVector3Model, NodeWithLeafNodes,
    NodeWithLeafNodesListResult,
    SimpleNodeModel,
    StatusClient,
    StringListResult,
    UInt32ListResult,
    Vector3Model
} from './services/generated/EchoHierarchyApiClient';
export type {
    ApiException as ModelApiException,
    ApiStatusClient,
    AssetDownloadDto,
    AssetDownloadToken,
    AssetMetadataDto,
    AssetMetadataSimpleDto,
    AssetUploadToken, IApiStatusClient,
    IAssetDownloadDto,
    IAssetDownloadToken,
    IAssetMetadataDto,
    IAssetMetadataSimpleDto,
    IAssetUploadToken,
    IModelAdminClient,
    IModelsClient,
    IProblemDetails,
    IRevealBlobOutputMetadata,
    IRevealProxyClient,
    IRevealRevision3D,
    IRevealRevisionOutputs,
    IRevisionCameraProperties,
    IStream, ModelAdminClient,
    ModelsClient,
    ModelStates,
    ProblemDetails,
    RevealBlobOutputMetadata,
    RevealProxyClient,
    RevealRevision3D,
    RevealRevisionOutputs,
    Revision3DStatus,
    RevisionCameraProperties,
    Stream
} from './services/generated/EchoModelDistributionApiClient';
export {
    disposeHierarchyClient,
    getHierarchyClient,
    getTagNoRefNoAndAabbByNodeId,
    initializeHierarchyClient
} from './services/hierarchyClient';
export {
    disposeModelsClient,
    getAvailableModels,
    getModelsClient,
    initializeModelClient
} from './services/modelsClient';
export { setupEcho3dWeb } from './setup/echo3dwebSetup';
export { initializeEcho3dClient } from './setup/initializeEcho3dClient';
export { initializeEcho3dViewer } from './setup/initializeEcho3dViewer';
export type { ApiServiceConfiguration } from './types/apiServiceConfiguration';
export type { EchoSetupObject } from './types/echoSetupObject';
export type { ModelData } from './types/modelData';
export type { RendererConfiguration } from './types/rendererConfiguration';
export type { SelectedNodeInformation } from './types/selectedNodeInformation';
export type { TrackEventBySignature } from './types/trackEventBySignature';
export {
    clamp,
    clampAngle,
    degreesToRads,
    get3dPositionFromAabbMinMaxValues,
    radsToDegrees,
    screenPointToAngleInRad,
    screenPointToAngleXInRad,
    screenPointToAngleYInRad,
    worldToNormalizedViewportCoordinates
} from './utils/calculationUtils';
export { getDomPositionFor3DPosition, moveToAndLookAt } from './utils/cameraUtils';
export { convertCancelTokenToAbort } from './utils/cancelTokenUtils';
export { isIntentionallyCancelled } from './utils/errorHandingUtils';
export { normalizeCursorCoordinatesForThreeScreen } from './utils/mouseEventOffset';
export { isPrimaryClick } from './utils/pointerUtils';

export default CameraControls;
