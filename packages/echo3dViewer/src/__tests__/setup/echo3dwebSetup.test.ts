import { Echo3dClient } from '../../services/echo3dClient';
import { Echo3dViewer } from '../../services/echo3DViewer';
import { HierarchyClient } from '../../services/generated/EchoHierarchyApiClient';
import { ModelsClient } from '../../services/generated/EchoModelDistributionApiClient';
import { setupEcho3dWeb } from '../../setup/echo3dwebSetup';

describe('setupEcho3dWeb', () => {
    test('should successfully initialize echo 3d web Viewer', async () => {
        const getAccessToken = jest.fn().mockResolvedValue('accessToken');
        const modelDistributionConfig = { baseUrl: 'baseUrl', getAccessToken };
        const hierarchyConfig = { baseUrl: 'baseUrl', getAccessToken };
        const parentDiv = document.createElement('div');
        const canvas = document.createElement('canvas');
        parentDiv.appendChild(canvas);

        const { client, viewer, modelApiClient, hierarchyApiClient } = await setupEcho3dWeb(
            canvas,
            modelDistributionConfig,
            hierarchyConfig
        );

        expect(client instanceof Echo3dClient).toBeTruthy();
        expect(viewer instanceof Echo3dViewer).toBeTruthy();
        expect(modelApiClient instanceof ModelsClient).toBeTruthy();
        expect(hierarchyApiClient instanceof HierarchyClient).toBeTruthy();
    });
});
