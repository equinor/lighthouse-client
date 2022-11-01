export interface Switchboard {
    eleNetworks: EleNetwork[];
}

export interface EleNetwork {
    eleNetId: string;
    circuitAndStarterTagNo: string;
    isolated: boolean;
    isolatedBy?: Person;
    isolatedDate?: string;
    isolatedComment?: string;
    circuits: EleNetworkCircuit[];
    cables: EleNetworkCable[];
    checkLists: EleNetworkCheckList[];
}

export interface EleNetworkCircuit {
    eleNetId: string;
    parentEleNetId: string | null;
    tagNo: string;
    eleSymbolCode: string;
    circuitSymbolCode: string | null;
    circuitUsage: string | null;
}

export interface EleNetworkCable {
    tagNo: string;
    tagFrom: string;
    tagTo: string;
    estimatedCableLength: string;
    installedCableLength: string;
    pulledDate: string;
    releasedDate: string | null;
    terminatedFromDate: string;
    terminatedToDate: string;
    testedDate: string;
    disconnected?: boolean;
    disconnectedBy?: Person;
    disconnectedDate?: string;
    disconnectedComment?: string;
}

export interface EleNetworkCheckList {
    tagNo: string;
    responsible: string;
    formularType: string;
    formularGroup: string;
    status: string;
}

export interface Person {
    id: string;
    oid: string;
    firstName: string;
    lastName: string;
    email: string;
}

export enum CircuitTypes {
    Circuit = 'TAVLE',
    JunctionBox = 'K_BOX',
    HTCable = 'HT_KAB',
    SpaceHeater = 'VARME',
}
