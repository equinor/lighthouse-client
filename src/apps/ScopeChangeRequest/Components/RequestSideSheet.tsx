import { RequestViewContainer } from './RequestDetailViewContainer';
import { GeneratedForm } from '../../../packages/Form/src/Components/Form';
import { ScopeChangeRequest } from '../Types/scopeChangeRequest';
import { useDataContext } from '../../../components/CompletionView/src/Context/DataProvider';
import { useFormSchema } from '@equinor/form';
import { scopeChangeRequestSchema } from '../Schemas/scopeChangeRequestSchema';

interface RequestSideSheetProps {
    request?: ScopeChangeRequest;
    close: () => void;
}

export const RequestSideSheet = ({ request, close }: RequestSideSheetProps): JSX.Element => {
    const newScopeChange = useFormSchema(scopeChangeRequestSchema);
    const { getData } = useDataContext();

    const onSubmit = () => {
        console.log(newScopeChange);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newScopeChange.getData()),
        };
        fetch(
            'https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/scope-change-requests',
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => console.log(data));
        console.log('Form submitted');
        setTimeout(getData, 4000);
        close();
    };
    const onCancel = () => {
        close();
    };

    return (
        <>
            <GeneratedForm
                formData={newScopeChange}
                editMode={false}
                events={{ onSubmit, onCancel }}
            />
            {request?.id ? (
                <RequestViewContainer close={close} request={request} />
            ) : (
                <GeneratedForm
                    formData={newScopeChange}
                    editMode={false}
                    events={{ onSubmit, onCancel }}
                />
            )}
        </>
    );
};
