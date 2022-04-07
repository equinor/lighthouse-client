import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { OptionRequestResult } from '../../api/ScopeChange/Access/optionsRequestChecker';
import { scopeChangeQueries } from '../../keys/queries';

interface ScopeChangeAccess extends OptionRequestResult {
    canVoid: boolean;
    canUnVoid: boolean;
}

export function useScopeChangeAccess(requestId: string): ScopeChangeAccess {
    const [access, setAccess] = useState<ScopeChangeAccess>({
        canDelete: false,
        canGet: false,
        canPatch: false,
        canPost: false,
        canPut: false,
        canVoid: false,
        canUnVoid: false,
    });

    const { canUnvoidQuery, canVoidQuery, permissionsQuery } = scopeChangeQueries.permissionQueries;

    const { data: userCanVoid } = useQuery(canVoidQuery(requestId));
    const { data: userCanUnvoid } = useQuery(canUnvoidQuery(requestId));

    const { data: requestAccess } = useQuery(permissionsQuery(requestId));

    useEffect(() => {
        setAccess({
            canDelete: Boolean(requestAccess?.canDelete),
            canGet: Boolean(requestAccess?.canGet),
            canPatch: Boolean(requestAccess?.canPatch),
            canPost: Boolean(requestAccess?.canPost),
            canPut: Boolean(requestAccess?.canPut),
            canUnVoid: Boolean(userCanUnvoid),
            canVoid: Boolean(userCanVoid),
        });
    }, [
        requestAccess?.canDelete,
        requestAccess?.canGet,
        requestAccess?.canPatch,
        requestAccess?.canPost,
        requestAccess?.canPut,
        requestId,
        userCanUnvoid,
        userCanVoid,
    ]);

    return access;
}
