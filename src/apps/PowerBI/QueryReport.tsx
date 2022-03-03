import { PowerBI } from '../../modules/powerBI';

export const QueryReport = (): JSX.Element => {
    const reportUri = 'pp-query-analytics';

    return <PowerBI reportUri={reportUri} />;
};
