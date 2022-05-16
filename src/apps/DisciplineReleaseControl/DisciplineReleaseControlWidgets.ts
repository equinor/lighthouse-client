import {
    ResolverFunction,
    SidesheetComponentManifest,
    SidesheetWidgetManifest
} from '@equinor/lighthouse-workspace-api';
import { ReleaseControlHTSidesheet } from './Components/Sidesheet/ReleaseControlHTSidesheet';
import { ReleaseControlSidesheet } from './Components/Sidesheet/ReleaseControlSidesheet';

export const ReleaseControlHTSidesheetWidgetManifest: SidesheetWidgetManifest = {
    widgetId: 'ht',
    widgetType: 'sidesheet',
    color: '#7B3A96',
    props: {
        resolverId: 'htResolver',
        objectIdentifier: 'name',
    },
};

export const ReleaseControlHTSidesheetWidgetComponent: SidesheetComponentManifest = {
    widgetId: 'ht',
    widgetType: 'sidesheet',
    widget: ReleaseControlHTSidesheet,
};

export const htResolverFunction: ResolverFunction<{ name: string }> = {
    functionId: 'htResolver',
    function: () => {
        return { name: '' };
    },
    type: 'idResolver',
};

export const ReleaseControlSidesheetWidgetManifest: SidesheetWidgetManifest = {
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

export const rcResolverFunction: ResolverFunction<{ name: string }> = {
    functionId: 'rcResolver',
    function: () => {
        return { name: '' };
    },
    type: 'idResolver',
};
