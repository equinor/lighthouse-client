/* eslint-disable no-console */
import { tokens } from '@equinor/eds-tokens';
import { Embed, service } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';
import 'powerbi-report-authoring';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Icon from '../../../../components/Icon/Icon';
import './style.css';
import {
    INTERVAL_TIME,
    checkTokenAndUpdate,
} from '../../../../modules/powerBI/src/Utils/updateAccessToken';
import { Report as EmbedReport } from 'powerbi-client';
import { usePowerBI } from '../../../../modules/powerBI/src';

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 80vh;
    background-color: '#fff' !important;
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

interface PowerBiHomeProps {
    reportUri: string;
    filterOptions?: Filter[];
    options?: {
        showFilter?: boolean;
        enableNavigation?: boolean;
    };
}

type BasicFilterOperators = 'In' | 'NotIn' | 'All';

export interface PowerBiFilter {
    $schema: string;
    target: {
        table: string;
        column: string;
    };
    filterType: number;
    operator: BasicFilterOperators;
    values: string[];
}

export interface Filter {
    values: string[];
    target: {
        table: string;
        column: string;
    };
    operator: BasicFilterOperators;
}

export const PowerBIHome = ({
    reportUri,
    filterOptions,
    options,
}: PowerBiHomeProps): JSX.Element => {
    const { config, error } = usePowerBI(reportUri, filterOptions, options);
    const [report, setReport] = useState<EmbedReport | null>(null);

    const eventHandlersMap = new Map([
        [
            'error',
            function (event?: service.ICustomEvent<any>) {
                if (event) {
                    console.error(event.detail);
                }
            },
        ],
    ]);

    useEffect(() => {
        if (!report) return;
        const intervalId = setInterval(() => {
            checkTokenAndUpdate(reportUri, report);
        }, INTERVAL_TIME);

        return () => {
            clearInterval(intervalId);
        };
    }, [report, reportUri]);

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
                    <PowerBIEmbed
                        embedConfig={config}
                        eventHandlers={eventHandlersMap}
                        getEmbeddedComponent={(embedObject: Embed) => {
                            window['report'] = embedObject;
                            setReport(embedObject as unknown as EmbedReport);
                        }}
                        cssClassName="pbiEmbed"
                    />
                </Wrapper>
            )}
        </>
    );
};
