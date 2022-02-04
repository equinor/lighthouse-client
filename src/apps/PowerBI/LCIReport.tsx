import { PowerBI } from '../../modules/powerBI';

export function LCIReport() {
    const reportUri = 'lci-hanging-gardens';

    return <PowerBI reportUri={reportUri} />;
}
