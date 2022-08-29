import { getStatus } from '../Garden/utility';
import { handoverPackage } from '../Mock/mockData';

describe('Handover Package status utility getStatus', () => {
    it('should return RFOC Accepted when having equal counts of mcPkgsCount and mcPkgsRFOCSigned > 0', () => {
        let testPackage = handoverPackage;
        testPackage.mcPkgsCount = 1;
        testPackage.mcPkgsRFOCSigned = 1;
        const status = getStatus(testPackage);
        expect(status).toEqual('RFOC Accepted');
    });

    it("should return RFOC Rejected when it's not RFOC Accepted and rfocIsRejected = true", () => {
        let testPackage = handoverPackage;
        testPackage.mcPkgsCount = 0;
        testPackage.mcPkgsRFOCSigned = 0;
        testPackage.rfocIsRejected = true;

        const status = getStatus(testPackage);
        expect(status).toEqual('RFOC Rejected');
    });

    it("should return RFOC Sent when it's not RFOC Rejected and having equal counts of mcPkgsCount and mcPkgsRFOCShipped > 0", () => {
        let testPackage = handoverPackage;
        testPackage.mcPkgsCount = 1;
        testPackage.mcPkgsRFOCSigned = 0;
        testPackage.rfocIsRejected = false;
        testPackage.mcPkgsRFOCShipped = 1;

        const status = getStatus(testPackage);
        expect(status).toEqual('RFOC Sent');
    });

    it("should return TAC Accepted when it's not RFOC Sent and tacIsAccepted = true", () => {
        let testPackage = handoverPackage;
        testPackage.mcPkgsCount = 0;
        testPackage.mcPkgsRFOCSigned = 0;
        testPackage.rfocIsRejected = false;
        testPackage.mcPkgsRFOCShipped = 0;
        testPackage.tacIsAccepted = true;

        const status = getStatus(testPackage);
        expect(status).toEqual('TAC Accepted');
    });
    it("should return TAC Sent when it's not TAC Accepted and tacIsShipped = true", () => {
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

    it("should return TAC Rejected when it's not TAC Sent and tacIsRejected = true", () => {
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
    it("should return RFCC Accepted when it's not TAC Rejected and having equal counts for mcPkgsCount and mcPkgsRFCCSigned > 0 ", () => {
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
    it("should return RFCC Rejected when it's not RFCC Accepted and rfccRejected = true ", () => {
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
    it("should return RFCC Sent when it's not RFCC Rejected and having equal counts of mcPkgsCount and mcPkgsRFCCShippedCount > 0 ", () => {
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
    it("should return RFRC Accepted when it's not RFCC Sent and isDemolition = true and demolitionActualFinishDate exists ", () => {
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
    it("should return RFRC Sent when it's not RFRC Accepted and isDemolition = true and demolitionRFRCShippedDate exists ", () => {
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

    it("should return DCC Accepted when it's not RFRC Sent and isDemolition = true and demolitionDCCAcceptedDate exists ", () => {
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

    it("should return DCC Sent when it's not DCC Accepted and isDemolition = true and demolitionActualStartDate exists ", () => {
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

    it("should return OS when it's not DCC Sent ", () => {
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
