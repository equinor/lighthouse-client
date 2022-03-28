import { useRef, useState } from 'react';
import { useRefresh } from '../../../../components/ParkView/hooks/useRefresh';
import { TypedSelectOption } from '../../Api/Search/searchType';
import { ScopeChangeBaseModel } from '../../Types/scopeChangeRequest';

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
        setIsValid(checkFormState(formData.current));
        if (RE_RERENDER_KEYS.includes(key)) {
            refresh();
        }
    }

    const mandatoryProperties: (keyof ScopeChangeFormModel)[] = [
        'title',
        'originSource',
        'description',
        'phase',
        'changeCategory',
    ];

    function checkFormState(request: Partial<ScopeChangeFormModel>): boolean {
        if (mandatoryProperties.every((k) => Object.keys(request).includes(k))) {
            /** Validate content */
            switch (true) {
                case !request.title || request.title.length <= 0:
                    return false;

                case !request.phase || request.phase.length <= 0:
                    return false;

                case !request?.changeCategory?.id || request?.changeCategory?.id.length <= 0:
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
