import { PowerBI } from "../../modules/powerBI";

export function MDRReport() {
    const reportUri = "mdr"

    return (
        <PowerBI reportUri={reportUri} />
    );
}