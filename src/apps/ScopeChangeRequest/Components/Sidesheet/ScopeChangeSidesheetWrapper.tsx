import { Tabs } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useInternalSidesheetFunction } from '../../../../packages/Sidesheet/Hooks/useInternalSidesheetFunction';
import { useScopeChangeMutationWatcher } from '../../Hooks/useScopeChangeMutationWatcher';
import { ScopeChangeRequest } from '../../Types/scopeChangeRequest';
import { HotUpload } from '../Attachments/HotUpload';
import { HistoryList } from '../DetailView/Components/History/HistoryList';
import { RelatedObjects } from '../DetailView/Components/RelatedObjects';
import { Workflow } from '../Workflow/Components/Workflow';
import { ScopeChangeContext } from './Context/scopeChangeAccessContext';
import { useScopeChangeContext } from './Context/useScopeChangeAccessContext';
import { ScopeChangeErrorBanner } from './ErrorBanner';
import { ScopeChangeSideSheet } from './ScopeChangeSidesheet';
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

export function ScopeChangeSidesheetNew(item: ScopeChangeRequest): JSX.Element {
    const [activeTab, setActiveTab] = useState(0);
    const handleChange = (value: number) => setActiveTab(value);

    const { setWidth } = useInternalSidesheetFunction();
    useEffect(() => {
        //HACK: Increase width on mount
        setWidth(1000);
    }, []);

    return (
        <>
            <ScopeChangeContext.Provider
                value={{
                    request: item,
                    requestAccess: {
                        canDelete: true,
                        canGet: true,
                        canPatch: true,
                        canPost: true,
                        canPut: true,
                    },
                }}
            >
                <SidesheetBanner />
                <Tabs activeTab={activeTab} onChange={handleChange}>
                    <Tabs.List
                        style={{ backgroundColor: `${tokens.colors.ui.background__light.hex}` }}
                    >
                        <Tabs.Tab>Request </Tabs.Tab>
                        <Tabs.Tab>Work orders</Tabs.Tab>
                        <Tabs.Tab>Log</Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panels>
                        <Tabs.Panel>
                            <RequestTab />
                        </Tabs.Panel>
                        <Tabs.Panel>
                            <div>Im a work order table</div>
                        </Tabs.Panel>
                        <Tabs.Panel>
                            <HistoryList />
                        </Tabs.Panel>
                    </Tabs.Panels>
                </Tabs>
            </ScopeChangeContext.Provider>
        </>
    );
}

function RequestTab() {
    const { request } = useScopeChangeContext();

    return (
        <Wrapper>
            <FormWrapper>
                <FlexColumn>
                    <span>
                        <SectionHeading>Description</SectionHeading>

                        <Description>{request.description}</Description>
                    </span>
                </FlexColumn>
                <FlexColumn>
                    <span>
                        <SectionHeading>Workflow</SectionHeading>

                        <Workflow />
                    </span>
                </FlexColumn>

                <FlexColumn>
                    <span>
                        <SectionHeading>References</SectionHeading>

                        <RelatedObjects
                            systems={request.systems}
                            commPkgs={request.commissioningPackages}
                            documents={request.documents}
                            areas={request.areas}
                            disciplines={request.disciplines}
                            tags={request.tags}
                        />
                    </span>
                    <span>
                        <SectionHeading>Attachments</SectionHeading>
                        <HotUpload />
                        {request.attachments.map(({ fileName, fileSize }) => (
                            <div key={fileName}>{fileName}</div>
                        ))}
                    </span>
                </FlexColumn>
            </FormWrapper>
        </Wrapper>
    );
}

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
    padding: 32px;
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

export function SidesheetBanner(): JSX.Element {
    const { request } = useScopeChangeContext();

    return (
        <Banner>
            <BannerItem title={'Phase'} value={request.phase} />
            <BannerItem title={'Change category'} value={request.changeCategory.name} />
            <BannerItem
                title={'Guesstimate'}
                value={request.guesstimateHours ? `${request.guesstimateHours} mhr` : ''}
            />
        </Banner>
    );
}

const Banner = styled.div`
    height: 76px;
    width: 100%;
    background-color: ${tokens.colors.ui.background__light.hex};
    display: flex;
    flex-direction: row;
    gap: 13em;
    padding: 0em 5em;
    align-items: center;
`;

interface BannerItemProps {
    title: string;
    value: string | number;
}

export function BannerItem({ title, value }: BannerItemProps): JSX.Element {
    return (
        <div>
            <BannerItemTitle>{title}</BannerItemTitle>
            <BannerItemValue>{value}</BannerItemValue>
        </div>
    );
}

const BannerItemTitle = styled.div`
    font-size: 12px;
    line-height: 16px;
    font-weight: 500;
    color: ${tokens.colors.text.static_icons__tertiary.hex};
`;

const BannerItemValue = styled.div`
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    color: ${tokens.colors.text.static_icons__default.hex};
    min-height: 24px;
`;
