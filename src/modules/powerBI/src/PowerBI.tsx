import { tokens } from '@equinor/eds-tokens';
import { Embed, Report, service } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';
import 'powerbi-report-authoring';
import { useState } from 'react';
import styled from 'styled-components';
import Icon from '../../../components/Icon/Icon';
import { usePowerBI } from './api';
import { PageNavigation, PowerBIFilter } from './Components';
import { Filter } from './models/filter';
import './style.css';

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: calc(100vh - 110px);
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

interface PowerBiProps {
    reportUri: string;
    filterOptions?: Filter[];
    options?: {
        showFilter?: boolean;
        enableNavigation?: boolean;
    };
    isFilterActive?: boolean;
}

export const PowerBI = ({
    reportUri,
    filterOptions,
    options,
    isFilterActive = false,
}: PowerBiProps): JSX.Element => {
    const { config, error } = usePowerBI(reportUri, filterOptions, options);
    const [report, setReport] = useState<Report>();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

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
                <Wrapper>
                    <PowerBIFilter
                        report={report}
                        isLoaded={isLoaded}
                        isFilterActive={isFilterActive}
                    />

                    <PageNavigation report={report} />
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
                </Wrapper>
            )}
        </>
    );
};
