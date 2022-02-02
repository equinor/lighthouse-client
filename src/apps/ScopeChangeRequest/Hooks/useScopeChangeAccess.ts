import { useEffect, useState } from 'react';
import { OptionRequestResult } from '../Api/ScopeChange/Access/optionsRequestChecker';
import { getRequestAccess } from '../Api/ScopeChange/Access/requestAccess';

export function useScopeChangeAccess(requestId: string): OptionRequestResult {
    const [access, setAccess] = useState<OptionRequestResult>({
        canDelete: false,
        canGet: false,
        canPatch: false,
        canPost: false,
        canPut: false,
    });

    useEffect(() => {
        getRequestAccess(requestId).then((x) => setAccess(x));
    }, [requestId]);

    return access;
}
