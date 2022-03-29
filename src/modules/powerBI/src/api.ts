import { IReportEmbedConfiguration, models } from 'powerbi-client';
import 'powerbi-report-authoring';
import { useEffect, useState } from 'react';
import { useFusionClient } from './Api/fusionApi';
import { ContextErrorType } from './Hooks/useErrorMessage';
import { Filter } from './Types/filter';

interface PowerBIResult {
    config: IReportEmbedConfiguration;
    error: FusionPBIError | undefined;
}

export interface FusionPBIError {
    resourceIdentifierstring?: string;
    code: ContextErrorType;
    message: string;
}

export function usePowerBI(
    resource: string,
    filterOptions?: Filter[],
    options?: { showFilter?: boolean; enablePageNavigation?: boolean }
): PowerBIResult {
    const { getConfig } = useFusionClient(resource, filterOptions, options);
    const [error, setError] = useState<FusionPBIError>();
    const [config, setReportConfig] = useState<IReportEmbedConfiguration>({
        type: 'report',
        embedUrl: undefined,
        tokenType: models.TokenType.Embed,
        accessToken: undefined,
        // permissions: models.Permissions.All,
        settings: undefined,
    });

    useEffect(() => {
        async function setupReportConfig() {
            setError(undefined);
            try {
                const fusionConfig = await getConfig();
                setReportConfig((config) => ({ ...config, ...fusionConfig }));
            } catch (error: any) {
                setError(error);
            }
        }
        setupReportConfig();
    }, [resource, filterOptions]);

    return {
        config,
        error,
    };
}
