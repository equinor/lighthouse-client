export type Loop = {
    callOffNo: string | null;
    checklistId: string;
    commissioningPackageNo: string | null;
    commissioningPackageId: string | null;
    description: string | null;
    facility: string | null;
    formularGroup: string | null;
    formularType: string | null;
    function: string | null;
    functionalSystem: string | null;
    isVoided: boolean | null;
    location: string | null;
    loopContentStatus: string | null;
    loopId: string | null;
    loopNo: string;
    needDate: Date | null;
    mechanicalCompletionPackageNo: string | null;
    mechanicalCompletionPackageId: string | null;
    packageNo: string | null;
    priority1: string | null;
    priority2: string | null;
    priority3: string | null;
    project: string | null;
    register: string | null;
    remainingManHours: number | null;
    responsible: string | null;
    revision: string | null;
    rfC_Planned_Forecast_Date: Date | null;
    rfO_Planned_Forecast_Date: Date | null;
    isOverdue: number | null;
    signedDate: string | null;
    status: string | null;
    system: string | null;
    tagStatus: string | null;
    verifiedDate: Date | null;
    loopContentProgress: number | null;
    woPlannedCompletionDate: Date | null;
    woActualCompletionDate: Date | null;
};
const a: Loop[] = [
    {
        checklistId: '23006802',
        facility: 'JCA',
        project: 'L.O532C.002',
        loopId: '112706866',
        loopNo: '@LOOP-43-0430',
        description: 'LIQUID P/V BREAKER DISPLACEMENT PIPE',
        mechanicalCompletionPackageNo: '4306-J001',
        mechanicalCompletionPackageId: '112706829',
        commissioningPackageNo: '4306-H01',
        commissioningPackageId: '112037365',
        formularType: 'INS23',
        formularGroup: 'MCCR',
        responsible: 'KSI',
        status: 'OS',
        revision: null,
        signedDate: null,
        verifiedDate: null,
        needDate: new Date('2023-05-05T00:00:00'),
        rfO_Planned_Forecast_Date: new Date('2023-08-04T00:00:00'),
        rfC_Planned_Forecast_Date: new Date('2023-05-05T00:00:00'),
        isOverdue: 0,
        woPlannedCompletionDate: null,
        woActualCompletionDate: null,
        remainingManHours: null,
        system: '43',
        functionalSystem: '43',
        priority1: 'ECM10',
        priority2: 'ICM14',
        priority3: null,
        location: 'AV100',
        isVoided: false,
        packageNo: null,
        callOffNo: null,
        register: 'LOOP',
        function: '@LOOP',
        tagStatus: 'PLANNED',
        loopContentStatus: null,
        loopContentProgress: null,
    },
];
