export type OptionRequestResult = {
    canGet: boolean;
    canPost: boolean;
    canPut: boolean;
    canPatch: boolean;
    canDelete: boolean;
};

export const checkOptionsRequest = async (
    request: () => Promise<any>
): Promise<OptionRequestResult> => {
    const res = await request();
    const actions = res.headers.get('Allow');
    if (!actions) throw 'An error occurred when getting permissions';

    return {
        canGet: Boolean(actions.includes('GET')),
        canPost: Boolean(actions.includes('POST')),
        canPut: Boolean(actions.includes('PUT')),
        canPatch: Boolean(actions.includes('PATCH')),
        canDelete: Boolean(actions.includes('DELETE')),
    };
};
