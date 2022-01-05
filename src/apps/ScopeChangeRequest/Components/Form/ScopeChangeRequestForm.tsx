import { Button, Icon } from '@equinor/eds-core-react';
import { GeneratedForm, useForm } from '@equinor/Form';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { scopeChangeRequestSchema } from '../../Schemas/scopeChangeRequestSchema';
import { ScopeChangeRequest } from '../../Types/scopeChangeRequest';
import { useMutation, useQuery } from 'react-query';
import { RequestDetailView } from '../DetailView/RequestDetailView';
import { getScopeChangeById, postScopeChange } from '../../Api/';

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
    const [scopeChange, setScopeChange] = useState<ScopeChangeRequest | undefined>(undefined);

    const createScopeChangeMutation = async ({ draft }: CreateScopeChangeProps) => {
        formData.reset();
        setScID(await postScopeChange(formData.data, draft));
    };

    const getScopeChangeQuery = async () => {
        if (scID) {
            setScopeChange(await getScopeChangeById(scID));
        }
    };

    const { mutate, error } = useMutation(createScopeChangeMutation, {
        retry: 2,
        retryDelay: 2,
        onSuccess: async () => {
            refetch();
        },
    });

    const { refetch } = useQuery('fetchScopeChange', getScopeChangeQuery, {
        refetchOnWindowFocus: false,
        enabled: false,
        cacheTime: 10,
    });

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

    const refetchScopeChange = useCallback(async () => {
        refetch();
    }, [refetch]);

    return (
        <>
            {scopeChange ? (
                <RequestDetailView
                    request={scopeChange}
                    setEditMode={() => console.log()}
                    refetch={refetchScopeChange}
                />
            ) : (
                <>
                    <TitleHeader>
                        <h2>Create scope change request</h2>
                        <Icon onClick={() => closeScrim()} name="close" />
                    </TitleHeader>
                    <GeneratedForm
                        formData={formData}
                        editMode={false}
                        buttons={[SubmitButton, SaveButton]}
                    />
                    {error && (
                        <p> Something went wrong, please check your connection and try again</p>
                    )}
                </>
            )}
        </>
    );
};
const TitleHeader = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;
