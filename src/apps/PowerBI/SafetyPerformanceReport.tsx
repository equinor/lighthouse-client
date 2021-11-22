import { PowerBI } from '../../modules/powerBI';

export const SafetyPerformanceReport = (): JSX.Element => {
    const reportUri = 'd466006a-d477-44e2-9a13-027908ba5d3c';

    return <PowerBI reportUri={reportUri} />;
};
