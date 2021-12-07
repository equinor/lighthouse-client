import { createPageViewer } from '../../Core/PageViwer/Api/pageViewerApi';
import { AppApi } from '../apps';

export function setup(api: AppApi): void {
    const construction = createPageViewer({
        viewerId: api.shortName,
        title: api.title,
    });

    construction.registerFusionPowerBi('test', {
        title: 'test',
        reportURI: 'lci-hanging-gardens',
    });
    construction.registerFusionPowerBi('test2', {
        title: 'Test2',
        reportURI: 'lci-hanging-gardens',
    });
    construction.registerCustom('test3', {
        title: 'Test3',
        component: () => <div>Hello World!</div>,
    });
}
