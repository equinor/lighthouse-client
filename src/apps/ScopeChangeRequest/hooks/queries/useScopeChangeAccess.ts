import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { OptionRequestResult } from '../../api/ScopeChange/Access/optionsRequestChecker';
import { getRequestAccess } from '../../api/ScopeChange/Access/requestAccess';
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

    const { canUnvoidQuery, canVoidQuery } = scopeChangeQueries.permissionQueries;

    const { data: userCanVoid } = useQuery(canVoidQuery(requestId));
    const { data: userCanUnvoid } = useQuery(canUnvoidQuery(requestId));

    useEffect(() => {
        setAccess((prev) => {
            return { ...prev, canVoid: userCanVoid ?? false };
        });

        setAccess((prev) => {
            return { ...prev, canUnVoid: userCanUnvoid ?? false };
        });

        getRequestAccess(requestId).then((x) =>
            setAccess((prev) => {
                return {
                    ...prev,
                    canDelete: x.canDelete,
                    canGet: x.canGet,
                    canPatch: x.canPatch,
                    canPost: x.canPost,
                    canPut: x.canPut,
                };
            })
        );
    }, [requestId, userCanUnvoid, userCanVoid]);

    return access;
}
