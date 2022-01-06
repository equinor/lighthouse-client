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
        </>
    );
};
