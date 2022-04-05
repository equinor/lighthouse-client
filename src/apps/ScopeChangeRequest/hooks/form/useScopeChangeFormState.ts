import { useRef, useState } from 'react';
import { useRefresh } from '../../../../components/ParkView/hooks/useRefresh';
import { TypedSelectOption } from '../../api/Search/searchType';
import { ScopeChangeBaseModel } from '../../types/scopeChangeRequest';

export interface ScopeChangeFormState {
    isValid: boolean;
    state: Partial<ScopeChangeFormModel>;
    handleInput: (key: keyof ScopeChangeFormModel, value: unknown) => void;
}

export interface ScopeChangeFormModel extends Omit<ScopeChangeBaseModel, 'changeCategoryId'> {
    attachments: File[];
    references: TypedSelectOption[];
}

const RE_RERENDER_KEYS: (keyof ScopeChangeFormModel)[] = [
    'references',
    'attachments',
    'originSource',
];

const MANDATORY_PROPERTIES: (keyof ScopeChangeFormModel)[] = [
    'title',
    'originSource',
    'description',
    'phase',
    'changeCategory',
];

export function useScopeChangeFormState(
    initialData?: Partial<ScopeChangeFormModel>
): ScopeChangeFormState {
    const formData = useRef<Partial<ScopeChangeFormModel>>(initialData ?? {});
    const refresh = useRefresh();

    /** Will re-render form */
    const [isValid, setIsValid] = useState(false);

    function handleInput(key: keyof ScopeChangeFormModel, value: unknown) {
        if (value === null) {
            /** Removes the object key */
            delete formData.current[key];
        } else {
            formData.current[key] = value as any;
        }

        const formState = checkFormState(formData.current);
        if (isValid !== formState) {
            setIsValid(formState);
        }
        if (RE_RERENDER_KEYS.includes(key)) {
            refresh();
        }
    }

    function checkString(value?: string) {
        return !value || value.length <= 0;
    }

    function checkFormState(request: Partial<ScopeChangeFormModel>): boolean {
        if (MANDATORY_PROPERTIES.every((k) => Object.keys(request).includes(k))) {
            /** Validate content */
            switch (true) {
                case checkString(request.title):
                    return false;

                case checkString(request.phase):
                    return false;

                case checkString(request.changeCategory?.id):
                    return false;

                case checkString(request.description):
                    return false;

                case checkString(request.originSource):
                    return false;
            }

            if (request.originSource !== 'NotApplicable') {
                if (checkString(request.originSourceId)) {
                    return false;
                }
            }

            return true;
        } else {
            return false;
        }
    }

    return {
        state: formData.current,
        isValid: isValid,
        handleInput: handleInput,
    };
}
