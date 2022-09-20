import { ApplyEventArgs, SaveEventArgs, useBookmarkEvents } from '@equinor/BookmarksManager';
import { EventHub } from '@equinor/lighthouse-utils';
import { Embed, Report } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';
import 'powerbi-report-authoring';
import { useEffect, useMemo, useState } from 'react';
import { useElementData } from '../../../packages/Utils/Hooks/useElementData';
import { PBIWrapper, TopBar, Wrapper } from '../PowerBI.styles';
import { PowerBIFilter } from './Components';
import { ReportErrorMessage } from './Components/ReportErrorMessage/ReportErrorMessage';
import { usePowerBI } from './Hooks';
import './style.css';
import { PBIOptions, PowerBIBookmarkPayload } from './Types';
import { Filter } from './Types/filter';
import { checkTokenAndUpdate, INTERVAL_TIME } from './Utils/accessToken';

interface PowerBiProps {
    reportUri: string;
    filterOptions?: Filter[];
    options?: PBIOptions;
    onReportLoad?: (report: Report | undefined) => void;
}

const ev = new EventHub();

export const PowerBI = (props: PowerBiProps): JSX.Element => {
    const { reportUri, filterOptions, options } = props;
    // Default Options
    const aspectRatio = useMemo(() => options?.aspectRatio || 0.41, [options?.aspectRatio]);
    const [ref, { width }] = useElementData();
    const { config, error } = usePowerBI(reportUri, filterOptions, options);

    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [report, setReport] = useState<Report>();

    const captureAndPersistBookmark = async ({ title, appKey, subSystem }: SaveEventArgs) => {
        if (!report) {
            return;
        }

        try {
            const bookmark = await report.bookmarksManager.capture();
            const activePage = await report.getActivePage();

            const bookmarkPayload: PowerBIBookmarkPayload = {
                bookmarkState: bookmark.state || '',
                name: activePage.name,
                displayName: activePage.displayName,
                mainPage: options?.activePage,
                mainPageDisplayName: options?.activePageDisplayName,
            };
            options?.persistPayload &&
                options.persistPayload({
                    capturedBookmark: bookmarkPayload,
                    bookmarkTitle: title,
                    appKey,
                    subSystem,
                });
        } catch (err) {
            console.error(err);
            return;
        }
    };

    const applyBookmark = async ({ id: bookmarkId, appKey, subSystem }: ApplyEventArgs) => {
        if (report && options?.applyBookmark) {
            const bookmark = await options?.applyBookmark({ id: bookmarkId, appKey, subSystem });
            if (bookmark) {
                report.bookmarksManager.applyState(bookmark.bookmarkState);
            }
        }
    };

    // Registering custom events for saving and applying bookmarks. Functions that are passed as arguments will
    // run once the events are fired.
    useBookmarkEvents({ saveFn: captureAndPersistBookmark, applyFn: applyBookmark });

    const eventHandlersMap = new Map([
        [
            'loaded',
            function () {
                setIsLoaded(true);
            },
        ],
        [
            'bookmarkApplied',
            function () {
                /**
                 * Will cause useEffect to trigger in PowerBIFilter to
                 * update the list of new active filters
                 */
                setIsLoaded(false);
            },
        ],
        [
            'rendered',
            function () {
                setIsLoaded(true);
            },
        ],
        [
            'error',
            function () {
                //dataSelected error
            },
        ],
        [
            'pageChanged',
            function () {
                setIsLoaded(false);
            },
        ],
        [
            'dataSelected',
            function () {
                //dataSelected Events
            },
        ],
        [
            'selectionChanged',
            function () {
                ev.publish('PBIClicked', 's');
            },
        ],
        [
            'visualClicked',
            function (e) {
                ev.publish('PBIClicked', 's');
                /**
                 *
                 * Chiclet slicers are visuals inside the report that will have an impact
                 * on what filters are to be shown if they are clicked, so an update is needed..
                 */
                if ((e.detail.visual.type as string).startsWith('Chiclet')) {
                    setIsLoaded(false);
                }
            },
        ],
    ]);

    const [isFilterExpanded, setIsFilterExpanded] = useState(false);

    useEffect(() => {
        options?.activePage && report?.setPage(options.activePage);
    }, [options?.activePage, report]);

    useEffect(() => {
        const a = setInterval(() => {
            checkTokenAndUpdate(reportUri, report, config.tokenExpiration);
        }, INTERVAL_TIME);

        return () => {
            clearInterval(a);
        };
    }, [report, reportUri, config.tokenExpiration]);
    if (error) {
        return (
            <ReportErrorMessage
                reportId={reportUri}
                contextErrorType={error.code}
                message={error.message}
            />
        );
    }

    return (
        <>
            <Wrapper ref={ref}>
                <TopBar height={getFilterHeight(isFilterExpanded)}>
                    {report && isLoaded && (
                        <PowerBIFilter
                            report={report}
                            isFilterActive={true}
                            isLoaded={isLoaded}
                            isFilterExpanded={isFilterExpanded}
                            setIsFilterExpanded={setIsFilterExpanded}
                        />
                    )}
                </TopBar>
                <PBIWrapper height={getFilterHeight(isFilterExpanded)}>
                    <div
                        style={{
                            height: `${width * aspectRatio}px`,
                        }}
                    >
                        <PowerBIEmbed
                            embedConfig={config}
                            eventHandlers={eventHandlersMap}
                            getEmbeddedComponent={(embedObject: Embed) => {
                                if (options?.pageLoad) {
                                    // eslint-disable-next-line no-console
                                    console.log(
                                        `Embedded object of type "${embedObject.embedtype}" received`
                                    );
                                    window['report'] = embedObject;
                                }

                                setReport(embedObject as Report);
                                props?.onReportLoad && props.onReportLoad(embedObject as Report);
                            }}
                            cssClassName="pbiEmbed"
                        />
                    </div>
                </PBIWrapper>
            </Wrapper>
        </>
    );
};

const getFilterHeight = (isFilterExpanded: boolean) => (isFilterExpanded ? 250 : 48);
