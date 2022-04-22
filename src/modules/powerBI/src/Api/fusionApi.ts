import { useHttpClient } from '@equinor/portal-client';
import { IReportEmbedConfiguration } from 'powerbi-client';
import { BuiltPowerBiFilter, Filter } from '../Types/filter';

const filterBuilder = (filter: Filter): BuiltPowerBiFilter => {
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
    getConfig(): Promise<IReportEmbedConfiguration>;
}
export function useFusionClient(
    resource: string,
    filterOptions?: Filter[],
    options?: {
        showFilter?: boolean;
        enablePageNavigation?: boolean;
        defaultPage?: string;
    }
): useFusionClientReturn {
    const { fusionPbi } = useHttpClient();

    const baseUri = `reports`;

    const filters: BuiltPowerBiFilter[] = [];
    filterOptions?.forEach((filterOption) => {
        filters.push(filterBuilder(filterOption));
    });

    async function getEmbedInfo() {
        const embedUri = `${baseUri}/${resource}/config/embedinfo`;
        const response = await fusionPbi.fetch(embedUri);

        const data = await response.json();
        return data;
    }

    async function getConfig(): Promise<IReportEmbedConfiguration> {
        const { embedConfig } = await getEmbedInfo();
        const repose = await fusionPbi.fetch(`${baseUri}/${resource}/token`);
        const token = await repose.json();
        if (repose.status === 403 || repose.status === 401) {
            throw token['error'];
        }

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
            pageName: options?.defaultPage,
            filters: filters ?? undefined,
        };
    }

    return {
        getConfig,
    };
}
