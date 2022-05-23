import { CreatorManifest } from '@equinor/lighthouse-fusion-modules';
import { openSidesheetById } from '@equinor/sidesheet';
import { useMemo } from 'react';
import { useDataCreatorContext } from '../Context/DataCreatorProvider';


export interface Creators {
    creators: CreatorManifest[];
    openCreatorById(creatorId: string): Promise<void>;
}

export function useDataCreator(factoryIds?: string[]): Creators {
    const state = useDataCreatorContext();

    const creators = useMemo(() => {
        return factoryIds
            ? state.getCreators().filter((creator) => factoryIds.includes(creator.widgetId))
            : state.getCreators();
    }, [factoryIds, state]);

    async function openCreatorById(creatorId: string): Promise<void> {
        const manifest = await state.getCreatorById(creatorId);
        if (manifest) {
            openSidesheetById(manifest.widgetId);
        }
    }

    return { creators, openCreatorById };
}
