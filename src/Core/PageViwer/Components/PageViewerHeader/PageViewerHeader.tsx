import { Tabs } from '@equinor/eds-core-react';
import { ViewState } from '../../Types/State';
import {
    HeaderWrapper,
    LeftSection,
    RightSection,
    TabTitle,
    Title
} from './PageViewerHeaderStyles';

const { Tab, List } = Tabs;

interface PageViewerHeaderProps {
    title: string;
    viewState: ViewState;
}

export const PageViewerHeader = ({ title, viewState }: PageViewerHeaderProps): JSX.Element => {
    return (
        <HeaderWrapper>
            <LeftSection>
                <Title variant="h3">{title}</Title>
            </LeftSection>
            <RightSection>
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
            </RightSection>
        </HeaderWrapper>
    );
};
