import { baseClient, NetworkError } from '@equinor/http-client';
import { IReportEmbedConfiguration } from 'powerbi-client';
import { useState } from 'react';
import useClientContext from '../../../../context/clientContext';
import { Filter, PowerBiFilter } from '../models/filter';

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
export function useFusionClient(resource: string, filterOptions?: Filter[]): useFusionClientReturn {
    const { appConfig, authProvider } = useClientContext();
    const [error, setError] = useState<NetworkError>();
    const scope = [appConfig.fusion];
    const fusionClient = baseClient(authProvider, scope);
    const baseUri = 'https://lih-proxy.azurewebsites.net/fusion/reports';
    const filters: PowerBiFilter[] = [];
    filterOptions?.forEach((filterOption) => {
        filters.push(filterBuilder(filterOption));
    });

    async function getEmbedInfo() {
        try {
            const embedUri = `${baseUri}/${resource}/config/embedinfo`;
            const response = await fusionClient.fetch(embedUri);

            const data = await response.json();
            window['embedInfo'] = data;
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async function getPowerBiToken() {
        try {
            const tokenUri = `${baseUri}/${resource}/token`;
            const response = await fusionClient.fetch(tokenUri);
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
                        visible: false,
                    },
                    pageNavigation: {
                        visible: false,
                    },
                },
            },
            // filters: filters ?? undefined,
        };
    }

    return {
        getConfig,
        error,
    };
}
