import { FilterOptions, FilterValueType } from '@equinor/filter';
import { ReleaseControl } from '../../types/releaseControl';

const getNextToSign = (rc: ReleaseControl) => {
    const nextToSign = rc.workflowSteps.find((fs) => {
        if (fs.criterias[0]?.signedAtUtc === null) {
            return true;
        }
    });
    return nextToSign?.criterias[0].valueDescription ?? null;
};

export const filterOptions: FilterOptions<ReleaseControl> = [
    {
        name: 'Current step',
        valueFormatter: (s) => (s.currentWorkflowStep ? s.currentWorkflowStep.name : null),
    },
    {
        name: 'State',
        valueFormatter: ({ isVoided, state }) => (isVoided ? 'Voided' : state),
        defaultUncheckedValues: ['Voided'],
    },
    { name: 'Phase', valueFormatter: ({ phase }) => phase },
    { name: 'Status', valueFormatter: ({ workflowStatus }) => workflowStatus },
    {
        name: 'System',
        valueFormatter: ({ systems }) =>
            systems
                ?.map((system) => (system.toString() !== '' ? system.toString() : null))
                .filter((v, i, a) => a.indexOf(v) === i),
    },
    {
        name: 'Area',
        valueFormatter: ({ areas }) =>
            areas
                ?.map((area) => (area !== '' ? area : null))
                .filter((v, i, a) => a.indexOf(v) === i),
    },
    {
        name: 'CommPk',
        valueFormatter: ({ commPkNos }) =>
            commPkNos
                ?.map((commPk) => (commPk !== '' ? commPk : null))
                .filter((v, i, a) => a.indexOf(v) === i),
    },
    {
        name: 'Switchboard',
        valueFormatter: ({ switchboards }) =>
            switchboards
                ?.map((switchboard) => (switchboard !== '' ? switchboard : null))
                .filter((v, i, a) => a.indexOf(v) === i),
    },
    {
        name: 'Circuit',
        valueFormatter: ({ circuits }) =>
            circuits
                ?.map((circuit) => (circuit !== '' ? circuit : null))
                .filter((v, i, a) => a.indexOf(v) === i),
    },
    {
        name: 'Isolated',
        valueFormatter: ({ hasIsolatedEquipment }) => booleanToHumanReadable(hasIsolatedEquipment),
        sort: (s) => s.sort(sortOnYesNo),
    },
    {
        name: 'Disconnected',
        valueFormatter: ({ hasDisconnectedEquipment }) =>
            booleanToHumanReadable(hasDisconnectedEquipment),
        sort: (s) => s.sort(sortOnYesNo),
    },
    {
        name: 'Next to Sign',
        valueFormatter: (s) => getNextToSign(s),
    },
    {
        name: 'Time on step',
        valueFormatter: ({ timeOnLastStep }) => weekConverter(timeOnLastStep),
    },
];

function booleanToHumanReadable(val: boolean | undefined) {
    return val ? 'Yes' : 'No';
}

function sortOnYesNo(a: FilterValueType, b: FilterValueType) {
    return b === 'No' ? -1 : 1;
}

function weekConverter(days: string | undefined) {
    const daysNumber = Number(days?.split(' ')[0]);
    const weeks = Math.round(daysNumber / 7);

    switch (weeks) {
        case 1: {
            return '1W or less';
        }
        case 2: {
            return '2W or less';
        }
        case 3: {
            return '3W or less';
        }
        case 4: {
            return '4W or less';
        }
        default: {
            return '4W or more';
        }
    }
}
