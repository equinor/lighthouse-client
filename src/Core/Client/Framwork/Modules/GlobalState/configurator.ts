import { GlobalClientState } from '../../../Types/GlobalClientState';

export interface IGlobalStateConfigurator {
    initialState: GlobalClientState;
    configure(_initialState: Partial<GlobalClientState>): void;
}

export class GlobalStateConfigurator implements IGlobalStateConfigurator {
    initialState: GlobalClientState;

    constructor() {
        this.initialState = {} as GlobalClientState;
    }

    configure(_initialState: Partial<GlobalClientState>): void {
        this.initialState = _initialState as GlobalClientState;
    }
}
