import { tokens } from '@equinor/eds-tokens';
import { Embed, Report, service } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';
import 'powerbi-report-authoring';
import { useState } from 'react';
import styled from 'styled-components';
import Icon from '../../../components/Icon/Icon';
import { usePowerBI } from './api';
import { PageNavigation } from './Components';
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
}

export const PowerBI = ({ reportUri, filterOptions, options }: PowerBiProps): JSX.Element => {
    const { config, error } = usePowerBI(reportUri, filterOptions, options);
    const [report, setReport] = useState<Report>();

    //TODO custom loading
    const eventHandlersMap = new Map([
        [
            'loaded',
            function () {
                console.log('Report has loaded');
            },
        ],
        [
            'rendered',
            function () {
                console.log('Report has rendered');

                // Update display message
                //setMessage('The report is rendered');
            },
        ],
        [
            'error',
            function (event?: service.ICustomEvent<any>) {
                if (event) {
                    console.error(event.detail);
                }
            },
        ],
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
