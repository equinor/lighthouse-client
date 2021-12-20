import { Button, Icon } from '@equinor/eds-core-react';
import { GeneratedForm, useForm } from '@equinor/Form';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { scopeChangeRequestSchema } from '../../Schemas/scopeChangeRequestSchema';
import { ScopeChangeRequest } from '../../Types/scopeChangeRequest';
import { QueryClient, QueryClientProvider, useMutation, useQuery } from 'react-query';
import { RequestDetailView } from '../DetailView/RequestDetailView';
import { getScopeChangeById } from '../../Api/getScopeChange';
import { postScopeChange } from '../../Api/postScopeChange';

export const FormWrapper = (props) => {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <ScopeChangeRequestForm {...props} />
        </QueryClientProvider>
    );
};

interface ScopeChangeRequestFormProps {
    closeScrim: (force?: boolean) => void;
    setHasUnsavedChanges: (value: boolean) => void;
}

export const ScopeChangeRequestForm = ({
    closeScrim,
    setHasUnsavedChanges,
}: ScopeChangeRequestFormProps): JSX.Element => {
    const formData = useForm<ScopeChangeRequest>(scopeChangeRequestSchema);
    const [scID, setScID] = useState<string | undefined>(undefined);
    const [scopeChange, setScopeChange] = useState<ScopeChangeRequest | undefined>(undefined);
    const { mutate, error } = useMutation(createScopeChange, { retry: 3 });

    const { isLoading, refetch } = useQuery('fetchScopeChange', fetchScopeChange, {
        refetchOnWindowFocus: false,
        enabled: false,
    });

    async function fetchScopeChange() {
        if (scID && !scopeChange && !isLoading) {
            setScopeChange(await getScopeChangeById(scID));
        }
    }

    useEffect(() => {
        refetch();
    }, [scID]);

    async function createScopeChange() {
        setScID(await onSave());
    }

    useEffect(() => {
        setHasUnsavedChanges(formData.getChangedData() !== undefined);
    }, [formData, setHasUnsavedChanges]);

    const SubmitButton = () => {
        return (
            <Button disabled={!formData.isValidForm()} onClick={onSubmit}>
                Initiate request
            </Button>
        );
    };

    const SaveButton = () => {
        return (
            <Button
                disabled={!formData.isValidForm()}
                variant={'outlined'}
                onClick={() => mutate()}
            >
                Save as draft
            </Button>
        );
    };

    const onSave = async (): Promise<string> => {
        return await postScopeChange(formData.data, true);
    };

    const onSubmit = async (): Promise<string> => {
        return await postScopeChange(formData.data, false);
    };

    return (
        <>
            {scopeChange ? (
                <RequestDetailView request={scopeChange} setEditMode={() => console.log()} />
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
