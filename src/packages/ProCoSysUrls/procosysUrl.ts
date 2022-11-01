//TODO: No alias import because it will break tests
import { isProduction } from '../../Core/Client/Functions/Settings';

interface ProCoSysUrls {
    getCommPkgUrl: (commPkgId: string | number) => string;
    getTagUrl: (tagId: string | number) => string;
    getSystemUrl: (systemId: string | number) => string;
    getPunchUrl: (punchId: string | number) => string;
    getDocumentUrl: (documentId: string | number) => string;
    getWorkOrderUrl: (workOrderId: string | number) => string;
    getMcUrl: (mcId: string | number) => string;
    getFormTypeUrl: (checklistId: string | number) => string;
}

const getProCoSysUrl = () =>
    `https://${isProduction() ? 'procosys' : 'procosystest'}.equinor.com/JOHAN_CASTBERG`;

export const proCoSysUrls: ProCoSysUrls = {
    getTagUrl: (tagId) => `${getProCoSysUrl()}/Completion#Tag|${tagId}`,
    getSystemUrl: (systemId) => `${getProCoSysUrl()}/Completion#System|${systemId}`,
    getPunchUrl: (punchId) => `${getProCoSysUrl()}/Completion#PunchListItem|${punchId}`,
    getCommPkgUrl: (commPkgId) => `${getProCoSysUrl()}/Completion#CommPkg|${commPkgId}`,
    getDocumentUrl: (documentId) => `${getProCoSysUrl()}/Documents/Document#id=${documentId}`,
    getWorkOrderUrl: (workOrderId) => `${getProCoSysUrl()}/WorkOrders/WorkOrder#id=${workOrderId}`,
    getMcUrl: (mcId) => `${getProCoSysUrl()}/Completion#McPkg|${mcId}`,
    getFormTypeUrl: (checklistId) =>
        `${getProCoSysUrl()}/Completion/TagCheck/Form/Main/Index?id=${checklistId}`,
};
