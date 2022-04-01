import Icon from '../../../../../components/Icon/Icon';
import { usePowerBiViewer } from '../../Api/powerBiViewerState';
import { Page } from '../../Types/State';
import { HeaderButton } from '../HeaderButton/HeaderButton';
import {
    Divider,
    HeaderTab,
    HeaderWrapper,
    LeftSection,
    Line,
    RightSection,
    TabTitle,
    Title,
    Wrap
} from './PowerBiViewerHeaderStyles';

type HandleFilter = () => void;

interface PowerBiViewerHeaderProps {
    title: string;
    shortName: string;
    activePage?: Page;
    handleFilter: HandleFilter;
    handleSetActivePage(page: Page): void;
    activeFilter: boolean;
}

export const PowerBiViewerHeader = ({
    title,
    shortName,
    handleFilter,
    activeFilter,
    activePage,
    handleSetActivePage,
}: PowerBiViewerHeaderProps): JSX.Element => {
    const { reports } = usePowerBiViewer(shortName);

    return (
        <HeaderWrapper>
            <LeftSection>
                <Title variant="h3">{title}</Title>
                <Wrap>
                    {Object.values(reports).map((report) => {
                        return report.pages.map((page) => {
                            return (
                                <HeaderTab
                                    active={
                                        activePage &&
                                        page.pageId === activePage.pageId &&
                                        page.pageTitle === page.pageTitle
                                    }
                                    key={`pages-${report.reportURI}-${page.pageId}`}
                                    onClick={() => handleSetActivePage(page)}
                                >
                                    <TabTitle>{page.pageTitle}</TabTitle>
                                </HeaderTab>
                            );
                        });
                    })}
                </Wrap>
            </LeftSection>
            <RightSection>
                <Line />
                <Divider />
                <HeaderButton onClick={handleFilter} aria-selected={activeFilter}>
                    <Icon name={'filter_alt'} />
                </HeaderButton>
            </RightSection>
        </HeaderWrapper>
    );
};
