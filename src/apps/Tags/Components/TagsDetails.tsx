import { Typography } from '@equinor/eds-core-react';
import { SidesheetApi } from '@equinor/sidesheet';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Tag } from '../Types/tag';
import { BannerItem, SidesheetBanner } from './Banner';

interface SidesheetWrapperProps {
    item: Tag;
    actions: SidesheetApi;
}

export function TagDetail({ item, actions }: SidesheetWrapperProps): JSX.Element {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        actions.setTitle(`${item.tagNo}, ${item.tagCategoryDescription}`);
    }, []);

    return (
        <Wrapper>
            <SidesheetBanner>
                <BannerItem title="System" value={item.system} />
                <BannerItem title="Type" value={item.tagType} />
                <BannerItem title="Area" value={item.locationCode} />
                <BannerItem title="Discipline" value={item.disciplineCode} />
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
                    <BannerItem title="Description" value={item.description} />
                </div>
                <div>
                    <Heading variant="h5">Tag Data</Heading>
                    <BannerItem title="Valve size" value={item.valveSize || ''} />
                </div>
                {/* {Object.keys(item).map((key) => {
                    return typeof item[key] !== 'object' ? (
                        <BannerItem key={key} title={key} value={item[key]} />
                    ) : null;
                })} */}
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
