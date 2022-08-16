import {
    getCableChildren,
    getCircuitChildren,
    getElectroTestStatus,
    getNodeStatus,
} from '../Components/Electro/electroViewHelpers';
import { eleTestData } from '../Mock/mockData';
import { CheckListStepTag } from '../Types/drcEnums';

describe('electroViewHelpers tests', () => {
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
    it('should return ok as status', () => {
        expect(getNodeStatus(eleTestData.checkLists, '82EL065-409-B01')).toStrictEqual('OK');
    });

    it('should return correct status for ht test', () => {
        expect(getElectroTestStatus(CheckListStepTag.HtTest, eleTestData.checkLists)).toStrictEqual(
            'OK'
        );
        expect(
            getElectroTestStatus(CheckListStepTag.HtCTest, eleTestData.checkLists)
        ).toStrictEqual('OS');
    });
});
