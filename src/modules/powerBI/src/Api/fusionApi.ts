import { useHttpClient } from '@equinor/lighthouse-portal-client';
import { IReportEmbedConfiguration } from 'powerbi-client';
import { PBIOptions } from '..';
import { BuiltPowerBiFilter, Filter } from '../Types/filter';
import { AccessToken } from '../Utils/access-token';

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
    options?: Pick<PBIOptions, 'showFilter' | 'enablePageNavigation' | 'defaultPage' | 'bookmark'>
): useFusionClientReturn {
    const fusionPbi = useHttpClient('fusionPbi');

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
        const access = AccessToken.getInstance();
        access.setAccess(token);

        return {
            accessToken: access.getAccess()?.token,
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
            bookmark: options?.bookmark,
            pageName: options?.defaultPage,
            filters: filters ?? undefined,
        };
    }

    return {
        getConfig,
    };
}
