import { useMemo } from 'react';
import { Form } from '../Types/form';

export const useFormValidation = (
    formData: Form<any>,
    editMode: boolean
): { isValidForm: boolean } => {
    const isValidForm: boolean = useMemo((): boolean => {
        if (editMode) {
            if (formData.isAllValid() && Object.keys(formData.getChangedData()).length !== 0) {
                return true;
            }
        }
        if (formData.isAllValid() && formData.isAllDirty(true)) {
            return true;
        }
        return false;
    }, [editMode, formData]);

    return { isValidForm };
};
