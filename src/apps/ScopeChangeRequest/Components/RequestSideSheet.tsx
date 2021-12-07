import useScopeChangeSchema from '../Hooks/useScopeChangeSchema';
import { RequestViewContainer } from './RequestDetailViewContainer';
import { GeneratedForm } from '../../../packages/Form/Components/Form';
import { ScopeChangeRequest } from '../Types/scopeChangeRequest';

interface RequestSideSheetProps {
    request?: ScopeChangeRequest;
    close: () => void;
}

export const RequestSideSheet = ({ request, close }: RequestSideSheetProps): JSX.Element => {
    const formData = useScopeChangeSchema();

    const onSubmit = () => {
        console.log('Form submitted');
        console.log(formData.getChangedData());
        console.log(formData.getData());
        console.log(formData.getValue(formData.fields.guesstimateHrs, 0));
        close();
    };
    const onCancel = () => {
        console.log('Cancelled');
        close();
    };

    return (
        <>
            {request?.created ? (
                <RequestViewContainer close={close} request={request} />
            ) : (
                <GeneratedForm
                    formData={formData}
                    editMode={false}
                    events={{ onSubmit, onCancel }}
                />
            )}
        </>
    );
};
