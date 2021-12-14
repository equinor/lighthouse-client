import { Button } from '@equinor/eds-core-react';
import { GeneratedForm, useFormSchema, useFormValidation } from '@equinor/Form';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useDataContext } from '../../../../components/CompletionView/src/Context/DataProvider';
import { scopeChangeRequestSchema } from '../../Schemas/scopeChangeRequestSchema';

interface ScopeChangeRequestFormProps {
    closeScrim: () => void;
    setHasUnsavedChanges: (value: boolean) => void;
}

export const ScopeChangeRequestForm = ({
    closeScrim,
    setHasUnsavedChanges,
}: ScopeChangeRequestFormProps): JSX.Element => {
    const formData = useFormSchema(scopeChangeRequestSchema);
    const { isValidForm } = useFormValidation(formData);

    useEffect(() => {
        setHasUnsavedChanges(Object.keys(formData.getChangedData()).length > 0);
    }, [formData]);

    const SubmitButton = () => {
        return (
            <Button disabled={!isValidForm} onClick={onSubmit}>
                Initiate request
            </Button>
        );
    };

    const SaveButton = () => {
        return (
            <Button disabled={!isValidForm} variant={'outlined'} onClick={onSave}>
                Save as draft
            </Button>
        );
    };

    const onSave = () => {
        const payload = {
            ...formData.getData(),
            setAsOpen: false,
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        };
        fetch(
            `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/scope-change-requests`,
            requestOptions
        );
        console.log('Form submitted');
    };

    const onSubmit = () => {
        const payload = {
            ...formData.getData(),
            setAsOpen: true,
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        };
        fetch(
            `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/scope-change-requests`,
            requestOptions
        );
    };

    return (
        <>
            <TitleHeader>
                <h2>Create scope change request</h2>
                <Button variant={'ghost_icon'} onClick={closeScrim}>
                    <h2>x</h2>
                </Button>
            </TitleHeader>
            <GeneratedForm
                formData={formData}
                editMode={false}
                buttons={[SubmitButton, SaveButton]}
            />
        </>
    );
};
const TitleHeader = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;
