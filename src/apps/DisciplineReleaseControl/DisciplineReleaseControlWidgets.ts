import {
    ResolverFunction,
    SidesheetComponentManifest,
    SidesheetWidgetManifest
} from '@equinor/WorkSpace';
import { ReleaseControlHTSidesheet } from './Components/Sidesheet/ReleaseControlHTSidesheet';
import { ReleaseControlSidesheet } from './Components/Sidesheet/ReleaseControlSidesheet';
import { HeatTrace, Pipetest } from './Types/pipetest';

export const ReleaseControlHTSidesheetWidgetManifest: SidesheetWidgetManifest<HeatTrace, 'ht'> = {
    widgetId: 'ht',
    widgetType: 'sidesheet',
    color: '#7B3A96',
    props: {
        resolverId: 'htResolver',
        objectIdentifier: 'tagNo',
    },
};

export const ReleaseControlHTSidesheetWidgetComponent: SidesheetComponentManifest = {
    widgetId: 'ht',
    widgetType: 'sidesheet',
    widget: ReleaseControlHTSidesheet,
};

export const htResolverFunction: ResolverFunction<HeatTrace, 'ht'> = {
    functionId: 'htResolver',
    function: () => {
        return { tagNo: '' } as HeatTrace;
    },
};

export const ReleaseControlSidesheetWidgetManifest: SidesheetWidgetManifest<Pipetest, 'rc'> = {
    widgetId: 'rc',
    widgetType: 'sidesheet',
    color: '#7B3A96',
    props: {
        resolverId: 'rcResolver',
        objectIdentifier: 'name',
    },
};

export const ReleaseControlSidesheetWidgetComponent: SidesheetComponentManifest = {
    widgetId: 'rc',
    widgetType: 'sidesheet',
    widget: ReleaseControlSidesheet,
};

export const rcResolverFunction: ResolverFunction<Pipetest, 'rc'> = {
    functionId: 'rcResolver',
    function: () => {
        return { name: '' } as Pipetest;
    },
    type: 'idResolver',
};
