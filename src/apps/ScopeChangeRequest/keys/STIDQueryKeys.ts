interface STIDQueryKeys {
    baseKey: string[];
    document: (docNo: string) => string[];
}

export function stidQueryKeys(): STIDQueryKeys {
    const baseKey = ['STID'];

    return {
        baseKey: baseKey,
        document: (docNo: string) => [...baseKey, 'document', docNo],
    };
}
