import { Typography } from '@equinor/eds-core-react';
import { SidesheetApi } from '@equinor/sidesheet';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { proCoSysUrls } from '../../../packages/ProCoSysUrls/procosysUrl';

import { Tag } from '../Types/tag';
import { SidesheetBanner, TextItem } from './Banner';
import { SidesheetHeaderContent } from './Header';

interface SidesheetWrapperProps {
    item: Tag;
    actions: SidesheetApi;
}

export function TagDetail({ item, actions }: SidesheetWrapperProps): JSX.Element {
    const ref = useRef<HTMLDivElement>(null);

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
                    title="System"
                    value={
                        item.SystemCode
                            ? `${item.SystemCode || ''}, ${item.SystemDescription || ''}`
                            : ''
                    }
                />

                <TextItem
                    title="Status"
                    value={
                        item.StatusCode
                            ? `${item.StatusCode || ''}, ${item.StatusDescription || ''}`
                            : ''
                    }
                />
            </SidesheetBanner>
            <ContentWrapper
                ref={ref}
                top={
                    (ref.current?.offsetParent?.getBoundingClientRect().top || 0) +
                    (ref.current?.getBoundingClientRect().top || 0)
                }
            >
                <div>
                    <Heading variant="h5">Tag Details</Heading>

                    <TextItem title="Description" value={item.Description} />
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
                                ? `${item.RegisterCode || ''}, ${item.RegisterDescription || ''}`
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
                </div>
            </ContentWrapper>
        </Wrapper>
    );
}

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
