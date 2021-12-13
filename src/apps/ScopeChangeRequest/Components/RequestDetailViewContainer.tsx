import React, { useState } from 'react';
import { GeneratedForm } from '../../../packages/Form/src/Components/Form';
import { useFormSchema } from '../../../packages/Form/index';
import { RequestDetailView } from './DetailView/RequestDetailView';
import { ScopeChangeRequest } from '../Types/scopeChangeRequest';
import { Button } from '@equinor/eds-core-react';
import { useDataContext } from '../../../components/CompletionView/src/Context/DataProvider';
import { scopeChangeRequestSchema } from '../Schemas/scopeChangeRequestSchema';
import styled from 'styled-components';

interface RequestViewContainerProps {
    request: ScopeChangeRequest;
    close: () => void;
}

export const RequestViewContainer = ({
    request,
    close,
}: RequestViewContainerProps): JSX.Element => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const formData = useFormSchema(scopeChangeRequestSchema, request);
    const { getData } = useDataContext();

    const onSubmit = () => {
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData.getData()),
        };
        fetch(
            `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/scope-change-requests/${request.id}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => console.log(data));
        setTimeout(getData, 3000);
        console.log('Form submitted');
        close();
    };
    const onCancel = () => {
        setEditMode(false);
        //close();
    };

    const onDelete = () => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        console.log(requestOptions);
        fetch(
            `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/scope-change-requests/${request.id}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => console.log(data));
        console.log('Form submitted');
        //getData();
        setTimeout(getData, 200);
        close();
    };

    return (
        <>
            <ButtonContainer>
                <Button variant={'ghost_icon'} onClick={() => setEditMode((prev) => !prev)}>
                    Edit
                </Button>
                {/* <Button variant={'ghost_icon'} onClick={() => onDelete()} color={'danger'}>
                    Delete
                </Button> */}
            </ButtonContainer>
            {editMode ? (
                <GeneratedForm
                    formData={formData}
                    editMode={true}
                    events={{ onCancel, onSubmit }}
                />
            ) : (
                <RequestDetailView request={request} />
            )}
        </>
    );
};

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding-right: 2em;
`;
