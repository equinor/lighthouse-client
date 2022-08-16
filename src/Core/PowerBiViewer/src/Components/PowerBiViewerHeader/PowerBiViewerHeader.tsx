import { BookmarkDropdown } from '@equinor/BookmarksManager';
import { useGetPages } from '@equinor/lighthouse-powerbi';
import { usePowerBiContext } from '../../Context/PbiContext';
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
}

export const PowerBiViewerHeader = ({
    title,
    shortName,
    groupName,
}: PowerBiViewerHeaderProps): JSX.Element => {
    const { report, activePage, setActivePage } = usePowerBiContext();
    const { pages } = useGetPages(report);

    return (
        <HeaderWrapper>
            <Title variant="h3">{title}</Title>
            <HeaderContent>
                <LeftSection>
                    {pages && (
                        <Wrap>
                            {pages.map((page) => {
                                const isPageActive =
                                    page.name === activePage?.pageId
                                        ? true
                                        : page.displayName === activePage?.pageTitle
                                        ? true
                                        : false;
                                return (
                                    <HeaderTab
                                        key={page.name}
                                        onClick={() =>
                                            setActivePage({
                                                pageId: page.name,
                                                pageTitle: page.displayName,
                                            })
                                        }
                                        active={isPageActive}
                                        style={{ overflowX: 'visible' }}
                                    >
                                        <TabTitle>{page.displayName}</TabTitle>
                                    </HeaderTab>
                                );
                            })}
                        </Wrap>
                    )}
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
