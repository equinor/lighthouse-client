/**
 * Hook for generating queryKeys
 * @param requestId
 * @returns
 */
export function useProcosysQueryKeyGen() {
    const baseKey = ['procosys'];

    const procosysKeys = {
        baseKey: baseKey,
        disciplinesKey: [...baseKey, 'disciplines'],
        systemsKey: [...baseKey, 'systems'],
        functionalRolesKey: [...baseKey, 'functionalRoles'],
    };

    return procosysKeys;
}
