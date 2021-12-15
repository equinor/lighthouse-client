/**
 * Create Mock Data for swcrApp Table Visual
 */

export type SwcrStatus = 'Closed' | 'Open';

export type SwcrPackage = {
    swcrId: number;
    controlSystem: string;
    supplier: string;
    status: SwcrStatus;
};

const mockData = {
    controlSystem: ['PCS', 'PDCS', 'IMS', 'PSD', 'ESD', 'MMS'],
    supplier: ['KMK', 'KM', 'AL', 'ASH', 'DS-EU'],
    status: ['Open', 'Closed'],
};

export const createData = (items: number) => {
    const packages: SwcrPackage[] = [];

    for (let i = 0; items > i; i++) {
        packages.push({
            swcrId: i,
            controlSystem: mockData.controlSystem[Math.floor(Math.random() * 6)],
            supplier: mockData.supplier[Math.floor(Math.random() * 5)],
            status: mockData.status[Math.floor(Math.random() * 2)] as SwcrStatus,
        });
    }

    return packages;
};
