import { PowerBI } from '@equinor/lighthouse-powerbi';
import { usePowerBiViewer } from './Api/powerBiViewerState';
import { PowerBiViewerHeader } from './Components/PowerBiViewerHeader/PowerBiViewerHeader';
import { PowerBiViewerContext, usePowerBiContext } from './Context/PbiContext';
import { Wrapper } from './PowerBiViewerStyles';
import { ViewState } from './Types/State';

type PowerBiViewerProps = Omit<ViewState, 'report'>;

/**
 * The Power bi viewer is the main power-bi application in the lighthouse portal,
 * utilizing the @equinor/lighthouse-powerbi
 */
export function PowerBiViewer(props: PowerBiViewerProps): JSX.Element {
    return (
        <PowerBiViewerContext>
            <PbiViewer {...props} />
        </PowerBiViewerContext>
    );
}

const PbiViewer = (props: PowerBiViewerProps) => {
    const {
        handleApplyingBookmark,
        handleSaveBookmarks,
        setReport,
        pbiOptions,
        activePage,
        ready,
    } = usePowerBiContext();
    const { report: configReport } = usePowerBiViewer(props.shortName);
    return (
        <Wrapper>
            <PowerBiViewerHeader {...props} groupName={props.groupe} />

            {configReport && configReport.reportURI && ready && (
                <PowerBI
                    reportUri={configReport.reportURI}
                    filterOptions={configReport.filter}
                    onReportLoad={(report) => {
                        setReport(report);
                    }}
                    options={{
                        ...pbiOptions,
                        activePage: activePage?.pageId,
                        defaultPage: activePage?.pageId,
                        bookmark: pbiOptions?.bookmark,
                        activePageDisplayName: activePage?.pageTitle,
                        applyBookmark: handleApplyingBookmark,
                        persistPayload: handleSaveBookmarks,
                    }}
                />
            )}
        </Wrapper>
    );
};
