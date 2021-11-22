import { PowerBI } from '../../modules/powerBI';

export const QueryReport = (): JSX.Element => {
    const reportUri = 'query-analytics-rls';

    return <PowerBI reportUri={reportUri} />;
};
