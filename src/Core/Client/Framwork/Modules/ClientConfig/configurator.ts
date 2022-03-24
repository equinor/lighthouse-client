import { crypt } from '../../../Utils/crypt';
import { IConfigProvider } from '../Config/provider';
import { IGlobalStateProvider } from '../GlobalState/provider';

export interface IClientConfigurator {
    configure(configProvider: IConfigProvider, globalStateProvider: IGlobalStateProvider): void;
}

export class ClientConfigurator implements IClientConfigurator {
    constructor(a) {
        if (a) {
            this.configure(a);
        }
    }
    async configure(configProvider?: IConfigProvider): Promise<void> {
        if (!configProvider) {
            throw new Error('Noooo');
        } else if (configProvider) {
            const response = await fetch(
                this.getEnvironmentUri(configProvider.ENV_CONFIG_URI, configProvider.CLIENT_ENV)
            );
            console.log(await response.json());
        }
    }

    getEnvironmentUri(baseUri: string, env: string): string {
        return `https://${baseUri}.azurewebsites.net/api/clientConfig?environmentId=${crypt(
            'environmentId',
            env
        )}`;
    }
}
