import { FilterOptions, FilterValueType } from '@equinor/filter';
import {
    StepFilterContainer,
    StepFilterText,
    WorkflowFilterDot,
} from '../../../Components/Workflow/Components/WorkflowFilterDot';
import { PipetestStep } from '../../../Types/drcEnums';
import { Pipetest } from '../../../Types/pipetest';
import { getGardenItemColor } from '../../helpers/gardenFunctions';
import { sortFilterValueDateDurations } from '../../helpers/statusHelpers';
import { getStatusLetterFromStatus } from '../../helpers/tableHelpers';

export const filterConfig: FilterOptions<Pipetest> = [
    {
        name: 'Current step',
        valueFormatter: ({ step }) => step,
        customValueRender: (value) => {
            return (
                <StepFilterContainer>
                    <WorkflowFilterDot
                        color={getGardenItemColor(value?.toString())}
                        circleText={getStatusLetterFromStatus(value?.toString())}
                    />
                    <StepFilterText title={value?.toString()}>{value}</StepFilterText>
                </StepFilterContainer>
            );
        },
        sort: (values) => {
            values.sort((a, b) => {
                const map = new Map<string, number>();

                map.set(PipetestStep.Unknown, 0);
                map.set(PipetestStep.PressureTest, 1);
                map.set(PipetestStep.ChemicalCleaning, 2);
                map.set(PipetestStep.HotOilFlushing, 3);
                map.set(PipetestStep.Bolttensioning, 4);
                map.set(PipetestStep.Painting, 5);
                map.set(PipetestStep.HtTest, 6);
                map.set(PipetestStep.Insulation, 7);
                map.set(PipetestStep.BoxInsulation, 8);
                map.set(PipetestStep.HtRetest, 9);
                map.set(PipetestStep.HtCTest, 10);
                map.set(PipetestStep.Marking, 11);
                map.set(PipetestStep.Complete, 12);

                if (typeof a !== 'string') return 0;
                if (typeof b !== 'string') return 0;

                return (map.get(a) ?? -0) - (map.get(b) ?? -0);
            });
            return values;
        },
        isQuickFilter: true,
    },

    {
        name: 'Step name',
        valueFormatter: ({ steps }) => steps.filter((v, i, a) => a.indexOf(v) === i),

        customValueRender: (value) => {
            return (
                <StepFilterContainer>
                    <WorkflowFilterDot
                        color={getGardenItemColor(value?.toString())}
                        circleText={getStatusLetterFromStatus(value?.toString())}
                    />
                    <StepFilterText title={value?.toString()}>{value}</StepFilterText>
                </StepFilterContainer>
            );
        },
        sort: (values) => {
            values.sort((a, b) => {
                const map = new Map<string, number>();

                map.set(PipetestStep.Unknown, 0);
                map.set(PipetestStep.PressureTest, 1);
                map.set(PipetestStep.ChemicalCleaning, 2);
                map.set(PipetestStep.HotOilFlushing, 3);
                map.set(PipetestStep.Bolttensioning, 4);
                map.set(PipetestStep.Painting, 5);
                map.set(PipetestStep.HtTest, 6);
                map.set(PipetestStep.Insulation, 7);
                map.set(PipetestStep.BoxInsulation, 8);
                map.set(PipetestStep.HtRetest, 9);
                map.set(PipetestStep.HtCTest, 10);
                map.set(PipetestStep.Marking, 11);

                if (typeof a !== 'string') return 0;
                if (typeof b !== 'string') return 0;

                return (map.get(a) ?? -0) - (map.get(b) ?? -0);
            });
            return values;
        },
    },

    {
        name: 'System',
        valueFormatter: ({ name }) => name.substring(0, 2),
        isQuickFilter: true,
    },
    {
        name: 'Priority',
        valueFormatter: ({ commPkPriority1 }) =>
            commPkPriority1 !== '' ? commPkPriority1 : 'Unknown',
        isQuickFilter: true,
    },
    {
        name: 'Location',
        valueFormatter: ({ location }) => location,
        isQuickFilter: true,
    },
    {
        name: 'Due date time period',
        valueFormatter: ({ dueDateTimePeriod }) => dueDateTimePeriod,
    },
    {
        name: 'Overdue',
        valueFormatter: ({ overdue }) => overdue,
        sort: (s) => s.sort(sortOnYesNo),
    },
    {
        name: 'Completion status',
        valueFormatter: ({ shortformCompletionStatus }) => shortformCompletionStatus,
    },
    {
        name: 'Switchboard',
        valueFormatter: ({ circuits }) =>
            circuits
                .map(({ switchBoardTagNo }) => switchBoardTagNo)
                .filter((v, i, a) => a.indexOf(v) === i),
    },

    {
        name: 'Circuit',
        valueFormatter: ({ circuits }) =>
            circuits
                .map(({ circuitAndStarterTagNo }) =>
                    circuitAndStarterTagNo !== '' ? circuitAndStarterTagNo : null
                )
                .filter((v, i, a) => a.indexOf(v) === i),
    },
    {
        name: 'Critical lines',
        valueFormatter: ({ hasCriticalLine }) =>
            hasCriticalLine ? booleanToHumanReadable(true) : booleanToHumanReadable(false),
        sort: (s) => s.sort(sortOnYesNo),
    },
    {
        name: 'HT cable exposed',
        valueFormatter: ({ htCableExposed }) => htCableExposed,
        sort: (values) => {
            return sortFilterValueDateDurations(values);
        },
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
];

function booleanToHumanReadable(val: boolean | undefined) {
    return val ? 'Yes' : 'No';
}

function sortOnYesNo(a: FilterValueType, b: FilterValueType) {
    return b === 'No' ? -1 : 1;
}
