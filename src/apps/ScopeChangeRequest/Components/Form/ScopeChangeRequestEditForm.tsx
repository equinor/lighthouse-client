import { useEffect, useState } from 'react';
import { patchScopeChange } from '../../Api/ScopeChange/Request';
import { ServerError } from '../../Types/ScopeChange/ServerError';
import { TypedSelectOption } from '../../Api/Search/searchType';
import { useScopeChangeMutation } from '../../Hooks/React-Query/useScopechangeMutation';
import { ScopeChangeRequest } from '../../Types/scopeChangeRequest';
import { useScopeChangeContext } from '../Sidesheet/Context/useScopeChangeAccessContext';
import { HotUpload } from '../Attachments/HotUpload';
import { useQueryCacheLookup } from '../../Hooks/React-Query/useQueryCacheLookup';

import { scopeChangeMutationKeys } from '../../Keys/scopeChangeMutationKeys';
import { proCoSysQueryKeys } from '../../Keys/proCoSysQueryKeys';
import { stidQueryKeys } from '../../Keys/STIDQueryKeys';
import { ScopeChangeForm } from './Form';
import { useForm } from 'react-hook-form';
import { mergeRelatedObjects } from './SelectUtils';
import { resolveRelatedObjects } from './resolveRelatedObjects';
import { useIsMutating } from 'react-query';

interface ScopeChangeRequestEditFormProps {
    request: ScopeChangeRequest;
    close: () => void;
}

export const ScopeChangeRequestEditForm = ({
    request,
    close,
}: ScopeChangeRequestEditFormProps): JSX.Element => {
    const [relatedObjects, setRelatedObjects] = useState<TypedSelectOption[]>([]);
    const { addToQueryCache } = useQueryCacheLookup();

    const referencesKeys = proCoSysQueryKeys();
    const stid = stidQueryKeys();
    const { patchKey } = scopeChangeMutationKeys(request.id);

    // const { mutateAsync: removeAttachment } = useScopeChangeMutation(
    //     request.id,
    //     deleteAttachmentKey,
    //     deleteAttachment
    // );

    useEffect(() => {
        setRelatedObjects([]);
        resolveRelatedObjects(
            request,
            setRelatedObjects,
            { ...referencesKeys, ...stid },
            addToQueryCache
        );
    }, [request]);

    useEffect(() => {
        return () => {
            request.state !== 'Draft' && close();
        };
    }, [request.id]);

    const { setErrorMessage } = useScopeChangeContext();

    const { mutateAsync: patchScopeChangeMutation } = useScopeChangeMutation(
        request.id,
        patchKey,
        patchScopeChange,
        {
            onError: (e: ServerError) => setErrorMessage(e),
        }
    );

    async function handleSubmit(draft: boolean, data: ScopeChangeRequest) {
        const scopeChange = mergeRelatedObjects(relatedObjects, data);
        await patchScopeChangeMutation({ request: scopeChange, setAsOpen: !draft });
    }

    const formHandler = useForm<ScopeChangeRequest>({ defaultValues: request });

    const isMutating = useIsMutating(patchKey) > 0;

    return (
        <>
            <ScopeChangeForm
                isMutating={isMutating}
                formHandler={formHandler}
                onSubmit={(data) => handleSubmit(false, data)}
                onSave={(data) => handleSubmit(true, data)}
                relatedObjects={{
                    setRelatedObjects: setRelatedObjects,
                    relatedObjects: relatedObjects,
                }}
            >
                <HotUpload />
            </ScopeChangeForm>
        </>
    );
};

// const AttachmentName = styled.a`
//     color: ${tokens.colors.interactive.primary__resting.rgba};
//     cursor: 'pointer';
//     text-decoration: 'none';
// `;

// const Inline = styled.span`
//     display: flex;
//     align-items: center;
// `;

// const AttachmentsList = styled.div`
//     display: flex;
//     flex-direction: row;
//     justify-content: space-between;
//     margin: 0.5em 0em;
//     font-size: 16px;
//     align-items: center;
// `;

// const BoldHeader = styled.h5`
//     font-size: 18px;
//     line-height: 24px;
//     font-weight: 500;
// `;
