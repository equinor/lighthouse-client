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
import {
    TableData,
    CellRenderProps,
    CellProps,
    EstimateBar,
    ExpendedProgressBar,
} from '@equinor/Table';

const customCellView = (render: (req: ScopeChangeRequest) => JSX.Element | null) => ({
    Cell: (
        cell: React.PropsWithChildren<CellProps<TableData, CellRenderProps<ScopeChangeRequest>>>
    ) => <>{render(cell.value.content)}</>,
});

export const tableConfig: TableOptions<ScopeChangeRequest> = {
    objectIdentifierKey: 'id',
    enableSelectRows: true,
    customColumns: [
        {
            Header: 'Current step',
            accessor: (s) => s?.currentWorkflowStep?.name,
            id: 'CurrentStep',
            width: 180,
            Aggregated: () => null,
            aggregate: 'count',
        },
        {
            Header: 'Last signed',
            accessor: getLastSigned,
            Cell: ({ cell }: any): JSX.Element | null => {
                if (!cell.value) return null;
                return <div>{cell.value.toRelative({ locale: 'en-GB' })}</div>;
            },
            id: 'LastSigned',
            width: 180,
            Aggregated: () => null,
            aggregate: 'count',
        },
        {
            Header: 'Guess Mhrs',
            id: 'guessMhr',
            accessor: (s) => s?.disciplineGuesstimates.reduce((s, a) => s + a.guesstimate, 0),
            Cell: ({ cell }: any): JSX.Element => {
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
            },
            width: 120,
            Aggregated: () => null,
            aggregate: 'count',
        },
        {
            Header: 'Est mhrs',
            id: 'est mhrs',
            accessor: (s) => s.estimatedChangeHours,
            Cell: ({ cell }: any) => {
                if (deref(estimateHoursMaxAtom) === -1) {
                    const maxCount = Math.max(
                        ...cell.column.filteredRows.map((val) => val.original.estimatedChangeHours)
                    );
                    swap(estimateHoursMaxAtom, () => maxCount);
                }

                const highestEstimateHours = deref(estimateHoursMaxAtom);

                return <EstimateBar current={cell.value} max={highestEstimateHours} />;
            },
            width: 120,
            Aggregated: () => null,
            aggregate: 'count',
        },
        {
            Header: 'Exp mhrs',
            id: 'exp mhrs',
            accessor: (s) => s?.actualChangeHours ?? 0,
            Cell: ({ cell }: any) => {
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
            },
            width: 120,
            Aggregated: () => null,
            aggregate: 'count',
        },
        {
            Header: 'Disciplines',
            accessor: (s) =>
                s.disciplineGuesstimates
                    .map(({ discipline: { procosysCode } }) => procosysCode)
                    .toString(),
            id: 'Disciplines',
            width: 180,
            Aggregated: () => null,
            aggregate: 'count',
        },
        {
            Header: 'Change category',
            id: 'change Category',
            width: 150,
            Aggregated: () => null,
            aggregate: 'count',
            accessor: (s) => s?.changeCategory.name,
        },
        {
            Header: 'Scope',
            id: 'scopeC',
            width: 150,
            Aggregated: () => null,
            aggregate: 'count',
            accessor: (s) => s?.scope?.name,
        },
        {
            Header: 'State',
            id: 'stateC',
            width: 80,
            Aggregated: () => null,
            aggregate: 'count',
            accessor: (s) => (s.isVoided ? 'Voided' : s.state),
        },
        {
            Header: 'Next',
            id: 'nextC',
            width: 220,
            Aggregated: () => null,
            aggregate: 'count',
            accessor: (s) =>
                s.currentWorkflowStep?.criterias.find((x) => x.signedAtUtc === null)
                    ?.valueDescription ?? null,
        },
    ],
    hiddenColumns: [
        'id',
        'description',
        'createdBy',
        'modifiedBy',
        'originSourceId',
        'tags',
        'systems',
        'commissioningPackages',
        'areas',
        'documents',
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
    columnOrder: [
        'sequenceNumber',
        'title',
        'hasComments',
        'hasPendingContributions',
        'phase',
        'workflowSteps',
        'CurrentStep',
        'nextC',
        'workflowStatus',
        'stateC',
        'guessMhr',
        'est mhrs',
        'exp mhrs',
        'change Category',
        'originSource',
        'scopeC',
        'modifiedAtUtc',
        'systems',
        'areas',
        'commissioningPackages',
        'tags',
        'disciplines',
        'documents',
        'attachments',
        'created By',
    ],
    headers: [
        { key: 'sequenceNumber', title: 'Id', width: 60 },
        { key: 'title', title: 'Title', width: 250 },
        { key: 'phase', title: 'Phase', width: 60 },
        { key: 'id', title: 'GUID' },
        { key: 'workflowSteps', title: 'Workflow', width: 110 },
        { key: 'disciplineGuesstimates', title: 'Guess mhrs', width: 120 },
        { key: 'estimatedChangeHours', title: 'Est mhrs', width: 120 },
        { key: 'actualChangeHours', title: 'Exp mhrs', width: 120 },
        { key: 'originSource', title: 'Change origin', width: 120 },
        { key: 'createdAtUtc', title: 'Created at', width: 120 },
        { key: 'workflowStatus', title: 'Status', width: 120 },
        { key: 'createdBy', title: 'Created by' },
        { key: 'modifiedAtUtc', title: 'Last updated', width: 120 },
        { key: 'modifiedBy', title: 'Modified by' },
        { key: 'description', title: 'Description' },

        { key: 'currentWorkflowStep', title: 'Next', width: 220 },
        {
            key: 'hasComments',
            title: 'Comment',
            width: 80,
        },
        {
            key: 'hasPendingContributions',
            width: 70,
            title: 'Contr.',
        },
    ],

    customCellView: [
        {
            key: 'createdBy',
            type: customCellView(
                (req) =>
                    req.createdBy && (
                        <>{`${req?.createdBy?.firstName} ${req?.createdBy?.lastName}`}</>
                    )
            ),
        },

        {
            key: 'createdAtUtc',
            type: customCellView((req) => (
                <>
                    {req.createdAtUtc &&
                        DateTime.fromJSDate(new Date(req.createdAtUtc)).toRelative({
                            locale: 'en-GB',
                        })}
                </>
            )),
        },

        {
            key: 'modifiedAtUtc',
            type: customCellView((req) => (
                <>
                    {req.modifiedAtUtc &&
                        DateTime.fromJSDate(new Date(req.modifiedAtUtc)).toRelative({
                            locale: 'en-GB',
                        })}
                </>
            )),
        },

        {
            key: 'state',
            type: customCellView(({ state, isVoided }) => <>{isVoided ? 'Voided' : state}</>),
        },
        {
            key: 'hasPendingContributions',
            type: customCellView(({ hasPendingContributions }) => (
                <>
                    {hasPendingContributions && (
                        <CenterIcon>
                            <Icon
                                color={tokens.colors.text.static_icons__default.hex}
                                name="group"
                            />
                        </CenterIcon>
                    )}
                </>
            )),
        },
        {
            key: 'materialsToBeBoughtByContractor',
            type: customCellView((req) => (
                <>{req.materialsToBeBoughtByContractor ? 'Yes' : 'No'}</>
            )),
        },
        {
            key: 'materialsIdentifiedInStorage',
            type: customCellView((req) => <>{req.materialsIdentifiedInStorage ? 'Yes' : 'No'}</>),
        },
        {
            key: 'potentialWarrantyCase',
            type: customCellView((req) => <>{req.potentialWarrantyCase ? 'Yes' : 'No'}</>),
        },
        {
            key: 'isVoided',
            type: customCellView((req) => <>{req.isVoided ? 'Yes' : 'No'}</>),
        },
        {
            key: 'workflowSteps',
            type: customCellView(
                (req) => req.workflowSteps && <WorkflowCompact steps={req.workflowSteps} />
            ),
        },
        {
            key: 'hasComments',
            type: customCellView((req) =>
                req.hasComments ? (
                    <CenterIcon>
                        <Icon
                            name={'comment_chat'}
                            color={`${tokens.colors.text.static_icons__default.hex}`}
                        />
                    </CenterIcon>
                ) : null
            ),
        },
        {
            key: 'originSource',
            type: customCellView(({ originSource, originSourceId }) => (
                <OriginLink onlyUnderlineOnHover={true} type={originSource} id={originSourceId} />
            )),
        },
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
