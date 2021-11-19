import { PowerBI } from "../../modules/powerBI";

export function BusinessCaseReport() {
    const reportUri = "pmt-non-confidential"

    return (
        <PowerBI reportUri={reportUri} />
    );
}