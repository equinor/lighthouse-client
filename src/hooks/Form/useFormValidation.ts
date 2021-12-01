import { useMemo } from 'react';
import { Form } from './useFormSchema';

export const useFormValidation = (formData: Form<any>) => {
    const isValidForm: boolean = useMemo((): boolean => {
        if (formData.isAllValid() && formData.isAllDirty(true)) {
            return true;
        }
        return false;
    }, [formData]);

    return { isValidForm };
};
