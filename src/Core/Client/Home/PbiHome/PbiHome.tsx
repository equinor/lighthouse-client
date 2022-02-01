import { tokens } from '@equinor/eds-tokens';
import { NetworkError } from '@equinor/http-client';
import { useHttpClient } from '@equinor/portal-client';
import { Embed, IReportEmbedConfiguration, models, Report, service } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';
import 'powerbi-report-authoring';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Icon from '../../../../components/Icon/Icon';
import './style.css';

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 1000px;
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

interface PowerBIResult {
    config: IReportEmbedConfiguration;
    error: NetworkError | undefined;
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

const filterBuilder = (filter: Filter): PowerBiFilter => {
    return {
        $schema: 'http://powerbi.com/product/schema#basic',
        target: {
            table: filter.target.table,
            column: filter.target.column,
        },
        filterType: 1,
        operator: filter.operator,
        values: filter.values,
    };
};

interface useFusionClientReturn {
    getConfig: () => Promise<IReportEmbedConfiguration>;
    error: NetworkError | undefined;
}
export function useFusionClient(
    resource: string,
    filterOptions?: Filter[],
    options?: {
        showFilter?: boolean;
        enablePageNavigation?: boolean;
    }
): useFusionClientReturn {
    const { customHttpClient } = useHttpClient('5a842df8-3238-415d-b168-9f16a6a6031b/.default');
    const [error, setError] = useState<NetworkError>();
    // const baseUri = 'https://app-ppo-proxy-dev.azurewebsites.net/fusion/reports';

    const filters: PowerBiFilter[] = [];
    filterOptions?.forEach((filterOption) => {
        filters.push(filterBuilder(filterOption));
    });

    async function getEmbedInfo() {
        try {
            const embedUri = `https://pro-s-reports-ci.azurewebsites.net/reports/jca-landing-page/config/embedinfo`;
            const response = await customHttpClient.fetch(embedUri);

            const data = await response.json();
            window['embedInfo'] = data;
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async function getPowerBiToken() {
        try {
            const tokenUri = `https://pro-s-reports-ci.azurewebsites.net/reports/jca-landing-page/token`;
            const response = await customHttpClient.fetch(tokenUri);
            return await response.json();
        } catch (error: any) {
            const networkError = error as NetworkError;
            setError(networkError);
        }
    }

    async function getConfig(): Promise<IReportEmbedConfiguration> {
        const { embedConfig } = await getEmbedInfo();
        const { token } = await getPowerBiToken();
        return {
            accessToken: token,
            embedUrl: embedConfig.embedUrl,
            id: embedConfig.reportId,
            settings: {
                panes: {
                    filters: {
                        expanded: false,
                        visible: options?.showFilter ?? false,
                    },
                    pageNavigation: {
                        visible: options?.enablePageNavigation ?? false,
                    },
                },
            },
            filters: filters ?? undefined,
        };
    }

    return {
        getConfig,
        error,
    };
}

export function usePowerBI(
    resource: string,
    filterOptions?: Filter[],
    options?: { showFilter?: boolean; enablePageNavigation?: boolean }
): PowerBIResult {
    const { getConfig, error } = useFusionClient(resource, filterOptions, options);
    const [config, setReportConfig] = useState<IReportEmbedConfiguration>({
        type: 'report',
        embedUrl: undefined,
        tokenType: models.TokenType.Embed,
        accessToken: undefined,
        settings: undefined,
        theme: {
            name: 'Custom Theme',
            background: '#FFFFFF',
            secondaryBackground: '#C8C6C4',
        },
    });

    useEffect(() => {
        async function setupReportConfig() {
            try {
                const fusionConfig = await getConfig();
                setReportConfig((config) => ({ ...config, ...fusionConfig }));
            } catch (error) {
                console.error(error);
            }
        }
        setupReportConfig();
    }, [resource, filterOptions]);

    return {
        config,
        error,
    };
}

export const PowerBIHome = ({
    reportUri,
    filterOptions,
    options,
}: PowerBiHomeProps): JSX.Element => {
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
            async function () {
                console.log('Report has rendered');
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
