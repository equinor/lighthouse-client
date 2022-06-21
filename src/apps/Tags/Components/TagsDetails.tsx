import { Typography } from '@equinor/eds-core-react';
import { useFacility } from '@equinor/lighthouse-portal-client';
import { SidesheetApi } from '@equinor/sidesheet';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { Tag } from '../Types/tag';
import { BannerItem, SidesheetBanner } from './Banner';
import { SidesheetHeaderContent } from './Header';

interface SidesheetWrapperProps {
    item: Tag;
    actions: SidesheetApi;
}

export function TagDetail({ item, actions }: SidesheetWrapperProps): JSX.Element {
    const ref = useRef<HTMLDivElement>(null);

    const { procosysPlantId } = useFacility();

    useEffect(() => {
        actions.setTitle(
            <SidesheetHeaderContent
                title={
                    item.TagFunctionDescription
                        ? `${item.TagNo}, ${item.TagFunctionDescription}`
                        : item.TagNo
                }
                url={item.Id + procosysPlantId}
            />
        );
    }, []);

    return (
        <Wrapper>
            <SidesheetBanner>
                {item.SystemCode && <BannerItem title="System" value={item.SystemCode} />}
                {item.AreaDescription && <BannerItem title="Area" value={item.AreaDescription} />}
                {item.DisciplineCode && (
                    <BannerItem title="Discipline" value={item.DisciplineCode} />
                )}

                {item.TagFunctionCode && <BannerItem title="Code" value={item.TagFunctionCode} />}
                {item.StatusCode && <BannerItem title="Status" value={item.StatusCode} />}
            </SidesheetBanner>
            <ContentWrapper
                ref={ref}
                top={
                    (ref.current?.offsetParent?.getBoundingClientRect().top || 0) +
                    (ref.current?.getBoundingClientRect().top || 0)
                }
            >
                <div>
                    <Heading variant="h5">Tag Data</Heading>
                    {item.description && (
                        <BannerItem title="Description" value={item.description} />
                    )}
                    {item['StatusDescription'] && (
                        <BannerItem title="Status Description" value={item['StatusDescription']} />
                    )}
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
