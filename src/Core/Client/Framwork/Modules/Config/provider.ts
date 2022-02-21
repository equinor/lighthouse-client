import { Config, IConfigurator } from './configurator';

export interface IConfigProvider extends Config {
    //
}

export class ConfigProvider implements IConfigProvider {
    ENV_CONFIG_URI = '';
    CLIENT_ENV = '';

    constructor(protected _configurator: IConfigurator) {
        if (_configurator.ENV_CONFIG_URI && _configurator.CLIENT_ENV) {
            this.ENV_CONFIG_URI = _configurator.ENV_CONFIG_URI;
            this.CLIENT_ENV = _configurator.CLIENT_ENV;
        } else {
            throw new TypeError('No config provided, please configure the clintConfig');
        }
    }
}
