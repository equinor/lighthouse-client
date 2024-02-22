import { Formik, FormikConfig, FormikValues } from 'formik';

type Props = {
    onCancel?: () => void;
} & FormikConfig<FormikValues>;

export const FormContainer = (props: Props): JSX.Element => {
    /*
    TODO: Handle Key Shortcuts
    const handleOnKeyPress: KeyboardEventHandler<HTMLDivElement> = (event) => {
        if (event.key === 'Escape') {
            event.preventDefault();
            setIsCreating(false);
        }
        //Allow shift+enter linebreak
        if (event.key === 'Enter' && !event.shiftKey && name !== '') {
            event.preventDefault();
            createWorkflow();
        }
    };
    */

    return (
        <div tabIndex={0}>
            <Formik {...props} />
        </div>
    );
};
