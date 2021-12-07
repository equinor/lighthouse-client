import { createPageViewer } from '../../Core/PageViwer/Api/pageViewerApi';
import { AppApi } from '../apps';

export function setup(api: AppApi): void {
    const construction = createPageViewer({
        viewerId: api.shortName,
        title: api.title,
    });

    construction.registerFusionPowerBi('test', {
        title: 'test',
        reportURI: '7a8be422-7446-488a-9aa6-1d1e52bf93ce',
    });
    construction.registerFusionPowerBi('test2', {
        title: 'Test2',
        reportURI: '7a8be422-7446-488a-9aa6-1d1e52bf93ce',
    });
    construction.registerCustom('test3', {
        title: 'Test3',
        component: () => (
            <iframe
                title="Scaffolding analytics - Overview"
                width="100%"
                height="800"
                src="https://app.powerbi.com/reportEmbed?reportId=7a8be422-7446-488a-9aa6-1d1e52bf93ce&autoAuth=true&ctid=3aa4a235-b6e2-48d5-9195-7fcf05b459b0&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLW5vcnRoLWV1cm9wZS1oLXByaW1hcnktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D"
                frameBorder="0"
                allowFullScreen={true}
            ></iframe>
        ),
    });
}
