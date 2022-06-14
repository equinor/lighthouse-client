import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { TableOptions } from '../../../../Core/WorkSpace/src/WorkSpaceApi/workspaceState';
import { OriginLink } from '../../Components/DetailView/OriginLink';
import { WorkflowCompact } from './WorkflowCompact';
import { getLastSigned } from './getLastSigned';
import { ScopeChangeRequest } from '../../types/scopeChangeRequest';
import { DateTime } from 'luxon';
import { Atom, deref, swap } from '@dbeining/react-atom';
import styled from 'styled-components';
import { CellProps, EstimateBar, ExpendedProgressBar, CustomColumn } from '@equinor/Table';

const DEFAULT_TABLE_AGGREGATED = { Aggregated: () => null, aggregate: 'count' };

interface CustomCellOptions {
    header: string;
    accessor: AccessorFunction<ScopeChangeRequest>;
    width: number;
    id?: string;
    aggregated?: (s: React.PropsWithChildren<CellProps<ScopeChangeRequest, any>>) => null;
    aggregate?: 'sum' | 'count';
    render?: (item: ScopeChangeRequest, value: any, cell: any) => JSX.Element;
}

type AccessorFunction<T> = (it: T) => string | number | boolean | null | undefined | DateTime;

const defineColumn = ({
    header,
    accessor,
    width,
    ...options
}: CustomCellOptions): CustomColumn<ScopeChangeRequest> => ({
    Header: header,
    id: header,
    accessor: accessor,
    width: width,
    ...DEFAULT_TABLE_AGGREGATED,
    Aggregated: options?.aggregated ?? DEFAULT_TABLE_AGGREGATED.Aggregated,
    aggregate: options?.aggregate ?? 'count',
    [options?.render ? 'Cell' : 0]: ({ cell }: any) =>
        options?.render && options?.render(cell.row.original, cell.value, cell),
});

export const tableConfig: TableOptions<ScopeChangeRequest> = {
    objectIdentifierKey: 'id',
    enableSelectRows: true,
    customColumns: [
        defineColumn({
            header: 'Id',
            accessor: (s) => s.sequenceNumber,
            width: 60,
        }),
        defineColumn({
            header: 'Title',
            accessor: (s) => s.title,
            width: 250,
        }),
        defineColumn({
            header: 'Comment',
            accessor: (s) => s.hasComments,
            width: 80,
            render: (s) => (
                <>
                    {s.hasComments && (
                        <CenterIcon>
                            <Icon
                                name={'comment_chat'}
                                color={`${tokens.colors.text.static_icons__default.hex}`}
                            />
                        </CenterIcon>
                    )}
                </>
            ),
        }),
        defineColumn({
            header: 'Contr.',
            accessor: (s) => s.hasPendingContributions,
            width: 70,
            render: (s) => (
                <>
                    {s.hasPendingContributions && (
                        <CenterIcon>
                            <Icon
                                color={tokens.colors.text.static_icons__default.hex}
                                name="group"
                            />
                        </CenterIcon>
                    )}
                </>
            ),
        }),
        defineColumn({
            header: 'Phase',
            accessor: (s) => s.phase,
            width: 60,
        }),
        defineColumn({
            header: 'Workflow',
            accessor: (s) => s.workflowSteps?.map((s) => s.name).toString(),
            render: (s) => <>{s.workflowSteps && <WorkflowCompact steps={s.workflowSteps} />}</>,
            width: 110,
        }),
        defineColumn({
            header: 'Current step',
            accessor: (s) => s?.currentWorkflowStep?.name,
            width: 180,
        }),
        defineColumn({
            header: 'Next',
            accessor: (s) =>
                s.currentWorkflowStep?.criterias.find((x) => x.signedAtUtc === null)
                    ?.valueDescription ?? null,
            width: 220,
        }),
        defineColumn({ header: 'Status', accessor: (s) => s.workflowStatus, width: 120 }),
        defineColumn({
            header: 'State',
            accessor: (s) => (s.isVoided ? 'Voided' : s.state),
            width: 80,
        }),
        defineColumn({
            header: 'Guess Mhrs',
            accessor: (s) => s?.disciplineGuesstimates.reduce((s, a) => s + a.guesstimate, 0),
            width: 180,
            render: (_, u, cell) => GuessMhrsRender({ cell }),
        }),
        defineColumn({
            header: 'Est mhrs',
            accessor: (s) => s.estimatedChangeHours,
            width: 180,
            render: (s, u, cell) => EstMhrsRender({ cell }),
        }),
        defineColumn({
            header: 'Exp mhrs',
            accessor: (s) => s.actualChangeHours ?? 0,
            width: 180,
            render: (s, u, cell) => ExpMhrsRender({ cell }),
        }),
        defineColumn({
            header: 'Change cateogry',
            accessor: (s) => s?.changeCategory?.name,
            width: 150,
        }),
        defineColumn({
            header: 'Change origin',
            accessor: (s) => `${s.originSource} - ${s.originSourceId}`,
            render: ({ originSource, originSourceId }) => (
                <OriginLink onlyUnderlineOnHover={true} type={originSource} id={originSourceId} />
            ),
            width: 120,
        }),
        defineColumn({ header: 'Scope', accessor: (s) => s.scope?.name, width: 150 }),
        defineColumn({
            header: 'Last updated',
            accessor: (s) => s.modifiedAtUtc,
            width: 120,
            render: (s) => (
                <>
                    {s.modifiedAtUtc &&
                        DateTime.fromJSDate(new Date(s.modifiedAtUtc)).toRelative({
                            locale: 'en-GB',
                        })}
                </>
            ),
        }),
        defineColumn({
            header: 'Created at',
            accessor: (s) => s.createdAtUtc,
            width: 120,
            render: (s) => (
                <>
                    {s.createdAtUtc &&
                        DateTime.fromJSDate(new Date(s.createdAtUtc)).toRelative({
                            locale: 'en-GB',
                        })}
                </>
            ),
        }),
        defineColumn({
            header: 'Last signed',
            accessor: getLastSigned,
            width: 180,
            render: (s, v) => <>{v && <div>{v.toRelative({ locale: 'en-GB' })}</div>}</>,
        }),
        defineColumn({
            header: 'Disciplines',
            accessor: (s) =>
                s.disciplineGuesstimates
                    .map(({ discipline: { procosysCode } }) => procosysCode)
                    .toString(),
            width: 180,
        }),
    ],
    hiddenColumns: [
        'sequenceNumber',
        'id',
        'description',
        'createdBy',
        'modifiedBy',
        'originSourceId',
        'workflowSteps',
        'workflowStatus',
        'hasComments',
        'hasPendingContributions',
        'createdAtUtc',
        'title',
        'tags',
        'systems',
        'modifiedAtUtc',
        'commissioningPackages',
        'phase',
        'areas',
        'documents',
        'originSource',
        'attachments',
        'isVoided',
        'disciplines',
        'state',
        'materialsIdentifiedInStorage',
        'materialsNote',
        'materialsToBeBoughtByContractor',
        'changeCategory',
        'punchListItems',
        'potentialWarrantyCase',
        'workOrders',
        'estimatedChangeHours',
        'disciplineGuesstimates',
        'actualChangeHours',
        'scope',
        'currentWorkflowStep',
    ],
};

const guesstimateHoursMaxAtom = Atom.of<number>(-1);
const estimateHoursMaxAtom = Atom.of<number>(-1);
const actualHoursMaxAtom = Atom.of<number>(-1);

const CenterIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
`;

interface GuessMhrsRenderProps {
    cell: any;
}
const GuessMhrsRender = ({ cell }: GuessMhrsRenderProps) => {
    if (deref(guesstimateHoursMaxAtom) === -1) {
        const maxCount = Math.max(
            ...cell.column.filteredRows.map((val) =>
                val.original.disciplineGuesstimates.reduce(
                    (count, curr) => curr.guesstimate + count,
                    0
                )
            )
        );
        swap(guesstimateHoursMaxAtom, () => maxCount);
    }

    const count = deref(guesstimateHoursMaxAtom);

    return <EstimateBar current={cell.value} max={count} />;
};

const EstMhrsRender = ({ cell }: GuessMhrsRenderProps) => {
    if (deref(estimateHoursMaxAtom) === -1) {
        const maxCount = Math.max(
            ...cell.column.filteredRows.map((val) => val.original.estimatedChangeHours)
        );
        swap(estimateHoursMaxAtom, () => maxCount);
    }

    const highestEstimateHours = deref(estimateHoursMaxAtom);

    return <EstimateBar current={cell.value} max={highestEstimateHours} />;
};

const ExpMhrsRender = ({ cell }: GuessMhrsRenderProps) => {
    if (deref(actualHoursMaxAtom) === -1) {
        const maxCount = Math.max(
            ...cell.column.filteredRows.map((val) => val.original.actualChangeHours)
        );
        swap(actualHoursMaxAtom, () => maxCount);
    }

    const highestExpendedHours = deref(actualHoursMaxAtom);

    if (cell.isGrouped) {
        return cell.value;
    }

    return (
        <ExpendedProgressBar
            actual={cell.value}
            estimate={cell.row.original.estimatedChangeHours}
            highestExpended={highestExpendedHours}
        />
    );
};
