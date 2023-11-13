import { CreatorManifest } from '@equinor/lighthouse-fusion-modules';
import { openSidesheetById } from '@equinor/sidesheet';
import { useMemo } from 'react';
import { useDataCreatorContext } from '../Context/DataCreatorProvider';

export interface Creators {
    creators: CreatorManifest[];
    creator: CreatorManifest | undefined;
    openCreatorById(creatorId: string): Promise<void>;
}

export function useDataCreator(factoryIds?: string[] | string): Creators {
    const state = useDataCreatorContext();

    const creators = useMemo(() => {
        return Array.isArray(factoryIds) && factoryIds
            ? state.getCreators().filter((creator) => factoryIds.includes(creator.widgetId))
            : state.getCreators();
    }, [factoryIds, state]);

    const creator = useMemo(() => {
        return typeof factoryIds === 'string'
            ? state.getCreators().find((creator) => factoryIds === creator.widgetId)
            : undefined;
    }, [factoryIds, state]);

    async function openCreatorById(creatorId: string): Promise<void> {
        const manifest = await state.getCreatorById(creatorId);
        if (manifest) {
            openSidesheetById(manifest.widgetId, undefined, manifest);
        }
    }

    return { creators, openCreatorById, creator };
}
