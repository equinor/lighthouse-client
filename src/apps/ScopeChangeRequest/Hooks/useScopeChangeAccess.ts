import { useEffect, useState } from 'react';
import { canVoid } from '../Api/ScopeChange/Access/canVoid';
import { OptionRequestResult } from '../Api/ScopeChange/Access/optionsRequestChecker';
import { getRequestAccess } from '../Api/ScopeChange/Access/requestAccess';

interface ScopeChangeAccess extends OptionRequestResult {
    canVoid: boolean;
}

export function useScopeChangeAccess(requestId: string): ScopeChangeAccess {
    const [access, setAccess] = useState<ScopeChangeAccess>({
        canDelete: false,
        canGet: false,
        canPatch: false,
        canPost: false,
        canPut: false,
        canVoid: false,
    });

    useEffect(() => {
        canVoid(requestId).then((x) =>
            setAccess((prev) => {
                return { ...prev, canVoid: x };
            })
        );
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
    }, [requestId]);

    return access;
}
