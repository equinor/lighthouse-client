import {
    CheckListStepTag,
    getCableChildren,
    getCircuitChildren,
    getCircuitTestStatus,
    getNodeStatus,
} from '@equinor/CircuitDiagram';
import { eleTestData } from '../Mock/circuitMockData';

describe('circuitDiagramHelpers tests', () => {
    it('should return the circuit (junction box) that connects to the circuit starter', () => {
        const result = getCircuitChildren(
            eleTestData,
            eleTestData.circuits.filter((x) => x.parentEleNetId === null)[0]
        );
        expect(result.length).toBe(1);
        expect(result[0].tagNo).toStrictEqual('82EL065-409-B01');
        expect(result[0].parentEleNetId).toStrictEqual(
            eleTestData.circuits.filter((x) => x.parentEleNetId === null)[0].eleNetId
        );
    });

    it('should return the cable that goes out from circuit starter', () => {
        const result = getCableChildren(
            eleTestData,
            eleTestData.circuits.filter((x) => x.parentEleNetId === null)[0]
        );
        expect(result.length).toBe(1);
        expect(result[0].tagNo).toStrictEqual('PT201609A');
    });
    it('should return ok as status because all checklists are OK or PB', () => {
        expect(getNodeStatus(eleTestData.checkLists, '82EL065-409-B01')).toStrictEqual('OK');
    });

    it('should return correct status for ht test', () => {
        expect(getCircuitTestStatus(CheckListStepTag.HtTest, eleTestData.checkLists)).toStrictEqual(
            'OK'
        );
        expect(
            getCircuitTestStatus(CheckListStepTag.HtCTest, eleTestData.checkLists)
        ).toStrictEqual('OS');
    });
});