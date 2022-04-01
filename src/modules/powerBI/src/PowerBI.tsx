import { Embed, Report } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';
import 'powerbi-report-authoring';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useElementData } from '../../../packages/Utils/Hooks/useElementData';
import { usePowerBI } from './api';
import { PowerBIFilter } from './Components';
import { ReportErrorMessage } from './Components/ReportErrorMessage/ReportErrorMessage';
import { useGetPages } from './Hooks/useGetPages';
import './style.css';
import { Filter } from './Types/filter';

const Wrapper = styled.div`
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
`;

const TopBar = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    height: fit-content;
`;

const PBIWrapper = styled.div<{ height: number }>`
    overflow: scroll;
    position: absolute;
    top: ${(props) => props.height}px;
    left: 0;
    right: 0;
    bottom: 0;
`;
interface PowerBiProps {
    reportUri: string;
    filterOptions?: Filter[];
    options?: {
        showFilter?: boolean;
        enableNavigation?: boolean;
        defaultPage?: string;
    };
    aspectRatio?: number;
    isFilterActive?: boolean;
    activePage?: string;
    devLoad?: boolean;
}
const TOP_BAR_FILTER_HEIGHT = 210;

export const PowerBI = ({
    reportUri,
    filterOptions,
    options,
    isFilterActive = false,
    aspectRatio = 0.41,
    activePage,
    devLoad,
}: PowerBiProps): JSX.Element => {
    const [ref, { width }] = useElementData();

    const { config, error } = usePowerBI(reportUri, filterOptions, options);

    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [report, setReport] = useState<Report>();

    // Used for printing pages to console in development can be controlled by option parameters.
    useGetPages(report, devLoad);

    useEffect(() => {
        const setActivePageByName = (name: string) => {
            report?.setPage(name);
        };

        activePage && setActivePageByName(activePage);
    }, [activePage, report]);

    const eventHandlersMap = new Map([
        [
            'loaded',
            function () {
                setIsLoaded(true);
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
                        />
                    </TopBar>
                    <PBIWrapper height={isFilterActive ? TOP_BAR_FILTER_HEIGHT : 0}>
                        <div style={{ height: `${width * aspectRatio}px` }}>
                            <PowerBIEmbed
                                embedConfig={config}
                                eventHandlers={eventHandlersMap}
                                getEmbeddedComponent={(embedObject: Embed) => {
                                    if (devLoad) {
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
