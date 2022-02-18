import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { canUnVoid, canVoid } from '../Api/ScopeChange/Access/canVoid';
import { OptionRequestResult } from '../Api/ScopeChange/Access/optionsRequestChecker';
import { getRequestAccess } from '../Api/ScopeChange/Access/requestAccess';
import { QueryKeys } from '../Enums/queryKeys';
import { CacheTime } from '../Enums/cacheTimes';

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

    const { data: userCanVoid } = useQuery([QueryKeys.Void], () => canVoid(requestId), {
        cacheTime: CacheTime.FiveMinutes,
        staleTime: CacheTime.FiveMinutes,
    });

    const { data: userCanUnvoid } = useQuery([QueryKeys.Unvoid], () => canUnVoid(requestId), {
        cacheTime: CacheTime.FiveMinutes,
        staleTime: CacheTime.FiveMinutes,
    });

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
