import { PowerBI } from '@equinor/lighthouse-powerbi';
import { useState } from 'react';
import { usePowerBiViewer } from './Api/powerBiViewerState';
import { PowerBiViewerHeader } from './Components/PowerBiViewerHeader/PowerBiViewerHeader';
import { ContentWrapper, Wrapper } from './PowerBiViewerStyles';
import { Page, ViewState } from './Types/State';

type PowerBiViewerProps = Omit<ViewState, 'reports'>;

export function PowerBiViewer(props: PowerBiViewerProps): JSX.Element {
    const { reports } = usePowerBiViewer(props.shortName);

    const [activePage, setActivePage] = useState<Page>(reports[0].pages[0]);
    const activeReport = reports[0];
    const handleSetActivePage = (page: Page) => {
        setActivePage(page);
    };

    const [isFilterActive, setIsFilterActive] = useState(false);

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
                <h4>{JSON.stringify(activePage)}</h4>
                <PowerBI
                    reportUri={activeReport.reportURI}
                    filterOptions={activeReport.filter}
                    options={activeReport.options}
                    isFilterActive={isFilterActive}
                    activePage={activePage.pageId}
                />
            </ContentWrapper>
        </Wrapper>
    );
}
