import { OriginLink } from '../../Components/DetailView/OriginLink';
import { WorkflowCompact } from './WorkflowCompact';
import { getLastSigned } from './getLastSigned';
import { ScopeChangeRequest } from '../../types/scopeChangeRequest';
import { DateTime } from 'luxon';
import { CellProps, CustomColumn } from '@equinor/Table';
import { excelExport } from './excelExport';

import { TableOptions } from '@equinor/WorkSpace';
import {
    Comments,
    GuessMhrsRender,
    MakeDateCell,
    PendingContributions,
    StateCell,
    WOEstMhrsRender,
    WOExpMhrsRender,
    WORemMhrsRender,
} from './Cells';

const DEFAULT_TABLE_AGGREGATED = { Aggregated: () => null, aggregate: 'count' };

interface CustomCellOptions {
    header: string;
    accessor: AccessorFunction<ScopeChangeRequest>;
    width: number;
    id?: string;
    aggregated?: (s: React.PropsWithChildren<CellProps<ScopeChangeRequest, any>>) => null;
    aggregate?: 'sum' | 'count';
    render?: (item: ScopeChangeRequest, value: any, cell: any) => JSX.Element | null;
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
    preventAutoGenerateColumns: true,
    enableSelectRows: true,
    excelExport: excelExport,
    customColumns: [
        defineColumn({
            header: 'Id',
            accessor: (s) => s.serialNumber,
            width: 90,
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
            render: ({ hasComments }) => <Comments hasComments={hasComments} />,
        }),
        defineColumn({
            header: 'Contr.',
            accessor: (s) => s.hasPendingContributions,
            width: 70,
            render: ({ hasPendingContributions }) => (
                <PendingContributions hasPending={hasPendingContributions} />
            ),
        }),
        /**Hidden for now only one phase */
        // defineColumn({
        //     header: 'Phase',
        //     accessor: (s) => s.phase,
        //     width: 60,
        // }),
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
            accessor: findNextToSign,
            width: 220,
        }),
        defineColumn({ header: 'Status', accessor: (s) => s.workflowStatus, width: 120 }),
        defineColumn({
            header: 'State',
            accessor: (s) => (s.isVoided ? 'Voided' : s.state),
            width: 80,
            render: (scr, val, _cell) => <StateCell item={scr} value={val} />,
        }),
        defineColumn({
            header: 'Disciplines',
            accessor: (s) =>
                s.disciplineGuesstimates
                    .map(({ discipline: { procosysCode } }) => procosysCode)
                    .toString(),
            width: 90,
        }),
        defineColumn({
            header: 'Guess Mhrs',
            accessor: (s) => s?.disciplineGuesstimates.reduce((s, a) => s + a.guesstimate, 0),
            width: 120,
            render: (_, u, cell) => <GuessMhrsRender cell={cell} />,
        }),
        defineColumn({
            header: 'Est Mhrs',
            accessor: (scr) => scr.workOrdersTotalEstimatedManHours,
            width: 120,
            render: (_scr, _val, cell) => <WOEstMhrsRender cell={cell} />,
        }),
        defineColumn({
            header: 'Exp Mhrs',
            accessor: (scr) => scr.workOrdersTotalExpendedManHours,
            width: 120,
            render: (_scr, _val, cell) => <WOExpMhrsRender cell={cell} />,
        }),
        defineColumn({
            header: 'Rem Mhrs',
            accessor: (scr) => scr.workOrdersTotalRemainingManHours,
            width: 120,
            render: (_scr, _val, cell) => <WORemMhrsRender cell={cell} />,
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
            render: (s) => <MakeDateCell date={s.modifiedAtUtc} />,
        }),
        defineColumn({
            header: 'Created at',
            accessor: (s) => s.createdAtUtc,
            width: 120,
            render: (s) => <MakeDateCell date={s.createdAtUtc} />,
        }),
        defineColumn({
            header: 'Last signed',
            accessor: getLastSigned,
            width: 180,
            render: (s, v) => <>{v && <div>{v.toRelative({ locale: 'en-GB' })}</div>}</>,
        }),
    ],
};

function findNextToSign(sc: ScopeChangeRequest) {
    return (
        sc.currentWorkflowStep?.criterias.find((x) => x.signedAtUtc === null)?.valueDescription ??
        null
    );
}
