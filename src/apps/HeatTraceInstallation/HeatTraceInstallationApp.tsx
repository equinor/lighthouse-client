import { AnalyticsOptions } from '@equinor/Diagrams';
import { ClientApi } from '@equinor/portal-client';
import { CustomSidesheet } from './CustomSidesheet';
import { pipetestData } from './pipetestData';
import { Pipetest } from './Types/Pipetest';

export function setup(appApi: ClientApi): void {
    const request = appApi.createWorkSpace<Pipetest>({
        CustomSidesheet: CustomSidesheet,
    });

    request.registerDataSource(async () => {
        return pipetestData;
    });

    const scopeChangeExcludeKeys: (keyof Pipetest)[] = ['checklists', 'lineAndSpools', 'tagTree'];

    request.registerFilterOptions({
        excludeKeys: scopeChangeExcludeKeys,
        typeMap: {},
    });

    request.registerTableOptions({
        objectIdentifierKey: 'name',
        columnOrder: ['name', 'description'],
        hiddenColumns: ['tagTree'],
        enableSelectRows: true,
        headers: [
            { key: 'name', title: 'Name', width: 1000 },
            {
                key: 'description',
                title: 'Description',
            },
            { key: 'checklists', title: 'Checklists' },
            { key: 'lineAndSpools', title: 'Line and spools' },
        ],
    });

    request.registerGardenOptions({ gardenKey: 'name', itemKey: 'name' });
    request.registerAnalyticsOptions(analyticsOptions);
}

export const analyticsOptions: AnalyticsOptions<Pipetest> = {
    section1: {
        chart1: {
            type: 'barChart',
            options: {
                categoryKey: 'name',
                nameKey: 'name',
                stacked: true,
            },
        },
    },
};

// function checklistTagFunc<T>(data: T): string {
//     switch (data['tagNo'].charAt(1)) {
//         case 'B':
//             return 'Bolttensioning';
//         case 'T':
//             return 'Piping';
//         case 'X':
//             return 'Painting';
//         case 'Z':
//             return 'Insulation';
//         case 'M':
//             return 'Marking';
//         case 'C':
//             return 'Chemical cleaning';
//         case 'H':
//             return 'Hot oil flushing';
//         default:
//             return 'Unknown';
//     }
// }
