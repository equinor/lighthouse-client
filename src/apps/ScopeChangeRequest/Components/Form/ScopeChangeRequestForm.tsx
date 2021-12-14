import { Button } from '@equinor/eds-core-react';
import { GeneratedForm, useFormSchema, useFormValidation } from '@equinor/Form';
import styled from 'styled-components';
import { scopeChangeRequestSchema } from '../../Schemas/scopeChangeRequestSchema';

interface ScopeChangeRequestFormProps {
    closeScrim: () => void;
}

export const ScopeChangeRequestForm = ({
    closeScrim,
}: ScopeChangeRequestFormProps): JSX.Element => {
    const formData = useFormSchema(scopeChangeRequestSchema);
    const { isValidForm } = useFormValidation(formData);

    const SubmitButton = () => {
        return (
            <Button disabled={!isValidForm} onClick={onSubmit}>
                Submit
            </Button>
        );
    };

    const SaveButton = () => {
        return (
            <Button disabled={!isValidForm} variant={'outlined'} onClick={onSave}>
                Save
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
        )
            .then((response) => response.json())
            .then((data) => console.log(data));
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
        )
            .then((response) => response.json())
            .then((data) => console.log(data));
        console.log('Form submitted');
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
            //events={{ onSubmit, onCancel: () => console.log('cancelled') }}
            />
        </>
    );
};
const TitleHeader = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;
