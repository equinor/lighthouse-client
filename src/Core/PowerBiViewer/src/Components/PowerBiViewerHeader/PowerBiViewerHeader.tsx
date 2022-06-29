import { BookmarkDropdown } from '@equinor/BookmarksManager';
import { usePowerBiViewer } from '../../Api/powerBiViewerState';
import { Page } from '../../Types/State';
import {
    Divider,
    HeaderContent,
    HeaderTab,
    HeaderWrapper,
    LeftSection,
    Line,
    RightSection,
    TabTitle,
    Title,
    Wrap,
} from './PowerBiViewerHeaderStyles';

interface PowerBiViewerHeaderProps {
    title: string;
    shortName: string;
    groupName: string;
    activePage?: Page;
    handleSetActivePage(page: Page): void;
}

export const PowerBiViewerHeader = ({
    title,
    shortName,
    groupName,
    activePage,
    handleSetActivePage,
}: PowerBiViewerHeaderProps): JSX.Element => {
    const { reports } = usePowerBiViewer(shortName);

    return (
        <HeaderWrapper>
            <Title variant="h3">{title}</Title>
            <HeaderContent>
                <LeftSection>
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

                    <BookmarkDropdown appKey={shortName} subSystem={groupName} />
                </RightSection>
            </HeaderContent>
        </HeaderWrapper>
    );
};
