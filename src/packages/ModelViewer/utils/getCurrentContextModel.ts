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
    context: string,
    platformSectionId?: string
): Pick<ModelViewerState, 'plants' | 'currentPlant' | 'message' | 'isLoading'> {
    const plants = assetsMetaData.filter((asset) => asset.plantCode === context);
    let message: Message | undefined = undefined;
    if (plants.length === 0) {
        message = createMessage(
            `You need access to ${context} in Echo to use 3D functionality`,
            'NoPlant'
        );
    }

    const currentPlant = platformSectionId
        ? plants.find((p) =>
              p.platformSectionId
                  .toLocaleLowerCase()
                  .includes(platformSectionId.toLocaleLowerCase())
          ) || plants[0]
        : plants[0];

    return {
        plants,
        currentPlant,
        message,
        isLoading: false,
    };
}
