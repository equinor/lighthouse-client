import { Echo3dClient } from '../../services/echo3dClient';
import { initializeEcho3dClient } from '../../setup/initializeEcho3dClient';

describe('initializeEcho3dClient', () => {
    test('should successfully create a echo 3d client', async () => {
        const getAccessToken = jest.fn().mockResolvedValue('accessToken');
        const client = await initializeEcho3dClient('baseUrl', getAccessToken);

        expect(client instanceof Echo3dClient).toBeTruthy();
    });

    test('should throw error when unable to create a echo 3d client', async () => {
        const getAccessToken = jest.fn().mockResolvedValue(undefined);
        await expect(initializeEcho3dClient('baseUrl', getAccessToken)).rejects.toThrow();
    });

    test('should throw error when authenticate is called on a create echo 3d client', async () => {
        const getAccessToken = jest.fn().mockResolvedValueOnce('accessToken').mockResolvedValueOnce(undefined);
        const client = await initializeEcho3dClient('baseUrl', getAccessToken);

        expect(client instanceof Echo3dClient).toBeTruthy();

        await expect(client.authenticate()).rejects.toThrow();
    });

    test('should successfully re-authenticate is using a created echo 3d client', async () => {
        const getAccessToken = jest.fn().mockResolvedValue('accessToken');
        const client = await initializeEcho3dClient('baseUrl', getAccessToken);

        expect(client instanceof Echo3dClient).toBeTruthy();

        const loginSuccess = client.authenticate();
        expect(await loginSuccess).toBe(true);
    });
});
