import { PowerBI } from "../../modules/powerBI";
import { Filter } from '../../modules/powerBI/src/models/filter';

export function MDRReport() {
    const reportUri = "mdr"

    const filterOptions: Filter[] = [
        {
            values: ["Johan Castberg"],
            target: {
                table: 'Dim_MasterProject',
                column: 'Project'
            },
            operator: "In"
        },
        {
            values: ['JCA'],
            target: {
                column: 'FACILITY',
                table: 'Commpkg'
            },
            operator: "In"
        }
    ]

    return (
        <PowerBI reportUri={reportUri} filterOptions={filterOptions} />
    );
}