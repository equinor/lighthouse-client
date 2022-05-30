import { setupWorkspaceSidesheet } from '../../Core/WorkSpace/src/WorkSpaceApi/Functions/setupWorkspaceSidesheet';
import { ReleaseControlHTSidesheet } from './Components/Sidesheet/ReleaseControlHTSidesheet';
import { ReleaseControlSidesheet } from './Components/Sidesheet/ReleaseControlSidesheet';
import { responseAsync, responseParser } from './DisciplineReleaseControlApp';
import { HTSidesheet, Pipetest } from './Types/pipetest';

export const htSidesheetCreator = setupWorkspaceSidesheet<HTSidesheet, 'ht'>({
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

export const rcSidesheetCreator = setupWorkspaceSidesheet<Pipetest, 'pt'>({
    id: 'pt',
    color: '#0084C4',
    component: ReleaseControlSidesheet,
    props: {
        objectIdentifier: 'name',
        parentApp: 'piping-and-ht',
        function: async (id: string) => {
            const items = await responseParser(await responseAsync());
            return items.find((item) => item.id === id);
        },
    },
});

export const htSidesheetWidgetManifest = htSidesheetCreator('SidesheetManifest');
export const htSidesheetWidgetComponent = htSidesheetCreator('SidesheetComponentManifest');
export const htResolverFunction = htSidesheetCreator('ResolverFunction');

export const ReleaseControlSidesheetWidgetManifest = rcSidesheetCreator('SidesheetManifest');
export const ReleaseControlSidesheetWidgetComponent = rcSidesheetCreator(
    'SidesheetComponentManifest'
);
export const rcResolverFunction = rcSidesheetCreator('ResolverFunction');
