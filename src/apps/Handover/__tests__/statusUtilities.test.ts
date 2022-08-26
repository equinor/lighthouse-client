import {
    getHandoverWorkOrderStatus,
    materialOk,
    workOrderAvailable,
    workOrderOk,
} from '../Garden/components/HandoverSidesheet';
import { getStatus } from '../Garden/utility';
import { handoverPackage, handoverWorkorder } from './mockData';

describe('Handover Package status utilities', () => {
    test('getStatus should return RFOC Accepted when having equal counts of mcPkgsCount and mcPkgsRFOCSigned > 0', () => {
        let testPackage = handoverPackage;
        testPackage.mcPkgsCount = 1;
        testPackage.mcPkgsRFOCSigned = 1;
        const status = getStatus(testPackage);
        expect(status).toEqual('RFOC Accepted');
    });

    test("getStatus should return RFOC Rejected when it's not RFOC Accepted and rfocIsRejected = true", () => {
        let testPackage = handoverPackage;
        testPackage.mcPkgsCount = 0;
        testPackage.mcPkgsRFOCSigned = 0;
        testPackage.rfocIsRejected = true;

        const status = getStatus(testPackage);
        expect(status).toEqual('RFOC Rejected');
    });

    test("getStatus should return RFOC Sent when it's not RFOC Rejected and having equal counts of mcPkgsCount and mcPkgsRFOCShipped > 0", () => {
        let testPackage = handoverPackage;
        testPackage.mcPkgsCount = 1;
        testPackage.mcPkgsRFOCSigned = 0;
        testPackage.rfocIsRejected = false;
        testPackage.mcPkgsRFOCShipped = 1;

        const status = getStatus(testPackage);
        expect(status).toEqual('RFOC Sent');
    });

    test("getStatus should return TAC Accepted when it's not RFOC Sent and tacIsAccepted = true", () => {
        let testPackage = handoverPackage;
        testPackage.mcPkgsCount = 0;
        testPackage.mcPkgsRFOCSigned = 0;
        testPackage.rfocIsRejected = false;
        testPackage.mcPkgsRFOCShipped = 0;
        testPackage.tacIsAccepted = true;

        const status = getStatus(testPackage);
        expect(status).toEqual('TAC Accepted');
    });
    test("getStatus should return TAC Sent when it's not TAC Accepted and tacIsShipped = true", () => {
        let testPackage = handoverPackage;
        testPackage.mcPkgsCount = 0;
        testPackage.mcPkgsRFOCSigned = 0;
        testPackage.rfocIsRejected = false;
        testPackage.mcPkgsRFOCShipped = 0;
        testPackage.tacIsAccepted = false;
        testPackage.tacIsShipped = true;

        const status = getStatus(testPackage);
        expect(status).toEqual('TAC Sent');
    });

    test("getStatus should return TAC Rejected when it's not TAC Sent and tacIsRejected = true", () => {
        let testPackage = handoverPackage;
        testPackage.mcPkgsCount = 0;
        testPackage.mcPkgsRFOCSigned = 0;
        testPackage.rfocIsRejected = false;
        testPackage.mcPkgsRFOCShipped = 0;
        testPackage.tacIsAccepted = false;
        testPackage.tacIsShipped = false;
        testPackage.tacIsRejected = true;

        const status = getStatus(testPackage);
        expect(status).toEqual('TAC Rejected');
    });
    test("getStatus should return RFCC Accepted when it's not TAC Rejected and having equal counts for mcPkgsCount and mcPkgsRFCCSigned > 0 ", () => {
        let testPackage = handoverPackage;
        testPackage.mcPkgsCount = 1;
        testPackage.mcPkgsRFOCSigned = 0;
        testPackage.rfocIsRejected = false;
        testPackage.mcPkgsRFOCShipped = 0;
        testPackage.tacIsAccepted = false;
        testPackage.tacIsShipped = false;
        testPackage.tacIsRejected = false;
        testPackage.mcPkgsRFCCSigned = 1;

        const status = getStatus(testPackage);
        expect(status).toEqual('RFCC Accepted');
    });
    test("getStatus should return RFCC Rejected when it's not RFCC Accepted and rfccRejected = true ", () => {
        let testPackage = handoverPackage;
        testPackage.mcPkgsCount = 0;
        testPackage.mcPkgsRFOCSigned = 0;
        testPackage.rfocIsRejected = false;
        testPackage.mcPkgsRFOCShipped = 0;
        testPackage.tacIsAccepted = false;
        testPackage.tacIsShipped = false;
        testPackage.tacIsRejected = false;
        testPackage.mcPkgsRFCCSigned = 0;
        testPackage.rfccIsRejected = true;

        const status = getStatus(testPackage);
        expect(status).toEqual('RFCC Rejected');
    });
    test("getStatus should return RFCC Sent when it's not RFCC Rejected and having equal counts of mcPkgsCount and mcPkgsRFCCShippedCount > 0 ", () => {
        let testPackage = handoverPackage;
        testPackage.mcPkgsCount = 1;
        testPackage.mcPkgsRFOCSigned = 0;
        testPackage.rfocIsRejected = false;
        testPackage.mcPkgsRFOCShipped = 0;
        testPackage.tacIsAccepted = false;
        testPackage.tacIsShipped = false;
        testPackage.tacIsRejected = false;
        testPackage.mcPkgsRFCCSigned = 0;
        testPackage.rfccIsRejected = false;
        testPackage.mcPkgsRFCCShippedCount = 1;

        const status = getStatus(testPackage);
        expect(status).toEqual('RFCC Sent');
    });
    test("getStatus should return RFRC Accepted when it's not RFCC Sent and isDemolition = true and demolitionActualFinishDate exists ", () => {
        let testPackage = handoverPackage;
        testPackage.mcPkgsCount = 0;
        testPackage.mcPkgsRFOCSigned = 0;
        testPackage.rfocIsRejected = false;
        testPackage.mcPkgsRFOCShipped = 0;
        testPackage.tacIsAccepted = false;
        testPackage.tacIsShipped = false;
        testPackage.tacIsRejected = false;
        testPackage.mcPkgsRFCCSigned = 0;
        testPackage.rfccIsRejected = false;
        testPackage.mcPkgsRFCCShippedCount = 0;
        testPackage.isDemolition = true;
        testPackage.demolitionActualFinishDate = '2022-08-26';

        const status = getStatus(testPackage);
        expect(status).toEqual('RFRC Accepted');
    });
    test("getStatus should return RFRC Sent when it's not RFRC Accepted and isDemolition = true and demolitionRFRCShippedDate exists ", () => {
        let testPackage = handoverPackage;
        testPackage.mcPkgsCount = 0;
        testPackage.mcPkgsRFOCSigned = 0;
        testPackage.rfocIsRejected = false;
        testPackage.mcPkgsRFOCShipped = 0;
        testPackage.tacIsAccepted = false;
        testPackage.tacIsShipped = false;
        testPackage.tacIsRejected = false;
        testPackage.mcPkgsRFCCSigned = 0;
        testPackage.rfccIsRejected = false;
        testPackage.mcPkgsRFCCShippedCount = 0;
        testPackage.isDemolition = true;
        testPackage.demolitionActualFinishDate = '';
        testPackage.demolitionRFRCShippedDate = '2022-08-26';

        const status = getStatus(testPackage);
        expect(status).toEqual('RFRC Sent');
    });

    test("getStatus should return DCC Accepted when it's not RFRC Sent and isDemolition = true and demolitionDCCAcceptedDate exists ", () => {
        let testPackage = handoverPackage;
        testPackage.mcPkgsCount = 0;
        testPackage.mcPkgsRFOCSigned = 0;
        testPackage.rfocIsRejected = false;
        testPackage.mcPkgsRFOCShipped = 0;
        testPackage.tacIsAccepted = false;
        testPackage.tacIsShipped = false;
        testPackage.tacIsRejected = false;
        testPackage.mcPkgsRFCCSigned = 0;
        testPackage.rfccIsRejected = false;
        testPackage.mcPkgsRFCCShippedCount = 0;
        testPackage.isDemolition = true;
        testPackage.demolitionActualFinishDate = '';
        testPackage.demolitionRFRCShippedDate = '';
        testPackage.demolitionDCCAcceptedDate = '2022-08-26';

        const status = getStatus(testPackage);
        expect(status).toEqual('DCC Accepted');
    });

    test("getStatus should return DCC Sent when it's not DCC Accepted and isDemolition = true and demolitionActualStartDate exists ", () => {
        let testPackage = handoverPackage;
        testPackage.mcPkgsCount = 0;
        testPackage.mcPkgsRFOCSigned = 0;
        testPackage.rfocIsRejected = false;
        testPackage.mcPkgsRFOCShipped = 0;
        testPackage.tacIsAccepted = false;
        testPackage.tacIsShipped = false;
        testPackage.tacIsRejected = false;
        testPackage.mcPkgsRFCCSigned = 0;
        testPackage.rfccIsRejected = false;
        testPackage.mcPkgsRFCCShippedCount = 0;
        testPackage.isDemolition = true;
        testPackage.demolitionActualFinishDate = '';
        testPackage.demolitionRFRCShippedDate = '';
        testPackage.demolitionDCCAcceptedDate = '';
        testPackage.demolitionActualStartDate = '2022-08-26';

        const status = getStatus(testPackage);
        expect(status).toEqual('DCC Sent');
    });

    test("getStatus should return OS when it's not DCC Sent ", () => {
        let testPackage = handoverPackage;
        testPackage.mcPkgsCount = 0;
        testPackage.mcPkgsRFOCSigned = 0;
        testPackage.rfocIsRejected = false;
        testPackage.mcPkgsRFOCShipped = 0;
        testPackage.tacIsAccepted = false;
        testPackage.tacIsShipped = false;
        testPackage.tacIsRejected = false;
        testPackage.mcPkgsRFCCSigned = 0;
        testPackage.rfccIsRejected = false;
        testPackage.mcPkgsRFCCShippedCount = 0;
        testPackage.isDemolition = true;
        testPackage.demolitionActualFinishDate = '';
        testPackage.demolitionRFRCShippedDate = '';
        testPackage.demolitionDCCAcceptedDate = '';
        testPackage.demolitionActualStartDate = '';

        const status = getStatus(testPackage);
        expect(status).toEqual('OS');
    });
});

describe('Handover sidesheet status utilities', () => {
    test('materialOk should return length 1 when Handover WO has materialStatus = MN', () => {
        let testPackage = handoverWorkorder;
        testPackage.materialStatus = 'MN';
        const mnLength = materialOk(testPackage);
        expect(mnLength).toEqual(1);
    });
    test('materialOk should return length 2 when Handover WO has materialStatus = M12 | M13', () => {
        let testPackage = handoverWorkorder;
        testPackage.materialStatus = 'M12';
        const m12Length = materialOk(testPackage);
        expect(m12Length).toEqual(2);
        testPackage.materialStatus = 'M13';
        const m13Length = materialOk(testPackage);
        expect(m13Length).toEqual(2);
    });
    test('materialOk should return length 0 when Handover WO does not have materialStatus = MN | M12 | M13', () => {
        let testPackage = handoverWorkorder;
        testPackage.materialStatus = 'MX';
        const mxLength = materialOk(testPackage);
        expect(mxLength).toEqual(0);
    });

    test('workOrderOk should return true when workOrderStatus equals W04..W10', () => {
        let testPackage = handoverWorkorder;
        testPackage.workOrderStatus = 'W04';
        const workOrderOkBool = workOrderOk(testPackage);
        expect(workOrderOkBool).toEqual(true);
    });

    test('workOrderAvailable should return true when workOrderStatus equals W03..W10', () => {
        let testPackage = handoverWorkorder;
        testPackage.workOrderStatus = 'W04';
        const workOrderOkBool = workOrderAvailable(testPackage);
        expect(workOrderOkBool).toEqual(true);
    });

    test('getHandoverWorkorderStatus should return WO Finished when projectProgress = 100', () => {
        let testPackage = handoverWorkorder;
        testPackage.projectProgress = '100';
        const status = getHandoverWorkOrderStatus(testPackage);

        expect(status).toEqual('WO Finished');
    });
    test("getHandoverWorkorderStatus should Material and Workorder OK when it's not WO Finished and WO status = W04..W10 and WO mat status = m12 | m13 | mn ", () => {
        let testPackage = handoverWorkorder;
        testPackage.projectProgress = '0';
        testPackage.workOrderStatus = 'M12';
        testPackage.materialStatus = 'mn';
        const status = getHandoverWorkOrderStatus(testPackage);

        expect(status).toEqual('Material and Workorder OK');
    });
});
