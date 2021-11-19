import { baseClient } from '@equinor/http-client';
import { IReportEmbedConfiguration } from 'powerbi-client';
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
}


export function useFusionClient(resource: string, filterOptions?: Filter[]) {
    const { appConfig, authProvider } = useClientContext();
    const scope = [appConfig.fusion];
    const fusionClient = baseClient(authProvider, scope);
    const baseUri = 'https://lih-proxy.azurewebsites.net/fusion/reports';
    let filters: PowerBiFilter[] = []
    filterOptions?.forEach((filterOption) => {
        filters.push(filterBuilder(filterOption))
    })

    async function getEmbedInfo() {
        try {
            const embedUri = `${baseUri}/${resource}/config/embedinfo`
            const response = await fusionClient.fetch(
                embedUri
            );

            const data = await response.json();
            window['embedInfo'] = data;
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    async function getPowerBiToken() {
        try {
            const tokenUri = `${baseUri}/${resource}/token`
            const response = await fusionClient.fetch(
                tokenUri
            );
            return await response.json();
        } catch (error) {
            console.error(error);
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
                        visible: false
                    },
                    pageNavigation: {
                        visible: false
                    }
                }
            },
            filters: filters ?? undefined
        };
    }

    return {
        getConfig
    };
}

