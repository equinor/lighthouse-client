import { FilterOptions } from '@equinor/filter';
import { getGardenItemColor } from '../../Components/Garden/gardenFunctions';
import {
    StepFilterContainer,
    StepFilterText,
    WorkflowFilterDot,
} from '../../Components/Workflow/Components/WorkflowFilterDot';
import { getStatusLetterFromStatus } from '../../Functions/tableHelpers';
import { PipetestStep } from '../../Types/drcEnums';
import { Pipetest } from '../../Types/pipetest';

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
        name: 'Lines tags',
        valueFormatter: ({ lineNos }) => (lineNos.length === 0 ? 'No Line Tags' : 'Has Line Tags'),
    },
];
