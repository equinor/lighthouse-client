import { Tabs } from '@equinor/eds-core-react';

import { tokens } from '@equinor/eds-tokens';
import { ClientApi, httpClient } from '@equinor/lighthouse-portal-client';
import { DataSource, IdResolverFunc } from '@equinor/WorkSpace';
import { useEffect } from 'react';
import styled from 'styled-components';
import { createAtom } from '../../Core/Atom/functions/createAtom';
import { useEdsTabs } from '../../hooks/edsTabs/useEdsTabs';
import { SidesheetApi } from '../../packages/Sidesheet/Types/SidesheetApi';
import { BannerItem } from '../DisciplineReleaseControl/Components/Sidesheet/ReleaseControlSidesheetBanner';
import { Banner } from '../ScopeChangeRequest/Components/Sidesheet/SidesheetBanner/SidesheetBanner';
import { CriteriaSignState } from '../ScopeChangeRequest/types/scopeChangeRequest';
import { WorkflowCompact } from '../ScopeChangeRequest/workspaceConfig/sTable/WorkflowCompact';

export interface CreatedBy {
    id: string;
    oid: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface ModifiedBy {
    id: string;
    oid: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface SignedBy {
    id: string;
    oid: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface Criteria {
    id: string;
    type: string;
    value: string;
    valueDescription: string;
    signedAtUtc: string;
    signedBy: SignedBy;
    signedComment: string;
    signedState: CriteriaSignState | null;
}

export interface Person {
    id: string;
    oid: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface CreatedBy2 {
    id: string;
    oid: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface ModifiedBy2 {
    id: string;
    oid: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface Contribution {
    createdAtUtc: Date;
    createdBy: CreatedBy2;
    modifiedAtUtc: Date;
    modifiedBy: ModifiedBy2;
    id: string;
    comment: string;
    suggestion: string;
}

export interface Contributor {
    id: string;
    instructionsToContributor: string;
    person: Person;
    contribution: Contribution;
    createdAtUtc;
    createdBy;
    modifiedAtUtc;
    modifiedBy;
    plant;
}

export interface CurrentWorkflowStep {
    id: string;
    name: string;
    order: number;
    isCurrent: boolean;
    isCompleted: boolean;
    criterias: Criteria[];
    contributors: Contributor[];
}

export interface SignedBy2 {
    id: string;
    oid: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface Person2 {
    id: string;
    oid: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface CreatedBy3 {
    id: string;
    oid: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface ModifiedBy3 {
    id: string;
    oid: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface Contribution2 {
    createdAtUtc: Date;
    createdBy: CreatedBy3;
    modifiedAtUtc: Date;
    modifiedBy: ModifiedBy3;
    id: string;
    comment: string;
    suggestion: string;
}

export interface WorkflowStep {
    id: string;
    name: string;
    order: number;
    isCurrent: boolean;
    isCompleted: boolean;
    criterias: Criteria[];
    contributors: Contributor[];
}

export interface Tag {
    id: string;
    procosysId: number;
    procosysNumber: string;
}

export interface Area {
    id: string;
    procosysId: number;
    procosysCode: string;
}

export interface ReleaseControl {
    createdAtUtc: Date;
    createdBy: CreatedBy;
    modifiedAtUtc: Date;
    modifiedBy: ModifiedBy;
    id: string;
    sequenceNumber: number;
    title: string;
    description: string;
    phase: string;
    plannedDueDate: Date;
    state: string;
    workflowStatus: string;
    isVoided: boolean;
    hasComments: boolean;
    hasPendingContributions: boolean;
    currentWorkflowStep: CurrentWorkflowStep;
    workflowSteps: WorkflowStep[];
    tags: Tag[];
    areas: Area[];
}

const customCellView = (render: (req: ReleaseControl) => JSX.Element | null) => ({
    Cell: ({ cell }: any) => <>{render(cell.value.content)}</>,
});

export function setup({ createWorkSpace }: ClientApi): void {
    createWorkSpace<ReleaseControl>({
        objectIdentifier: 'id',
        CustomSidesheet: ReleaseControlSidesheet,
    })
        .registerDataSource(dataSource)
        .registerTableOptions({
            objectIdentifierKey: 'id',
            enableSelectRows: true,
            hiddenColumns: [
                'id',
                'description',
                'areas',
                'isVoided',
                'hasComments',
                'hasPendingContributions',
                'tags',
            ],
            headers: [
                { key: 'sequenceNumber', title: 'Id' },
                { key: 'title', title: 'Title' },
                { key: 'workflowSteps', title: 'Workflow' },
                { key: 'currentWorkflowStep', title: 'Current step' },
                { key: 'workflowStatus', title: 'Status' },
                { key: 'phase', title: 'Phase' },
                { key: 'state', title: 'State' },
                { key: 'plannedDueDate', title: 'Due date' },
                { key: 'createdAtUtc', title: 'Created at' },
                { key: 'modifiedAtUtc', title: 'Last modified' },
            ],
            customCellView: [
                {
                    key: 'plannedDueDate',
                    type: customCellView((req) => (
                        <>
                            {req.plannedDueDate &&
                                new Date(req.plannedDueDate).toLocaleDateString('en-gb')}
                        </>
                    )),
                },
                {
                    key: 'workflowSteps',
                    type: customCellView((req) => <WorkflowCompact steps={req.workflowSteps} />),
                },
                {
                    key: 'createdAtUtc',
                    type: customCellView((req) => (
                        <>
                            {req.createdAtUtc &&
                                new Date(req.createdAtUtc).toLocaleDateString('en-gb')}
                        </>
                    )),
                },
                {
                    key: 'modifiedAtUtc',
                    type: customCellView((req) => (
                        <>
                            {req.modifiedAtUtc &&
                                new Date(req.modifiedAtUtc).toLocaleDateString('en-gb')}
                        </>
                    )),
                },
            ],
        })
        .registerFilterOptions([
            { name: 'Current step', valueFormatter: (s) => s?.currentWorkflowStep.name },
            {
                name: 'State',
                valueFormatter: ({ isVoided, state }) => (isVoided ? 'Voided' : state),
            },
            { name: 'Phase', valueFormatter: ({ phase }) => phase },
            { name: 'Status', valueFormatter: ({ workflowStatus }) => workflowStatus },
        ])
        .registerIdResolver(idResolver);
    // .registerPowerBIOptions({
    //     pages: [
    //         {
    //             pageId: 'ReportSectionb822b2eb4fc97aef255b',
    //             pageTitle: 'Overview',
    //             default: true,
    //         },
    //         {
    //             pageId: 'ReportSection40a8a70e6f82243888ca',
    //             pageTitle: 'History',
    //         },
    //     ],
    //     reportURI: 'pp-scope-change-analytics',
    // });
}

async function responseAsync(signal?: AbortSignal): Promise<Response> {
    const { scopeChange } = httpClient();
    return await scopeChange.fetch(`api/releasecontrol`, {
        signal,
    });
}

export const dataSource: DataSource<ReleaseControl> = {
    responseAsync,
};

export const idResolver: IdResolverFunc<ReleaseControl> = {
    idResolver: idResolverFunction,
};

async function idResolverFunction(id: string): Promise<ReleaseControl> {
    const { scopeChange } = httpClient();
    const res = await scopeChange.fetch(`api/releasecontrol/${id}`);

    if (!res.ok) {
        throw 'Not found';
    }
    return await res.json();
}

interface ReleaseControlSidesheetProps {
    item: ReleaseControl;
    actions: SidesheetApi;
}

const ReleaseControlSidesheet = ({ actions, item }: ReleaseControlSidesheetProps) => {
    useEffect(() => {
        actions.setTitle(`${item.sequenceNumber} ${item.title}`);
    }, []);

    const { activeTab, handleChange } = useEdsTabs();

    return (
        <div>
            <Banner>
                <BannerItem title="" />
                <BannerItem title={'Phase'} value={item.phase} />
                <BannerItem title={'Status'} value={item.workflowStatus} />
                <BannerItem title={'State'} value={item.isVoided ? 'Voided' : item.state} />
            </Banner>
            <Tabs activeTab={activeTab} onChange={handleChange}>
                <SidesheetTabList>
                    <HeaderTab>
                        <div>Details</div>
                    </HeaderTab>
                </SidesheetTabList>
                <TabList>
                    <Tab>
                        <div>Work in progress</div>
                    </Tab>
                </TabList>
            </Tabs>
        </div>
    );
};

const HeaderTab = styled(Tabs.Tab)``;
export const relaseControlSidesheetContext = createAtom({});
export const SidesheetTabList = styled(Tabs.List)`
    background-color: ${tokens.colors.ui.background__light.hex};
`;
const TabList = styled(Tabs.Panels)`
    margin: 24px 32px;
`;

const Tab = styled(Tabs.Panel)`
    overflow-y: scroll;
    overflow-x: hidden;
    height: 100%;
    padding-bottom: 50px;
`;
