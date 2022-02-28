import {
    ApiException as HierarchyApiException,
    ApiStatusClient
} from '../../services/generated/EchoModelDistributionApiClient';
import { getModelsClient, initializeModelClient } from '../../services/modelsClient';

const mockIsOnline = jest.fn();

jest.mock('../../services/generated/EchoModelDistributionApiClient', () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- The test will fail if this any does not work.
    const real = jest.requireActual('../../services/generated/EchoModelDistributionApiClient');

    return {
        ...real,
        ApiStatusClient: class MockApiStatusClient {
            getApiStatusIsOnline = mockIsOnline;
        }
    } as unknown;
});

const actualFetch = global.fetch;

beforeEach(() => {
    global.fetch = jest.fn();
});

afterAll(() => {
    global.fetch = actualFetch;
});

describe('ModelsClient', () => {
    test('Should return empty list of models from model client', async () => {
        const getAccessToken = jest.fn();
        initializeModelClient('coolUrl', getAccessToken);

        getAccessToken.mockResolvedValue({ accessToken: 'TOKEN' });
        global.fetch = jest.fn(() =>
            Promise.resolve({
                status: 200,
                text: jest.fn().mockResolvedValue('[]')
            } as unknown as Response)
        );

        const client = getModelsClient();
        expect(client).toBeDefined();

        const models = await client.listModels();
        expect(models).toEqual([]);
    });

    test('Should throw error when trying to fetch list of models', async () => {
        const getAccessToken = jest.fn();
        initializeModelClient('coolUrl', getAccessToken);
        getAccessToken.mockResolvedValue('TOKEN');

        const client = getModelsClient();
        expect(client).toBeDefined();

        (global.fetch as jest.Mock).mockRejectedValue('API is down');

        try {
            await client.listModels();
        } catch (e) {
            // eslint-disable-next-line jest/no-conditional-expect -- Only way to test this
            expect(e).toBe('API is down');
        }
    });

    test('Should throw error when access token is empty', async () => {
        const getAccessToken = jest.fn();
        initializeModelClient('coolUrl', getAccessToken);
        getAccessToken.mockResolvedValue(undefined);
        const client = getModelsClient();
        expect(client).toBeDefined();

        await expect(client.listModels()).rejects.toThrowError('getAccessToken did not return an access token.');
    });
});

describe('ApiStatusClient', () => {
    test('Should first throw error for api is online, then should throw error', async () => {
        const client = new ApiStatusClient();
        mockIsOnline.mockResolvedValue(undefined);
        await expect(client.getApiStatusIsOnline()).resolves.not.toThrow();
        mockIsOnline.mockReset();

        mockIsOnline.mockRejectedValue(new HierarchyApiException('You are offline!?', 0, '', {}, ''));
        await expect(client.getApiStatusIsOnline()).rejects.toBeInstanceOf(HierarchyApiException);
    });
});
