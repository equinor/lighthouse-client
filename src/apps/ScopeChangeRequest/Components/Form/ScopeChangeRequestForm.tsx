import { Button, Icon } from '@equinor/eds-core-react';
import { GeneratedForm, useForm } from '@equinor/Form';
import { useEffect } from 'react';
import styled from 'styled-components';
import { setActiveScrim } from '../../../../Core/PopupScrim/Functions/setActiveScrim';
import { spawnConfirmationDialog } from '../../../../Core/ConfirmationDialog/Functions/spawnConfirmationDialog';
import { scopeChangeRequestSchema } from '../../Schemas/scopeChangeRequestSchema';
import { RequestDetailView } from '../DetailView/RequestDetailView';

interface ScopeChangeRequestFormProps {
    closeScrim: () => void;
    setHasUnsavedChanges: (value: boolean) => void;
}

export const ScopeChangeRequestForm = ({
    closeScrim,
    setHasUnsavedChanges,
}: ScopeChangeRequestFormProps): JSX.Element => {
    const formData = useForm(scopeChangeRequestSchema);

    useEffect(() => {
        setHasUnsavedChanges(formData.getChangedData() !== undefined);
    }, [formData]);

    const SubmitButton = () => {
        return (
            <Button disabled={!formData.isValidForm()} onClick={onSubmit}>
                Initiate request
            </Button>
        );
    };

    const SaveButton = () => {
        return (
            <Button disabled={!formData.isValidForm()} variant={'outlined'} onClick={onSave}>
                Save as draft
            </Button>
        );
    };

    const onSave = () => {
        const payload = {
            ...formData.data,
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
            ...formData.data,
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
                    <Icon name="close" />
                </Button>
            </TitleHeader>
            <GeneratedForm
                formData={formData}
                editMode={false}
                buttons={[SubmitButton, SaveButton]}
            />
            <Button onClick={() => setActiveScrim(scrimminyCricket)}>Spawn scrim </Button>
            <Button
                onClick={() =>
                    spawnConfirmationDialog('You will lose all data', 'Unsaved changes', () =>
                        formData.set({ title: '123' })
                    )
                }
            >
                Open confirmation
            </Button>
        </>
    );
};
const TitleHeader = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;

const scrimminyCricket = () => {
    return (
        <>
            <TitleHeader>Review scope change request</TitleHeader>
            <RequestDetailView
                request={{
                    id: 'string',
                    title: 'string',
                    description: 'string',
                    phase: 'string',
                    origin: 'string',
                    category: 'string',
                    estimatedChangeHours: 2,
                    actualChangeHours: 0,
                    created: 'string',
                    createdBy: 'string',
                    lastModified: 'tring',
                    lastModifiedBy: 'string',
                    state: 'string',
                    currentWorkflowStep: {
                        id: '',
                        isCompleted: false,
                        isCurrent: false,
                        name: '',
                        order: 0,
                    },
                    workflowSteps: [],
                }}
                setEditMode={() => console.log('hello')}
            />
        </>
    );
};
