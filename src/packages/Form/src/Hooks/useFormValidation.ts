import { useMemo } from 'react';
import { Form } from '../Types/form';

export const useFormValidation = (formData: Form<any>): { isValidForm: boolean } => {
    const isValidForm: boolean = useMemo((): boolean => {
        if (formData.isAllValid() && Object.keys(formData.getChangedData()).length > 0) {
            return true;
        }
        return false;
    }, [formData]);

    return { isValidForm };
};
