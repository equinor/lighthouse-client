export type ConfigRetriever = () => Promise<Config>;

export interface Config {
    ENV_CONFIG_URI: string;
    CLIENT_ENV: string;
}

export interface IConfigurator {
    ENV_CONFIG_URI?: string;
    CLIENT_ENV?: string;
    path?: string;
    configure(): Promise<void>;
}

export class Configurator implements IConfigurator {
    ENV_CONFIG_URI = '';
    CLIENT_ENV = '';
    path?: string;

    async configure(): Promise<void> {
        try {
            const config = await this.getInitialConfig();

            if (config.ENV_CONFIG_URI && config.CLIENT_ENV) {
                this.ENV_CONFIG_URI = config.ENV_CONFIG_URI;
                this.CLIENT_ENV = config.CLIENT_ENV;
            } else {
                throw new ReferenceError(
                    'Invalid config object, please provide a object\n containing ENV_CONFIG_URI and CLIENT_ENV'
                );
            }
        } catch (error) {
            throw new Error('Failed to configure ENV_CONFIG_URI and CLIENT_ENV');
        }
    }

    async getInitialConfig(): Promise<Config> {
        if (!this.path) throw new ReferenceError('No config file path is configured');

        const configResponse = await fetch(this.path);
        return await configResponse.json();
    }
}
