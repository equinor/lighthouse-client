import { Tabs, Typography } from '@equinor/eds-core-react-old';
import { proCoSysUrls } from '@equinor/procosys-urls';
import { SidesheetApi } from '@equinor/sidesheet';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ModelViewerContextProvider } from '../../../packages/ModelViewer/context/modelViewerContext';

import { Tag } from '../Types/tag';
import { ThreeDView } from './3D/3dView';
import { SidesheetBanner } from './Banner';
import { SidesheetHeaderContent } from './Header';
import {
    OverviewPanel,
    PanelContentWrapper,
    SidesheetPanels,
    SidesheetTabList,
    SidesheetTabs,
    TabsWrapper,
} from './sidesheet-styles';
import { TextItem } from './TextItem';

interface SidesheetWrapperProps {
    item: Tag;
    actions: SidesheetApi;
}

export function TagDetail({ item, actions }: SidesheetWrapperProps): JSX.Element {
    const ref = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState<number>(0);
    const handleChange = (index: number) => {
        setActiveTab(index);
    };

    useEffect(() => {
        actions.setTitle(
            <SidesheetHeaderContent
                title={
                    item.TagFunctionDescription
                        ? `${item.TagNo}, ${item.TagFunctionDescription}`
                        : item.TagNo
                }
                url={proCoSysUrls.getTagUrl(item.Id)}
            />
        );
    }, []);

    return (
        <Wrapper>
            <SidesheetBanner>
                <TextItem
                    title="MC Pkg"
                    value={item.McPkgNo}
                    onClick={
                        item.McPkgNo
                            ? () => {
                                  window.location.hash = `mcDetails/${item.McPkgNo}`;
                              }
                            : undefined
                    }
                />
                <TextItem
                    title="Comm Pkg"
                    value={item.CommPkgNo}
                    onClick={
                        item.CommPkgNo
                            ? () => {
                                  window.location.hash = `handoverDetails/${item.CommPkgNo}`;
                              }
                            : undefined
                    }
                />
            </SidesheetBanner>
            <PanelContentWrapper>
                <TabsWrapper>
                    <SidesheetTabs activeTab={activeTab} onChange={handleChange}>
                        <SidesheetTabList>
                            <Tabs.Tab>Overview</Tabs.Tab>
                            <Tabs.Tab>3D</Tabs.Tab>
                        </SidesheetTabList>
                        <SidesheetPanels>
                            <OverviewPanel>
                                <ContentWrapper
                                    ref={ref}
                                    top={
                                        (ref.current?.offsetParent?.getBoundingClientRect().top ||
                                            0) + (ref.current?.getBoundingClientRect().top || 0)
                                    }
                                >
                                    <div>
                                        <Heading variant="h5">Tag Details</Heading>

                                        <TextItem title="Description" value={item.Description} />
                                        <TextItem
                                            title="System"
                                            value={
                                                item.SystemCode
                                                    ? `${item.SystemCode || ''}, ${
                                                          item.SystemDescription || ''
                                                      }`
                                                    : ''
                                            }
                                        />

                                        <TextItem
                                            title="Status"
                                            value={
                                                item.StatusCode
                                                    ? `${item.StatusCode || ''}, ${
                                                          item.StatusDescription || ''
                                                      }`
                                                    : ''
                                            }
                                        />
                                        <TextItem
                                            title="Tag Function"
                                            value={
                                                item.TagFunctionCode
                                                    ? `${item.TagFunctionCode || ''}, ${
                                                          item.TagFunctionDescription || ''
                                                      }`
                                                    : ''
                                            }
                                        />
                                        <TextItem
                                            title="Register"
                                            value={
                                                item.RegisterCode
                                                    ? `${item.RegisterCode || ''}, ${
                                                          item.RegisterDescription || ''
                                                      }`
                                                    : ''
                                            }
                                        />

                                        <TextItem
                                            title="Discipline"
                                            value={
                                                item.DisciplineCode
                                                    ? `${item.DisciplineCode || ''}, ${
                                                          item.DisciplineDescription || ''
                                                      }`
                                                    : ''
                                            }
                                        />
                                        <TextItem
                                            title="
                        Project"
                                            value={
                                                item.ProjectDescription
                                                    ? `${window.location.search.split('=')[1]}, ${
                                                          item.ProjectDescription || ''
                                                      }`
                                                    : ''
                                            }
                                        />
                                    </div>
                                </ContentWrapper>
                            </OverviewPanel>

                            <Panel>
                                {activeTab === 1 && (
                                    <ModelViewerContextProvider>
                                        <ThreeDView data={item} />
                                    </ModelViewerContextProvider>
                                )}
                            </Panel>
                        </SidesheetPanels>
                    </SidesheetTabs>
                </TabsWrapper>
            </PanelContentWrapper>
        </Wrapper>
    );
}

export const Panel = styled(Tabs.Panel)`
    padding: 0;
`;

const Heading = styled(Typography)`
    margin-bottom: 1rem;
`;
const Wrapper = styled.div`
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

const ContentWrapper = styled.div<{ top: number }>`
    padding: 2rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    height: ${({ top }) => `calc(100vh - ${top}px + 2rem)`};
`;
