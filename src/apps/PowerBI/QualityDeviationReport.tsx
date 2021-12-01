import { PowerBI } from "../../modules/powerBI"
import { Filter } from "../../modules/powerBI/src/models/filter";

export function QualityDeviationReport() {
    const reportUri = "qualityd"

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