import { ApplyEventArgs, useBookmarks } from '@equinor/BookmarksManager';
import { PBIOptions, PowerBI, PowerBIBookmarkPayload } from '@equinor/lighthouse-powerbi';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePowerBiViewer } from './Api/powerBiViewerState';
import { PowerBiViewerHeader } from './Components/PowerBiViewerHeader/PowerBiViewerHeader';
import { ContentWrapper, Wrapper } from './PowerBiViewerStyles';
import { FusionPowerBiOptions, Page, ViewState } from './Types/State';
import { getDefault, getReportByPage, isDifferentPage, isDifferentReport } from './Utils';

type PowerBiViewerProps = Omit<ViewState, 'reports'>;

/**
 * The Power bi viewer is the main power-bi application in the lighthouse portal,
 * utilizing the @equinor/lighthouse-powerbi
 */
export function PowerBiViewer(props: PowerBiViewerProps): JSX.Element {
    const [activePage, setActivePage] = useState<Page>();
    const [isFilterActive, setIsFilterActive] = useState(false);
    const [hasFilter, setHasFilter] = useState(false);
    const [activeReport, setActiveReport] = useState<FusionPowerBiOptions>();

    const { reports } = usePowerBiViewer(props.shortName);
    const { handleApplyBookmark, handleSaveBookmarks } = useBookmarks<PowerBIBookmarkPayload>();

    const handleSetActivePage = (page: Page, options?: PBIOptions) => {
        setActivePage(page);
        const newReport = getReportByPage(page, reports);
        if (newReport && newReport.reportURI !== activeReport?.reportURI) {
            newReport.options = { ...newReport.options, defaultPage: page.pageId, ...options };
            setActiveReport(newReport);
        }
    };
    function handleHasFilter(hasFilter: boolean) {
        setHasFilter(hasFilter);
    }

    function handleFilter() {
        setIsFilterActive((s) => !s);
    }
    const pageManager = (bookmark: PowerBIBookmarkPayload) => {
        if (isDifferentPage(activePage, bookmark)) {
            const report = getReportByPage(
                {
                    pageId: bookmark?.mainPage,
                    pageTitle: bookmark?.mainPageDisplayName,
                },
                reports
            );
            if (isDifferentReport(activeReport, report)) {
                handleSetActivePage(
                    {
                        pageId: bookmark?.mainPage || '',
                        pageTitle: bookmark?.mainPageDisplayName || '',
                        default: true,
                    },
                    {
                        bookmark: { state: bookmark.bookmarkState },
                        defaultPage: bookmark.name,
                    }
                );
                return;
            } else {
                handleSetActivePage({
                    pageId: bookmark?.mainPage || '',
                    pageTitle: bookmark?.mainPageDisplayName || '',
                    default: true,
                });
                return bookmark;
            }
        } else {
            // if same report & same page
            return bookmark;
        }
    };
    const handleApplyingBookmark = async ({ id: bookmarkId }: ApplyEventArgs) => {
        const bookmark = await handleApplyBookmark(bookmarkId);

        return pageManager(bookmark);
    };
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const bookmarkId = searchParams.get('bookmarkId');
        if (bookmarkId) {
            (async () => {
                const bookmarkPayload = await handleApplyBookmark(bookmarkId);
                pageManager(bookmarkPayload);
            })();
        } else {
            const { report, page } = getDefault(reports);
            setActivePage(page);
            setActiveReport(report);
        }
    }, [reports, searchParams]);

    return (
        <Wrapper>
            <PowerBiViewerHeader
                {...props}
                groupName={props.groupe}
                activePage={activePage}
                handleSetActivePage={handleSetActivePage}
                activeFilter={isFilterActive}
                handleFilter={handleFilter}
                hasFilter={hasFilter}
            />
            <ContentWrapper>
                {activeReport && activePage && (
                    <PowerBI
                        reportUri={activeReport.reportURI}
                        filterOptions={activeReport.filter}
                        options={{
                            ...activeReport.options,
                            isFilterActive,
                            activePage: activePage.pageId,
                            activePageDisplayName: activePage.pageTitle,
                            hasFilter: handleHasFilter,
                            persistPayload: handleSaveBookmarks,
                            applyBookmark: handleApplyingBookmark,
                        }}
                    />
                )}
            </ContentWrapper>
        </Wrapper>
    );
}
