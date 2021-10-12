import { authProvider } from '@equinor/authentication';
import { baseClient } from '@equinor/http-client';
import { IReportEmbedConfiguration } from 'powerbi-client';

const scope = ['97978493-9777-4d48-b38a-67b0b9cd88d2/.default'];
const fusionClient = baseClient(authProvider, scope);

export async function getEmbedInfo() {
    try {
        const response = await fusionClient.get(
            'https://pro-s-reports-fprd.azurewebsites.net/reports/punch-analytics-rls/config/embedinfo'
            // 'https://pro-s-reports-fprd.azurewebsites.net/reports/query-analytics-rls/config/embedinfo'
            //'https://pro-s-reports-fprd.azurewebsites.net/reports/handover-analytics-rls/config/embedinfo'
        );

        const data = await response.json();
        window['embedInfo'] = data;
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function getPowerBiToken() {
    try {
        const response = await fusionClient.get(
            'https://pro-s-reports-fprd.azurewebsites.net/reports/punch-analytics-rls/token'
            // 'https://pro-s-reports-fprd.azurewebsites.net/reports/query-analytics-rls/token'
            // 'https://pro-s-reports-fprd.azurewebsites.net/reports/handover-analytics-rls/token'
        );
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

export async function getConfig(): Promise<IReportEmbedConfiguration> {
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
                    table: 'Fact_Query'
                },
                operator: 'In',
                values: ['JCA'],
                filterType: 1,
                requireSingleSelection: true
            }
        ]
    };
}
