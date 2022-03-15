import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIsMutating, useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { ClickableIcon } from '../../../../components/Icon/ClickableIcon';
import { clearActiveFactory } from '../../../../Core/DataFactory/Functions/clearActiveFactory';
import { openSidesheet } from '../../../../packages/Sidesheet/Functions';
import {
    getScopeChangeById,
    postScopeChange,
    uploadAttachment,
} from '../../Api/ScopeChange/Request';
import { TypedSelectOption } from '../../Api/Search/searchType';
import { scopeChangeQueryKeys } from '../../Keys/scopeChangeQueryKeys';
import { OriginType, ScopeChangeRequest } from '../../Types/scopeChangeRequest';
import { Upload } from '../Attachments/Upload';
import { ScopeChangeSideSheet } from '../Sidesheet/ScopeChangeSidesheet';
import { ScopeChangeForm } from './Form';
import { mergeRelatedObjects } from './SelectUtils';

const CONTROLLED_COMPONENT: Partial<ScopeChangeRequest> = {
    guesstimateDescription: '',
    guesstimateHours: 0,
    category: '',
    title: '',
    description: '',
    originSource: '' as OriginType,
    originSourceId: '',
    phase: '',
};

interface ScopeChangeRequestCreateFormProps {
    closeScrim: () => void;
}

export function ScopeChangeRequestCreateForm({
    closeScrim,
}: ScopeChangeRequestCreateFormProps): JSX.Element {
    const [relatedObjects, setRelatedObjects] = useState<TypedSelectOption[]>([]);
    const [attachments, setAttachments] = useState<File[]>([]);
    const formHandler = useForm<ScopeChangeRequest>({ defaultValues: CONTROLLED_COMPONENT });
    const { invalidateQueries } = useQueryClient();

    async function handleSubmit(draft: boolean, data: ScopeChangeRequest) {
        const scopeChange = mergeRelatedObjects(relatedObjects, data);
        const requestId = await createScopeChangeMutation({
            draft: draft,
            scopeChange: scopeChange,
        });
        if (requestId) {
            const keys = scopeChangeQueryKeys(requestId);

            attachments.forEach(async (attachment) => {
                await uploadAttachmentMutation({ file: attachment, requestId: requestId });
                invalidateQueries(keys.baseKey);
            });
            await onCreated(requestId);
            invalidateQueries();
        }
    }

    const { mutateAsync: uploadAttachmentMutation } = useMutation(uploadAttachment, {
        retry: 2,
        retryDelay: 2,
    });
    const { mutateAsync: createScopeChangeMutation } = useMutation(
        ['scopechange'],
        postScopeChange,
        {
            retryDelay: 1000,
        }
    );

    const isMutating = useIsMutating(['scopechange']) > 0;

    return (
        <>
            <Header>
                <Title>Create scope change request</Title>
                <ClickableIcon name="close" onClick={closeScrim} />
            </Header>
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
                <Upload attachments={attachments} setAttachments={setAttachments} />
            </ScopeChangeForm>
        </>
    );
}

async function onCreated(scopeChangeId: string) {
    openSidesheet(ScopeChangeSideSheet, await getScopeChangeById(scopeChangeId));
    clearActiveFactory();
}

export const Title = styled.h2`
    font-size: 28px;
    line-height: 35px;
    font-weight: 400;
`;

export const Header = styled.div`
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
