import { Echo3dViewer } from '../../services/echo3DViewer';
import { initializeEcho3dClient } from '../../setup/initializeEcho3dClient';
import { initializeEcho3dViewer } from '../../setup/initializeEcho3dViewer';

describe('initializeEcho3dViewer', () => {
    test('should successfully create a echo 3d viewer', async () => {
        const getAccessToken = jest.fn().mockResolvedValue('accessToken');
        const client = await initializeEcho3dClient('baseUrl', getAccessToken);

        const parentDiv = document.createElement('div');
        const canvas = document.createElement('canvas');
        parentDiv.appendChild(canvas);

        const viewer = initializeEcho3dViewer(client, canvas);

        expect(viewer instanceof Echo3dViewer).toBeTruthy();
    });

    test('should throw error when create a echo 3d viewer since canvas has no parent element', async () => {
        const getAccessToken = jest.fn().mockResolvedValue('accessToken');
        const client = await initializeEcho3dClient('baseUrl', getAccessToken);

        const canvas = document.createElement('canvas');

        expect(() => initializeEcho3dViewer(client, canvas)).toThrow();
    });
});
