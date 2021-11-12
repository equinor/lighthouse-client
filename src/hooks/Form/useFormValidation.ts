import { useMemo, useState } from "react";
import { Form } from "./useFormSchema";

export const useFormValidation = (formData: Form<any>) => {

    const isValidForm: boolean = useMemo((): boolean => {
        const requiredFieldsOnly = true;
        if (!formData.isAllValid() || !formData.isAllDirty(requiredFieldsOnly)) return true;
        return false;
    }, [formData]);

    return { isValidForm };
}