import { StatusItem } from '@equinor/lighthouse-status-bar';
import { McPackage } from '../../types';

type Kpi = {
    mcPkgsCount: number;
    finalPunchCount: number;
    punchAcceptedCount: number;
    mcToComCount: number;
    rfccCount: number;
    rfccPercentage: number;
};
const getKpis = (mcPackages: McPackage[]): Kpi => {
    const counts = mcPackages.reduce(
        (acc, curr) => {
            // Final Punch
            if (curr.finalPunchActualDate) {
                acc.finalPunchCount += 1;
            }

            // Punch status Accepted
            if (curr.punchAcceptActualDate) {
                acc.punchAcceptedCount += 1;
            }

            //MC to Com
            if (curr.rfccForecastDate || curr.rfccPlannedDate) {
                acc.mcToComCount += 1;
            }

            // RFCC
            if (curr.rfccActualDate) {
                acc.rfccCount += 1;
            }
            return acc;
        },
        {
            finalPunchCount: 0,
            mcToComCount: 0,
            punchAcceptedCount: 0,
            rfccCount: 0,
        } as Omit<Kpi, 'rfccPercentage' | 'mcPkgsCount'>
    );

    return {
        ...counts,
        mcPkgsCount: mcPackages.length,
        rfccPercentage: (counts.rfccCount / mcPackages.length) * 100,
    };
};
function numberFormat(number: number): string {
    return parseFloat(Math.round(number).toString()).toLocaleString('no');
}
export const statusBarConfig = (data: McPackage[]): StatusItem[] => {
    const kpis = getKpis(data);

    return [
        {
            title: 'Total MCpkgs',
            value: () => numberFormat(kpis.mcPkgsCount),
        },
        {
            title: 'Final punch',
            value: () => numberFormat(kpis.finalPunchCount),
        },
        {
            title: 'Punch status Accepted',
            value: () => numberFormat(kpis.punchAcceptedCount),
        },
        {
            title: 'MC to Com',
            value: () => numberFormat(kpis.mcToComCount),
        },
        {
            title: 'RFCC',
            value: () => numberFormat(kpis.rfccCount),
        },
        {
            title: 'RFCC %',
            value: () => `${numberFormat(kpis.rfccPercentage)}%`,
        },
    ];
};
