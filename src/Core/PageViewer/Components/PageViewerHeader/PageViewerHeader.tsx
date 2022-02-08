import { Tabs } from '@equinor/eds-core-react';
import { useState } from 'react';
import styled from 'styled-components';
import Icon from '../../../../components/Icon/Icon';
import { ViewState } from '../../Types/State';
import { HeaderButton } from '../HeaderButton/HeaderButton';
import {
    Divider,
    HeaderWrapper,
    LeftSection,
    Line,
    RightSection,
    TabTitle,
    Title,
} from './PageViewerHeaderStyles';

const { Tab, List } = Tabs;

type HandleFilter = () => void;
interface PageViewerHeaderProps {
    title: string;
    viewState: ViewState;
    activePage: number;
    handleFilter: HandleFilter;
    activeFilter: boolean;
}

const Filter = styled.div``;

export const PageViewerHeader = ({
    title,
    viewState,
    handleFilter,
    activeFilter,
    activePage,
}: PageViewerHeaderProps): JSX.Element => {
    const [showFilter] = useState(true);

    return (
        <HeaderWrapper>
            <LeftSection>
                <Title variant="h3">{title}</Title>
                <List>
                    {Object.values(viewState.pages).map((page) => {
                        const Icon = page.icon;
                        return (
                            <Tab key={`pages-${page.title}`}>
                                {Icon && <Icon />}
                                <TabTitle>{page.title}</TabTitle>
                            </Tab>
                        );
                    })}
                </List>
            </LeftSection>
            <RightSection>
                <Line />
                {showFilter && (
                    <>
                        <Divider />
                        <HeaderButton onClick={handleFilter} aria-selected={activeFilter}>
                            <Icon name={'filter_alt'} />
                        </HeaderButton>
                    </>
                )}
            </RightSection>
        </HeaderWrapper>
    );
};
