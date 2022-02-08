import { tokens } from '@equinor/eds-tokens';
import { Page, Report } from 'powerbi-client';
import { useCallback } from 'react';
import styled from 'styled-components';
import { useActivePage, useGetPages } from '../Hooks';
import { Tabs } from '@equinor/eds-core-react';

const { Tab } = Tabs;

const TabText = styled.div`
    font-size: 0.8rem;
    padding-right: 0.5rem;
`;
const Line = styled.div`
    width: -webkit-fill-available;
    border-bottom: 2px solid ${tokens.colors.ui.background__medium.rgba};
`;
const Wrap = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: flex-end;
    padding: 1em 0 1em 0;
`;
const HeaderTab = styled(Tab)`
    height: 25px;
    overflow-x: visible;
`;

type PageNavigationProps = {
    report: Report | undefined;
};
export const PageNavigation = ({ report }: PageNavigationProps) => {
    const { pages } = useGetPages(report);
    const [activePage, setActivePage] = useActivePage(report);
    const handleClick = useCallback(
        (page: Page) => {
            if (report) {
                setActivePage(page);
            }
        },
        [report, setActivePage]
    );
    return (
        <>
            {pages && (
                <Wrap>
                    {pages.map((page) => {
                        return (
                            <HeaderTab
                                key={page.name}
                                onClick={() => handleClick(page)}
                                active={page.name === activePage?.name ? true : false}
                            >
                                <TabText>{page.displayName}</TabText>
                            </HeaderTab>
                        );
                    })}
                    <Line />
                </Wrap>
            )}
        </>
    );
};
