import { createPageViewer } from '../../Core/PageViwer/Api/pageViewerApi';
import { AppApi } from '../apps';

export function setup(api: AppApi): void {
    const construction = createPageViewer({
        viewerId: api.shortName,
        title: api.title,
    });

    construction.registerFusionPowerBi('swcr-analytics-rls', {
        title: 'SWCR Analytics',
        reportURI: 'swcr-analytics-rls',
    });
    construction.registerFusionPowerBi('lci-hanging-gardens', {
        title: 'LCI Hanging Garden',
        reportURI: 'lci-hanging-gardens',
    });
    construction.registerFusionPowerBi('checklist-analytics-rls', {
        title: 'Checklist Analytics',
        reportURI: 'checklist-analytics-rls',
    });
    construction.registerFusionPowerBi('ec2496e8-e440-441c-8e20-73d3a9d56f74', {
        title: 'Punch Analytics',
        reportURI: 'punch-analytics-rls',
    });
    construction.registerFusionPowerBi('fd4052a9-641b-47b4-92d6-4876ecb8cdba', {
        title: 'WO Analytics',
        reportURI: 'wo-analytics-rls',
    });
}
