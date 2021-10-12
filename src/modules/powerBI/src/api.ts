import { IReportEmbedConfiguration, models } from 'powerbi-client';
import 'powerbi-report-authoring';
import { useEffect, useState } from 'react';
import { getConfig } from './Api/fusionApi';

interface PowerBIResult {
    config: IReportEmbedConfiguration;
}

export function usePowerBI(): PowerBIResult {
    const [config, setReportConfig] = useState<IReportEmbedConfiguration>({
        type: 'report',
        embedUrl: undefined,
        tokenType: models.TokenType.Embed,
        accessToken: undefined,
        settings: undefined
    });

    useEffect(() => {
        async function setupReportConfig() {
            try {
                const fusionConfig = await getConfig();
                console.log('config:', fusionConfig);
                setReportConfig((config) => ({ ...config, ...fusionConfig }));
            } catch (error) {
                console.error(error);
            }
        }
        setupReportConfig();
    }, []);

    return {
        config
    };
}
