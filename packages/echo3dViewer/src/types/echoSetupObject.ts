import { Echo3dClient } from '../services/echo3dClient';
import { Echo3dViewer } from '../services/echo3DViewer';
import { HierarchyClient } from '../services/generated/EchoHierarchyApiClient';
import { ModelsClient } from '../services/generated/EchoModelDistributionApiClient';

export interface EchoSetupObject {
    client: Echo3dClient;
    viewer: Echo3dViewer;
    modelApiClient: ModelsClient;
    hierarchyApiClient: HierarchyClient;
}
