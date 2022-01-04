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
    const onSave = async (): Promise<void> => {
        setScID(await postScopeChange(formData.data, true));
    };
    const onSubmit = async (): Promise<void> => {
        setScID(await postScopeChange(formData.data, false));
    };
    const { mutate: createScopeChangeAsDraft, error } = useMutation(onSave);
    const { mutate: createScopeChangeAsOpen } = useMutation(onSubmit, {
        retry: 2,
    });

    const { isLoading, refetch } = useQuery('fetchScopeChange', fetchScopeChange, {
        refetchOnWindowFocus: false,
        enabled: false,
    });

    async function fetchScopeChange() {
        if (scID && !scopeChange && !isLoading) {
            formData.reset();
            setScopeChange(await getScopeChangeById(scID));
        }
    }

    useEffect(() => {
        refetch();
    }, [scID]);

    useEffect(() => {
        setHasUnsavedChanges(formData.getChangedData() !== undefined);
    }, [formData, setHasUnsavedChanges]);

    const SubmitButton = () => {
        return (
            <Button disabled={!formData.isValidForm()} onClick={() => createScopeChangeAsOpen()}>
                Initiate request
            </Button>
        );
    };

    const SaveButton = () => {
        return (
            <Button
                disabled={!formData.isValidForm()}
                variant={'outlined'}
                onClick={() => createScopeChangeAsDraft()}
            >
                Save as draft
            </Button>
        );
    };

    async function refetchScopeChange(): Promise<void> {
        if (scID) {
            console.log('Refetching scope change');
            setScopeChange(await getScopeChangeById(scID));
        }
    }
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
