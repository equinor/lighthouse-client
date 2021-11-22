import { PowerBI } from "../../modules/powerBI";
import { Filter } from "../../modules/powerBI/src/models/filter";

export function NonConformityReport() {
    const reportUri = "43116078-6fc0-47c4-8f3b-880faacf5ea0"

    const filterOptions: Filter[] = [
        {
            values: ["Johan Castberg"],
            target: {
                table: 'Dim_MasterProject',
                column: 'Project'
            },
            operator: "In"
        }
    ]

    return (
        <PowerBI reportUri={reportUri} filterOptions={filterOptions} />
    );
}