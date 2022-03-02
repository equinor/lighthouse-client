import { NetworkError } from '@equinor/http-client';
import { isProduction, useHttpClient } from '@equinor/portal-client';
import { IReportEmbedConfiguration } from 'powerbi-client';
import { useState } from 'react';
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
export function useFusionClient(
    resource: string,
    filterOptions?: Filter[],
    options?: {
        showFilter?: boolean;
        enablePageNavigation?: boolean;
    }
): useFusionClientReturn {
    const { fusion } = useHttpClient();
    fusion.setBaseUrl(`https://pro-s-reports-${isProduction() ? 'fprd' : 'ci'}.azurewebsites.net/`);
    const [error] = useState<NetworkError>();
    const baseUri = `reports`;

    const filters: PowerBiFilter[] = [];
    filterOptions?.forEach((filterOption) => {
        filters.push(filterBuilder(filterOption));
    });

    async function getEmbedInfo() {
        try {
            const embedUri = `${baseUri}/${resource}/config/embedinfo`;
            const response = await fusion.fetch(embedUri);

            const data = await response.json();
            window['embedInfo'] = data;
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async function getConfig(): Promise<IReportEmbedConfiguration> {
        const { embedConfig } = await getEmbedInfo();
        const token = await fusion.fetch(`reports/${resource}/token`).then((x) => x.json());
        return {
            accessToken: token['token'],
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
