import { baseClient } from '@equinor/http-client';
import { IReportEmbedConfiguration } from 'powerbi-client';
import useClientContext from '../../../../context/clientContext';

export function useFusionClient() {
    const { appConfig, authProvider } = useClientContext();
    const scope = [appConfig.fusion];
    const fusionClient = baseClient(authProvider, scope);
    async function getEmbedInfo() {
        try {
            const response = await fusionClient.fetch(
                // 'https://pro-s-reports-fprd.azurewebsites.net/reports/punch-analytics-rls/config/embedinfo'
                // 'https://pro-s-reports-fprd.azurewebsites.net/reports/query-analytics-rls/config/embedinfo'
                'https://pro-s-reports-fprd.azurewebsites.net/reports/handover-analytics-rls/config/embedinfo'
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
            const response = await fusionClient.fetch(
                // 'https://pro-s-reports-fprd.azurewebsites.net/reports/punch-analytics-rls/token'
                // 'https://pro-s-reports-fprd.azurewebsites.net/reports/query-analytics-rls/token'
                'https://pro-s-reports-fprd.azurewebsites.net/reports/handover-analytics-rls/token'
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
            filters: [
                {
                    $schema: 'http://powerbi.com/product/schema#basic',
                    target: {
                        column: 'FACILITY',
                        table: 'Commpkg'
                    },
                    operator: 'In',
                    values: ['JCA'],
                    filterType: 1
                }
            ]
        };
    }

    return {
        getConfig
    };
}
