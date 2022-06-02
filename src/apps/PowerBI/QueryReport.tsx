import { PowerBI } from '@equinor/lighthouse-powerbi';

export const QueryReport = (): JSX.Element => {
    const reportUri = 'pp-query-analytics';

    return <PowerBI reportUri={reportUri} />;
};
