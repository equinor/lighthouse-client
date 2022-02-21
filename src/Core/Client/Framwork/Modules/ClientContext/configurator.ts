import { ClientContext } from '../../../Types/ClientContext';

export interface IClientContextConfigurator {
    init: ClientContext;
    configure(clientContext: ClientContext): void;
}

export class ClientContextConfigurator implements IClientContextConfigurator {
    init: ClientContext;

    constructor() {
        this.init = {} as ClientContext;
    }
    configure(_settings: ClientContext): void {
        this.init = _settings;
    }
}
