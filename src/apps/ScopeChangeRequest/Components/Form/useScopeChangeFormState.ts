import { useRef, useState } from 'react';
import { ScopeChangeBaseModel } from '../../Types/scopeChangeRequest';

interface ScopeChangeFormState {
    isValid: boolean;
    state: Partial<ScopeChangeBaseModel>;
    handleInput: (key: keyof ScopeChangeBaseModel, value: unknown) => void;
}

export function useScopeChangeFormState(
    initialData?: Partial<ScopeChangeBaseModel>
): ScopeChangeFormState {
    const formData = useRef<Partial<ScopeChangeBaseModel>>(initialData ?? {});

    /** Will re-render form */
    const [isValid, setIsValid] = useState(false);

    function handleInput(key: keyof ScopeChangeBaseModel, value: unknown) {
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
        setIsValid(checkFormState(formData.current));
    }

    const mandatoryProperties: (keyof ScopeChangeBaseModel)[] = [
        'title',
        'category',
        'originSource',
        'description',
        'phase',
    ];

    function checkFormState(request: Partial<ScopeChangeBaseModel>): boolean {
        if (mandatoryProperties.every((k) => Object.keys(request).includes(k))) {
            /** Validate content */
            switch (true) {
                case !request.title || request.title.length <= 0:
                    return false;

                case !request.phase || request.phase.length <= 0:
                    return false;

                case !request.category || request.category.length <= 0:
                    return false;

                case !request.description || request.description.length <= 0:
                    return false;

                case !request.originSource || request.originSource.length <= 0:
                    return false;
            }

            if (request.originSource !== 'NotApplicable') {
                if (!request.originSourceId || request.originSourceId?.length <= 0) {
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
