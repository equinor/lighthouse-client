import { IReportEmbedConfiguration, models } from 'powerbi-client';
import 'powerbi-report-authoring';
import { useEffect, useState } from 'react';
import { useFusionClient } from './Api/fusionApi';
import { Filter } from './models/filter'


interface PowerBIResult {
    config: IReportEmbedConfiguration;
}

export function usePowerBI(resource: string, filterOptions?: Filter[]): PowerBIResult {
    const { getConfig } = useFusionClient(resource, filterOptions);
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
                setReportConfig((config) => ({ ...config, ...fusionConfig }));
            } catch (error) {
                console.error(error);
            }
        }
        setupReportConfig();
    }, [resource, filterOptions]);

    return {
        config
    };
}
