export interface EleNetwork {
    eleNetId: number;
    switchBoardTagNo: string;
    circuits: EleNetworkCircuit[];
    cables: EleNetworkCable[];
    checkLists: EleNetworkCheckList[];
}

export interface EleNetworkCircuit {
    eleNetId: number;
    parentEleNetId: number;
    tagNo: string;
    eleSymbolCode: string;
    circuitSymbolCode: string;
}

export interface EleNetworkCable {
    tagNo: string;
    tagFrom: string;
    tagTo: string;
}

export interface EleNetworkCheckList {
    tagNo: string;
    responsible: string;
    formularType: string;
    formularGroup: string;
    status: string;
}
