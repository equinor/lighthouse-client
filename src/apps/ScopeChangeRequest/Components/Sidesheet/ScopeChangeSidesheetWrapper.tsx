import { CircularProgress, Tabs } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useEffect, useState } from 'react';
import { useIsFetching, useIsMutating, useQuery } from 'react-query';
import styled from 'styled-components';
import { useInternalSidesheetFunction } from '../../../../packages/Sidesheet/Hooks/useInternalSidesheetFunction';
import { useScopeChangeAccess } from '../../Hooks/useScopeChangeAccess';
import { useScopeChangeMutationWatcher } from '../../Hooks/useScopeChangeMutationWatcher';
import { scopeChangeQueries } from '../../Keys/queries';
import { scopeChangeQueryKeys } from '../../Keys/scopeChangeQueryKeys';
import { ScopeChangeRequest } from '../../Types/scopeChangeRequest';
import { HotUpload } from '../Attachments/HotUpload';
import { Attachments } from '../DetailView/Components/Attachments';
import { LogTab, LogTabTitle } from '../DetailView/Components/History/HistoryList';
import { RelatedObjects } from '../DetailView/Components/RelatedObjects';
import { Workflow } from '../Workflow/Components/Workflow';
import { ScopeChangeContext } from './Context/scopeChangeAccessContext';
import { useScopeChangeContext } from './Context/useScopeChangeAccessContext';
import { ScopeChangeErrorBanner } from './ErrorBanner';
import { ScopeChangeSideSheet } from './ScopeChangeSidesheet';
import { SidesheetBanner } from './SidesheetBanner';
import { useOctopusErrorHandler } from './useOctopusErrorHandler';

export function ScopeChangeSidesheetWrapper(item: ScopeChangeRequest): JSX.Element {
    useScopeChangeMutationWatcher(item.id);

    useOctopusErrorHandler();

    const { setWidth } = useInternalSidesheetFunction();
    useEffect(() => {
        //HACK: Increase width on mount
        setWidth(1000);
    }, []);

    return (
        <>
            <ScopeChangeErrorBanner />
            <ScopeChangeSideSheet {...item} />
        </>
    );
}

function useIsScopeChangeMutatingOrFetching(id: string): boolean {
    const { baseKey } = scopeChangeQueryKeys(id);
    const isFetching = useIsFetching(baseKey, { active: true }) > 0;
    const isMutating = useIsMutating(baseKey) > 0;

    return isFetching || isMutating;
}

function useGetScopeChangeRequest(
    id: string,
    initialData?: ScopeChangeRequest
): ScopeChangeRequest | undefined {
    const { baseQuery } = scopeChangeQueries;
    const { data: request } = useQuery<ScopeChangeRequest>({
        ...baseQuery(id),
        initialData: initialData,
    });

    return request;
}

export function ScopeChangeSidesheetNew(item: ScopeChangeRequest): JSX.Element {
    useScopeChangeMutationWatcher(item.id);
    useOctopusErrorHandler();
    const { activeTab, handleChange } = useEdsTabs();

    const request = useGetScopeChangeRequest(item.id, item);
    const requestAccess = useScopeChangeAccess(item.id);

    const { setWidth } = useInternalSidesheetFunction();
    useEffect(() => {
        //HACK: Increase width on mount
        setWidth(1000);
    }, []);

    return (
        <>
            <ScopeChangeErrorBanner />
            <ScopeChangeContext.Provider
                value={{
                    request: request ?? item,
                    requestAccess: requestAccess,
                }}
            >
                <SidesheetBanner />
                <Tabs activeTab={activeTab} onChange={handleChange}>
                    <SidesheetTabList>
                        <Tabs.Tab>
                            <RequestTabTitle />
                        </Tabs.Tab>
                        <Tabs.Tab disabled>
                            <WorkOrderTabTitle />
                        </Tabs.Tab>
                        <Tabs.Tab>
                            <LogTabTitle />
                        </Tabs.Tab>
                    </SidesheetTabList>
                    <Tabs.Panels>
                        <Tabs.Panel>
                            <RequestTab />
                        </Tabs.Panel>
                        <Tabs.Panel>{activeTab === 1 && <WorkOrderTab />}</Tabs.Panel>
                        <Tabs.Panel>{activeTab === 2 && <LogTab />}</Tabs.Panel>
                    </Tabs.Panels>
                </Tabs>
            </ScopeChangeContext.Provider>
        </>
    );
}

const SidesheetTabList = styled(Tabs.List)`
    background-color: ${tokens.colors.ui.background__light.hex};
`;

interface EdsTabHandler {
    activeTab: number;
    handleChange: (value: number) => void;
}

function useEdsTabs(initialTabIndex?: number): EdsTabHandler {
    const [activeTab, setActiveTab] = useState(initialTabIndex ?? 0);
    const handleChange = (value: number) => setActiveTab(value);

    return {
        activeTab: activeTab,
        handleChange: handleChange,
    };
}

const TabTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5em;
`;

function RequestTabTitle() {
    const { request } = useScopeChangeContext();
    const isLoading = useIsScopeChangeMutatingOrFetching(request.id);

    return (
        <TabTitle>
            Request
            {isLoading && <CircularProgress size={16} />}
        </TabTitle>
    );
}

function WorkOrderTabTitle() {
    return (
        <TabTitle>
            Work orders
            {false && <CircularProgress size={16} />}
        </TabTitle>
    );
}

function WorkOrderTab() {
    return <></>;
}

function RequestTab() {
    const { request, requestAccess } = useScopeChangeContext();

    return (
        <Wrapper>
            <FormWrapper>
                <FlexColumn>
                    <InnerSection>
                        <SectionHeading>Description</SectionHeading>

                        <Description>{request.description}</Description>
                    </InnerSection>
                </FlexColumn>
                <FlexColumn>
                    <InnerSection>
                        <SectionHeading>Workflow</SectionHeading>

                        <Workflow />
                    </InnerSection>
                </FlexColumn>

                <FlexColumn>
                    <InnerSection>
                        <SectionHeading>References</SectionHeading>

                        <RelatedObjects
                            systems={request.systems}
                            commPkgs={request.commissioningPackages}
                            documents={request.documents}
                            areas={request.areas}
                            disciplines={request.disciplines}
                            tags={request.tags}
                        />
                    </InnerSection>
                    <InnerSection>
                        <SectionHeading>Attachments</SectionHeading>

                        {requestAccess.canPatch && <HotUpload />}
                        <Attachments attachments={request.attachments} requestId={request.id} />
                    </InnerSection>
                </FlexColumn>
            </FormWrapper>
        </Wrapper>
    );
}

export const InnerSection = styled.span`
    display: flex;
    flex-direction: column;
    gap: 1em;
`;

export const FlexColumn = styled.div`
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 44px;
`;

export const FormWrapper = styled.form`
    display: grid;
    grid-column: 2;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    gap: 2em;
`;

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 44px;
    padding: 32px 24px;
`;

const Description = styled.div`
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
`;

const SectionHeading = styled.div`
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    text-align: left;
`;
