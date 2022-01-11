import { Button, Icon } from '@equinor/eds-core-react';
import { GeneratedForm, useForm } from '@equinor/Form';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { scopeChangeRequestSchema } from '../../Schemas/scopeChangeRequestSchema';
import { ScopeChangeRequest } from '../../Types/scopeChangeRequest';
import { useMutation } from 'react-query';
import { getScopeChangeById, postScopeChange } from '../../Api/';
import { openSidesheet } from '@equinor/sidesheet';
import { ScopeChangeSideSheet } from '../CustomSidesheet';
import { Field } from '../DetailView/Components/Field';
import { Upload } from '../Upload';
import { tokens } from '@equinor/eds-tokens';

interface ScopeChangeRequestFormProps {
    closeScrim: (force?: boolean) => void;
    setHasUnsavedChanges: (value: boolean) => void;
}

interface CreateScopeChangeProps {
    draft: boolean;
}

export const ScopeChangeRequestForm = ({
    closeScrim,
    setHasUnsavedChanges,
}: ScopeChangeRequestFormProps): JSX.Element => {
    const formData = useForm<ScopeChangeRequest>(scopeChangeRequestSchema);
    const [scID, setScID] = useState<string | undefined>(undefined);

    const createScopeChangeMutation = async ({ draft }: CreateScopeChangeProps) => {
        formData.reset();
        setScID(await postScopeChange(formData.data, draft));
    };

    const { mutate, error } = useMutation(createScopeChangeMutation, {
        retry: 2,
        retryDelay: 2,
    });

    const redirect = async () => {
        if (!scID) return;

        openSidesheet(ScopeChangeSideSheet, await getScopeChangeById(scID));
        closeScrim();
    };

    useEffect(() => {
        if (scID) {
            redirect();
        }
    }, [scID]);

    useEffect(() => {
        setHasUnsavedChanges(formData.getChangedData() !== undefined);
    }, [formData, setHasUnsavedChanges]);

    const SubmitButton = () => {
        return (
            <Button disabled={!formData.isValidForm()} onClick={() => mutate({ draft: false })}>
                Initiate request
            </Button>
        );
    };

    const SaveButton = () => {
        return (
            <Button
                disabled={!formData.isValidForm()}
                variant={'outlined'}
                onClick={() => mutate({ draft: true })}
            >
                Save as draft
            </Button>
        );
    };

    return (
        <FormContainer>
            <TitleHeader>
                <span style={{ fontSize: '28px' }}>Create scope change request</span>
                <Icon
                    onClick={() => closeScrim()}
                    name="close"
                    color={tokens.colors.interactive.primary__resting.hex}
                />
            </TitleHeader>
            <GeneratedForm
                formData={formData}
                editMode={false}
                buttons={[SubmitButton, SaveButton]}
            />
            <Field label="Attachments" value={<Upload />} />
            {error && <p> Something went wrong, please check your connection and try again</p>}
        </FormContainer>
    );
};
const TitleHeader = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`;

const FormContainer = styled.div``;
