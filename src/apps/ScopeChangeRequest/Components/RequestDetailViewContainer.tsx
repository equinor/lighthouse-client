import React, { useState } from 'react';
import { RequestDetailView } from './DetailView/RequestDetailView';
import { ScopeChangeRequest } from '../Types/scopeChangeRequest';
import { ScopeChangeRequestEditForm } from './Form/ScopeChangeRequestEditForm';

interface RequestViewContainerProps {
    request: ScopeChangeRequest;
    close: () => void;
    refetch: () => Promise<void>;
}

export const RequestViewContainer = ({
    request,
    refetch,
}: RequestViewContainerProps): JSX.Element => {
    const [editMode, setEditMode] = useState<boolean>(false);

    return (
        <>
            {editMode ? (
                <ScopeChangeRequestEditForm request={request} cancel={() => setEditMode(false)} />
            ) : (
                <RequestDetailView
                    request={request}
                    setEditMode={() => setEditMode(true)}
                    refetch={refetch}
                />
            )}
            {/* <ButtonContainer>
                <Button variant={'ghost_icon'} onClick={() => setEditMode((prev) => !prev)}>
                    Edit
                </Button>
                <Button variant={'ghost_icon'} onClick={() => onDelete()} color={'danger'}>
                    Delete
                </Button>
            </ButtonContainer> */}
        </>
    );
};

// const onDelete = () => {
//     const requestOptions = {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//     };
//     console.log(requestOptions);
//     fetch(
//         `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/scope-change-requests/${request.id}`,
//         requestOptions
//     )
//         .then((response) => response.json())
//         .then((data) => console.log(data));
//     console.log('Form submitted');
//     //getData();
//     setTimeout(getData, 200);
//     close();
// };
