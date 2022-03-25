/**
 * Query keys for ProCoSys
 * @returns
 */

interface ProCoSysQueryKeys {
    baseKey: string[];
    functionalRoles: string[];
    disciplines: string[];
    systems: string[];
    area: (areaId: string) => string[];
    tag: (tagId: string) => string[];
    commPkg: (commPkgId: string) => string[];
}

export function proCoSysQueryKeys(): ProCoSysQueryKeys {
    const baseKey = ['ProCoSys'];

    const proCoSysQueryKeys = {
        baseKey: baseKey,
        functionalRoles: [...baseKey, 'functionalRoles'],
        disciplines: [...baseKey, 'disciplines'],
        systems: [...baseKey, 'systems'],
        area: (areaId: string) => [...baseKey, 'area', areaId],
        tag: (tagId: string) => [...baseKey, 'tag', tagId],
        commPkg: (commPkgId: string) => [...baseKey, 'commPkg', commPkgId],
    };

    return proCoSysQueryKeys;
}
