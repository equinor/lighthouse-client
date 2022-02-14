import { ClientSettings } from '../../../Types/ClientSettings';

export interface ISettingsConfigurator {
    init: ClientSettings;
    configure(settings: ClientSettings): void;
}

export class SettingsConfigurator implements ISettingsConfigurator {
    init: ClientSettings;

    constructor() {
        this.init = {} as ClientSettings;
    }
    configure(_settings: ClientSettings): void {
        this.init = _settings;
    }
}
