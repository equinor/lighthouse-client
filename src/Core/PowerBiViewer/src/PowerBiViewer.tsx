import { PowerBI } from '@equinor/lighthouse-powerbi';
import { useEffect, useState } from 'react';
import { usePowerBiViewer } from './Api/powerBiViewerState';
import { PowerBiViewerHeader } from './Components/PowerBiViewerHeader/PowerBiViewerHeader';
import { ContentWrapper, Wrapper } from './PowerBiViewerStyles';
import { FusionPowerBiOptions, Page, ViewState } from './Types/State';
import { getDefault } from './Utils/getDefault';

type PowerBiViewerProps = Omit<ViewState, 'reports'>;

/**
 * The Power bi viewer is the main power-bi application in the lighthouse portal,
 * utilizing the @equinor/lighthouse-powerbi
 *
 * @param {Page} selectedPage
 * @param {FusionPowerBiOptions[]} reports
 * @return {*}  {(FusionPowerBiOptions | undefined)}
 */
function getReportByPage(
    selectedPage: Page,
    reports: FusionPowerBiOptions[]
): FusionPowerBiOptions | undefined {
    return reports.find((r) => r.pages.includes(selectedPage));
}

export function PowerBiViewer(props: PowerBiViewerProps): JSX.Element {
    const { reports } = usePowerBiViewer(props.shortName);

    const [activePage, setActivePage] = useState<Page>();
    const [isFilterActive, setIsFilterActive] = useState(false);
    const [activeReport, setActiveReport] = useState<FusionPowerBiOptions>();

    useEffect(() => {
        const { report, page } = getDefault(reports);
        setActivePage(page);
        setActiveReport(report);
    }, [reports]);

    const handleSetActivePage = (page: Page) => {
        setActivePage(page);
        const newReport = getReportByPage(page, reports);
        if (newReport && newReport.reportURI !== activeReport?.reportURI) {
            newReport.options = { ...newReport.options, defaultPage: page.pageId };
            setActiveReport(newReport);
        }
    };

    function handleFilter() {
        setIsFilterActive((s) => !s);
    }

    return (
        <Wrapper>
            <PowerBiViewerHeader
                {...props}
                activePage={activePage}
                handleSetActivePage={handleSetActivePage}
                activeFilter={isFilterActive}
                handleFilter={handleFilter}
            />
            <ContentWrapper>
                {activeReport && activePage && (
                    <PowerBI
                        reportUri={activeReport.reportURI}
                        filterOptions={activeReport.filter}
                        options={activeReport.options}
                        isFilterActive={isFilterActive}
                        activePage={activePage.pageId}
                        devLoad={activeReport.loadPagesInDev}
                    />
                )}
            </ContentWrapper>
        </Wrapper>
    );
}
