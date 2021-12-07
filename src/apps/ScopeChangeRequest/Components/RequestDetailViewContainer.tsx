import React, { useState } from 'react';
import { GeneratedForm } from '../../../packages/Form/Components/Form';
import { RequestDetailView } from './DetailView/RequestDetailView';
import useScopeChangeSchema from '../Hooks/useScopeChangeSchema';
import { ScopeChangeRequest } from '../Types/scopeChangeRequest';

interface RequestViewContainerProps {
    request: ScopeChangeRequest;
    close: () => void;
}

export const RequestViewContainer = ({
    request,
    close,
}: RequestViewContainerProps): JSX.Element => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const formData = useScopeChangeSchema(request);

    const onSubmit = () => {
        console.log(formData);
    };
    const onCancel = () => {
        console.log('Cancelled');
        close();
    };

    return (
        <>
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
