import { ModelsClient } from '../../services/generated/EchoModelDistributionApiClient';
import {
    disposeModelsClient,
    getAvailableModels,
    getModelsClient,
    initializeModelClient
} from '../../services/modelsClient';

jest.mock('../../services/generated/EchoModelDistributionApiClient');

describe('ModelsClient', () => {
    afterEach(() => {
        disposeModelsClient();
    });

    test('should successfully return the models client', () => {
        initializeModelClient('baseUrl', jest.fn());

        const modelsClient = getModelsClient();

        expect(modelsClient instanceof ModelsClient).toBeTruthy();
    });

    test('should throw error when trying to use models client without initializing it first', () => {
        expect(() => getModelsClient()).toThrow();
    });

    test('should throw error when trying to use model client after its disposed of', () => {
        initializeModelClient('baseUrl', jest.fn());

        const modelsClient = getModelsClient();
        expect(modelsClient instanceof ModelsClient).toBeTruthy();

        disposeModelsClient();

        expect(() => getModelsClient()).toThrow();
    });

    test('should call models list models method when calling getAvailableModels', async () => {
        initializeModelClient('baseUrl', jest.fn());

        const modelsClient = getModelsClient();
        const listModelsSpy = jest.spyOn(modelsClient, 'listModels');

        await getAvailableModels();

        expect(listModelsSpy).toHaveBeenCalled();
    });
});
