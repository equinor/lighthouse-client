import { useEffect, useState } from 'react';
import { canUnVoid, canVoid, getRequestAccess } from '../Api/Access';
import { OptionRequestResult } from '../Api/Access/optionsRequestChecker';

interface ReleaseControlAccess extends OptionRequestResult {
    canVoid: boolean;
    canUnVoid: boolean;
}

export function useReleaseControlAccess(processId: string): ReleaseControlAccess {
    const [access, setAccess] = useState<ReleaseControlAccess>({
        canDelete: false,
        canGet: false,
        canPatch: false,
        canPost: false,
        canPut: false,
        canVoid: false,
        canUnVoid: false,
    });

    useEffect(() => {
        canVoid(processId).then((x) =>
            setAccess((prev) => {
                return { ...prev, canVoid: x };
            })
        );

        canUnVoid(processId).then((x) =>
            setAccess((prev) => {
                return { ...prev, canUnVoid: x };
            })
        );
        getRequestAccess(processId).then((x) =>
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
    }, [processId]);

    return access;
}
