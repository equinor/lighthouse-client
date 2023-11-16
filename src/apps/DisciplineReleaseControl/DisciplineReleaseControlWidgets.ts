import {
    ResolverFunction,
    SidesheetComponentManifest,
    SidesheetConfigType,
    SidesheetManifest,
    setupWorkspaceSidesheet,
} from '@equinor/WorkSpace';
import { ReleaseControlHTSidesheet } from './Components/Sidesheet/ReleaseControlHTSidesheet';
import { ReleaseControlSidesheet } from './Components/Sidesheet/ReleaseControlSidesheet';
import { HTSidesheet, Pipetest } from './Types/pipetest';
import { responseAsync, responseParser } from './utils/config';

export function htSidesheetCreator(type: SidesheetConfigType) {
    const func = setupWorkspaceSidesheet<HTSidesheet, 'ht'>({
        id: 'ht',
        color: '#0084C4',
        component: ReleaseControlHTSidesheet,
        props: {
            objectIdentifier: 'value',
            parentApp: 'piping-and-ht',
            function: async (id: string) => {
                const items: Pipetest[] = [];
                const ptItems: Pipetest[] = await responseParser(await responseAsync());
                ptItems.forEach((rc) => {
                    const hasHt = rc.heatTraces.find((ht) => ht.tagNo === id);
                    if (hasHt) items.push(rc);
                });

                return { value: id, items } as HTSidesheet;
            },
        },
    });
    return func(type);
}

export function rcSidesheetCreator(type: SidesheetConfigType) {
    const func = setupWorkspaceSidesheet<Pipetest, 'pt'>({
        id: 'pt',
        color: '#0084C4',
        component: ReleaseControlSidesheet,
        props: {
            objectIdentifier: 'name',
            parentApp: 'piping-and-ht',
            function: async (id: string) => {
                const items = await responseParser(await responseAsync());
                return items.find((item) => item.name === id);
            },
        },
    });
    return func(type);
}
