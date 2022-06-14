import { isProduction } from '@equinor/lighthouse-portal-client';

interface ProCoSysUrls {
    getCommPkgUrl: (commPkgId: string | number) => string;
    getTagUrl: (tagId: string | number) => string;
    getSystemUrl: (systemId: string | number) => string;
    getPunchUrl: (punchId: string | number) => string;
    getDocumentUrl: (documentId: string | number) => string;
    getWorkOrderUrl: (workOrderId: string | number) => string;
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
};
