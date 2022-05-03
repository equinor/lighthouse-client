import { ApplyEventArgs, SaveEventArgs, useBookmarkEvents } from '@equinor/BookmarksManager';
import { Embed, Page, Report } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';
import 'powerbi-report-authoring';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useElementData } from '../../../packages/Utils/Hooks/useElementData';
import { PBIWrapper, TopBar, Wrapper } from '../PowerBI.styles';
import { PowerBIFilter } from './Components';
import { ReportErrorMessage } from './Components/ReportErrorMessage/ReportErrorMessage';
import { usePowerBI } from './Hooks';
import { useGetPages } from './Hooks/useGetPages';
import './style.css';
import { PBIOptions, PowerBIBookmarkPayload } from './Types';
import { Filter } from './Types/filter';

const TOP_BAR_FILTER_HEIGHT = 210;
interface PowerBiProps {
    reportUri: string;
    filterOptions?: Filter[];
    options?: PBIOptions;
}

export const PowerBI = (props: PowerBiProps): JSX.Element => {
    const { reportUri, filterOptions, options } = props;
    // Default Options
    const aspectRatio = useMemo(() => options?.aspectRatio || 0.41, [options?.aspectRatio]);
    const isFilterActive = useMemo(
        () => options?.isFilterActive || false,
        [options?.isFilterActive]
    );

    const [ref, { width }] = useElementData();
    const [bookmarkError, setBookmarkError] = useState<unknown>();
    const { config, error } = usePowerBI(reportUri, filterOptions, options);

    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [report, setReport] = useState<Report>();

    const activePage = useGetActivePage(report);
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
                options.persistPayload(bookmarkPayload, title, appKey, subSystem);
        } catch (err) {
            console.error(err);
            return;
        }
    };

    const applyBookmark = async ({ id: bookmarkId, appKey, subSystem }: ApplyEventArgs) => {
        if (report && options?.applyBookmark) {
            const bookmark = await options?.applyBookmark(bookmarkId, appKey, subSystem);
            if (bookmark) {
                report.bookmarksManager.applyState(bookmark.bookmarkState);
            }
        }
    };

    // Registering custom events for saving and applying bookmarks. Functions that are passed as arguments will
    // run once the events are fired.
    useBookmarkEvents(captureAndPersistBookmark, applyBookmark);

    // Used for printing pages to console in development can be controlled by option parameters.
    useGetPages(report, options?.pageLoad);
    useEffect(() => {
        const setActivePageByName = (name: string) => {
            report?.setPage(name);
        };

        options?.activePage && setActivePageByName(options.activePage);
    }, [options?.activePage, report]);

    const eventHandlersMap = new Map([
        [
            'loaded',
            function () {
                setIsLoaded(true);
            },
        ],
        [
            'bookmarkApplied',
            function (evt) {
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
                //selectionChanged Events
            },
        ],
        [
            'visualClicked',
            function (e) {
                /**
                 * Chiclet slicers are visuals inside the report that will have an impact
                 * on what filters are to be shown if they are clicked, so an update is needed..
                 */
                if ((e.detail.visual.type as string).startsWith('Chiclet')) {
                    setIsLoaded(false);
                }
            },
        ],
    ]);

    return (
        <>
            <DevPbi
                activeReportPage={activePage}
                pageId={options?.activePage}
                pageDisplayName={options?.activePageDisplayName}
                bookmarkError={bookmarkError}
            />
            {error ? (
                <ReportErrorMessage
                    reportId={reportUri}
                    contextErrorType={error.code}
                    message={error.message}
                />
            ) : (
                <Wrapper ref={ref}>
                    <TopBar>
                        <PowerBIFilter
                            report={report}
                            isLoaded={isLoaded}
                            isFilterActive={isFilterActive}
                            options={{ hasFilter: options?.hasFilter }}
                        />
                    </TopBar>
                    <PBIWrapper height={isFilterActive ? TOP_BAR_FILTER_HEIGHT : 0}>
                        <div style={{ height: `${width * aspectRatio}px` }}>
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
                                }}
                                cssClassName="pbiEmbed"
                            />
                        </div>
                    </PBIWrapper>
                </Wrapper>
            )}
        </>
    );
};

type WrapProps = {
    backgroundColor: string;
};
const Wrap = styled.div<WrapProps>`
    position: absolute;
    right: 49%;
    top: 0;
    background: ${(props) => props.backgroundColor};
    color: black;
    display: flex;
    flex-direction: column;
    gap: 1em;
    width: fit-content;
    z-index: 2;
`;
export const DevPbi = ({ pageId, pageDisplayName, activeReportPage, bookmarkError }) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const isReportAndPageNavDifferentPage = pageDisplayName !== activeReportPage?.displayName;
    return (
        <Wrap backgroundColor={isReportAndPageNavDifferentPage ? 'salmon' : 'lightgray'}>
            <div onClick={() => setIsOpen(!isOpen)}>X</div>
            {isOpen && (
                <>
                    <div>PageId: {pageId}</div>
                    <div>Page Display name: {pageDisplayName}</div>
                    <div>Report PageId: {activeReportPage && activeReportPage.name}</div>
                    <div>
                        Report page display name: {activeReportPage && activeReportPage.displayName}
                    </div>
                    <div>
                        BM error : {bookmarkError && JSON.stringify(bookmarkError as unknown)}
                    </div>
                </>
            )}
        </Wrap>
    );
};

const useGetActivePage = (report: Report | undefined) => {
    const [activePage, setActivePage] = useState<Page>();
    useEffect(() => {
        if (report) {
            (() => {
                report.on('rendered', async () => {
                    const a = await report.getActivePage();
                    setActivePage(a);
                });
            })();
        }
    }, [report]);

    return activePage;
};
