import { isProduction } from '@equinor/lighthouse-portal-client';

interface ProCoSysUrls {
    getCommPkgUrl: (commPkgId: string | number) => string;
    getTagUrl: (tagId: string | number) => string;
    getSystemUrl: (systemId: string | number) => string;
    getPunchUrl: (punchId: string | number) => string;
}

const getProCoSysUrl = () =>
    `https://${isProduction() ? 'procosys' : 'procosystest'}.equinor.com/JOHAN_CASTBERG`;

export const proCoSysUrls: ProCoSysUrls = {
    getTagUrl: (tagId: string | number): string => `${getProCoSysUrl()}/Completion#Tag|${tagId}`,
    getSystemUrl: (systemId: string | number) =>
        `${getProCoSysUrl()}/Completion#System|${systemId}`,
    getPunchUrl: (punchId: string | number) =>
        `${getProCoSysUrl()}/Completion#PunchListItem|${punchId}`,
    getCommPkgUrl: (commPkgId: string | number) =>
        `${getProCoSysUrl()}/Completion#CommPkg|${commPkgId}`,
};
