import { FilterOptions, FilterValueType } from '@equinor/filter';
import {
    StepFilterContainer,
    StepFilterText,
    WorkflowFilterDot,
} from '../../../Components/Workflow/Components/WorkflowFilterDot';
import { PipetestStep } from '../../../Types/drcEnums';
import { Pipetest } from '../../../Types/pipetest';
import { getGardenItemColor } from '../../helpers/gardenFunctions';
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
        valueFormatter: ({ lines }) =>
            lines?.some((line) => line.isCritical === true)
                ? booleanToHumanReadable(true)
                : booleanToHumanReadable(false),
        sort: (s) => s.sort(sortOnYesNo),
    },
    {
        name: 'HT cable exposed',
        valueFormatter: ({ htCableExposed }) => htCableExposed,
        sort: (values) => {
            values.sort((a, b) => {
                const map = new Map<string, number>();

                //Different values for days/weeks/months/years
                map.set('d', 1);
                map.set('w', 2);
                map.set('m', 3);
                map.set('y', 4);

                if (typeof a !== 'string' || a === null) return -1;
                if (typeof b !== 'string' || b === null) return -1;

                let result = 0;
                //If time format (days/weeks/months/years) is different we calculate based on the map above
                if (a.substring(a.length - 1) !== b.substring(b.length - 1)) {
                    result =
                        (map.get(a.substring(a.length - 1)) ?? -0) -
                        (map.get(b.substring(b.length - 1)) ?? -0);
                    //If time format is the same we calculate based on the number before the letter
                } else {
                    result =
                        Number(a.substring(0, a.length - 1)) - Number(b.substring(0, b.length - 1));
                }
                return result;
            });
            return values;
        },
    },
];

function booleanToHumanReadable(val: boolean | undefined) {
    return val ? 'Yes' : 'No';
}

function sortOnYesNo(a: FilterValueType, b: FilterValueType) {
    return b === 'No' ? -1 : 1;
}
