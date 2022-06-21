import { Typography } from '@equinor/eds-core-react';
import { SidesheetApi } from '@equinor/sidesheet';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { proCoSysUrls } from '../../../packages/ProCoSysUrls/procosysUrl';

import { Tag } from '../Types/tag';
import { BannerItem, SidesheetBanner } from './Banner';
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
                <BannerItem
                    title="System"
                    value={
                        item.SystemCode
                            ? `${item.SystemCode || ''}, ${item.SystemDescription || ''}`
                            : ''
                    }
                />

                <BannerItem
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

                    <BannerItem title="Description" value={item.Description} />
                    <BannerItem
                        title="Tag Function"
                        value={
                            item.TagFunctionCode
                                ? `${item.TagFunctionCode || ''}, ${
                                      item.TagFunctionDescription || ''
                                  }`
                                : ''
                        }
                    />
                    <BannerItem
                        title="Register"
                        value={
                            item.RegisterCode
                                ? `${item.RegisterCode || ''}, ${item.RegisterDescription || ''}`
                                : ''
                        }
                    />

                    <BannerItem
                        title="Discipline"
                        value={
                            item.RegisterCode
                                ? `${item.DisciplineCode || ''}, ${
                                      item.DisciplineDescription || ''
                                  }`
                                : ''
                        }
                    />
                    <BannerItem
                        title="PurchaseOrderNo"
                        value={
                            item.PurchaseOrderNo
                                ? `${item.PurchaseOrderNo || ''}, ${item.PurchaseOrderTitle || ''}`
                                : ''
                        }
                    />
                    <BannerItem
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
