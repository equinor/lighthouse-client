import { Formik, FormikConfig, FormikValues } from 'formik';

type Props = {
    onCancel?: () => void;
} & FormikConfig<FormikValues>;

export const FormContainer = (props: Props): JSX.Element => {
    return (
        <div tabIndex={0}>
            <Formik {...props} />
        </div>
    );
};
