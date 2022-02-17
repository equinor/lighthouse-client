import { tokens } from '@equinor/eds-tokens';
import { Embed, Report, service } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';
import 'powerbi-report-authoring';
import { useState } from 'react';
import styled from 'styled-components';
import Icon from '../../../components/Icon/Icon';
import { useElementData } from '../../../packages/Utils/Hooks/useElementData';
import { usePowerBI } from './api';
import { PageNavigation, PowerBIFilter } from './Components';
import { Filter } from './models/filter';
import './style.css';

const Wrapper = styled.div`
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
    background-color: ${tokens.colors.ui.background__light.rgba};
`;

const ErrorWrapper = styled.div`
    margin-top: 100px;
    height: '-webkit-fill-available';
    height: 50%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
`;

const Heading = styled.h1`
    color: ${tokens.colors.text.static_icons__tertiary.rgba};
    margin-bottom: 0;
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
    };
    aspectRatio?: number;
    isFilterActive?: boolean;
}
const TOP_BAR_FILTER_HEIGHT = 248;
const TOP_BAR_HEIGHT = 48;
export const PowerBI = ({
    reportUri,
    filterOptions,
    options,
    isFilterActive = false,
    aspectRatio = 0.41,
}: PowerBiProps): JSX.Element => {
    const { config, error } = usePowerBI(reportUri, filterOptions, options);
    const [report, setReport] = useState<Report>();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const [ref, { width }] = useElementData();

    //TODO custom loading
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
        ['error', function (event?: service.ICustomEvent<any>) {}],
        [
            'pageChanged',
            function (event) {
                setIsLoaded(false);
            },
        ],
        ['dataSelected', function (e) {}],
        ['selectionChanged', function (e) {}],
    ]);
    return (
        <>
            {error ? (
                <ErrorWrapper>
                    <Icon
                        name={'warning_outlined'}
                        color={tokens.colors.interactive.warning__resting.rgba}
                        size={48}
                    />
                    <Heading>{error.message}</Heading>
                </ErrorWrapper>
            ) : (
                <Wrapper ref={ref}>
                    <TopBar>
                        <PowerBIFilter
                            report={report}
                            isLoaded={isLoaded}
                            isFilterActive={isFilterActive}
                        />
                        <PageNavigation report={report} />
                    </TopBar>
                    <PBIWrapper height={isFilterActive ? TOP_BAR_FILTER_HEIGHT : TOP_BAR_HEIGHT}>
                        <div style={{ height: `${width * aspectRatio}px` }}>
                            <PowerBIEmbed
                                embedConfig={config}
                                eventHandlers={eventHandlersMap}
                                getEmbeddedComponent={(embedObject: Embed) => {
                                    console.log(
                                        `Embedded object of type "${embedObject.embedtype}" received`
                                    );
                                    setReport(embedObject as Report);

                                    window['report'] = embedObject;
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
