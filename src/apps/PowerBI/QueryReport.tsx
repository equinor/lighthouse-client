import { PowerBI } from "../../modules/powerBI";

export function QueryReport() {
    const reportUri = "query-analytics-rls"

    return (
        <PowerBI reportUri={reportUri} />
    );
}