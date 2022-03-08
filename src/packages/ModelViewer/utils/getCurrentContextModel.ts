import { AssetMetadataSimpleDto, ModelsClient } from '@equinor/echo3dweb-viewer';
import { Message, MessageType } from '../types/message';
import { ModelViewerState } from '../types/plants';

export async function getModels(modelsClient: ModelsClient): Promise<AssetMetadataSimpleDto[]> {
    try {
        return await modelsClient.listModels('Reveal', undefined);
    } catch (error) {
        return [];
    }
}

export function createMessage(message: string, type: MessageType): Message {
    return { message, type };
}

export function selectPlantByContext(
    assetsMetaData: AssetMetadataSimpleDto[],
    context: string
): Partial<ModelViewerState> {
    const plants = assetsMetaData.filter((asset) => asset.plantCode === context);
    let message: Message | undefined = undefined;
    if (plants.length === 0) {
        message = createMessage(`No plats awaitable in the current context ${context}}`, 'NoPlant');
    }

    const currentPlant = plants[0];

    return {
        plants,
        currentPlant,
        message,
        isLoading: false,
    };
}
