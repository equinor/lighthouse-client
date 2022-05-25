import { setupWorkspaceSidesheet } from '../../Core/WorkSpace/src/WorkSpaceApi/Functions/setupWorkspaceSidesheet';
import { ReleaseControlHTSidesheet } from './Components/Sidesheet/ReleaseControlHTSidesheet';
import { ReleaseControlSidesheet } from './Components/Sidesheet/ReleaseControlSidesheet';
import { HTSidesheet, Pipetest } from './Types/pipetest';

export const htSidesheetCreator = setupWorkspaceSidesheet<HTSidesheet, 'ht'>({
    id: 'ht',
    color: '#0084C4',
    component: ReleaseControlHTSidesheet,
    props: {
        objectIdentifier: 'value',
        parentApp: 'piping-and-ht',
        function: (id: string) => {
            return { value: id, items: [] } as HTSidesheet;
        },
    },
});

export const rcSidesheetCreator = setupWorkspaceSidesheet<Pipetest, 'rc'>({
    id: 'rc',
    color: '#0084C4',
    component: ReleaseControlSidesheet,
    props: {
        objectIdentifier: 'name',
        parentApp: 'piping-and-ht',
        function: (id: string) => {
            return { name: id } as Pipetest;
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
