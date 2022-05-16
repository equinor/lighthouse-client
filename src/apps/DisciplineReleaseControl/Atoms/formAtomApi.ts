import { createAtom, DefaultAtomAPI } from '@equinor/atom';
import { useState } from 'react';
import { TypedSelectOption } from '../../ScopeChangeRequest/api/Search/searchType';

interface DRCCreateModel {
    title?: string;
    description?: string;
    plannedStartDate?: string;
    tagNumbers: string[];
    commissioningPackageNumbers: string[];
    systemIds: number[];
    areaCodes: string[];
    documentNumbers: string[];
    references?: TypedSelectOption[];
}

type DRCFormModel = Partial<DRCCreateModel>;

interface FormAtomApi extends DefaultAtomAPI<DRCFormModel> {
    useIsValid: () => boolean;
    clearState: () => void;
}

export const DRCFormAtomApi = createAtom<DRCFormModel, FormAtomApi>({}, (api) => ({
    useIsValid: () => useIsValid(api),
    clearState: () =>
        api.updateAtom({
            areaCodes: [],
            commissioningPackageNumbers: [],
            description: undefined,
            documentNumbers: [],
            plannedStartDate: undefined,
            systemIds: [],
            tagNumbers: [],
            title: undefined,
        }),
}));

function useIsValid(api: DefaultAtomAPI<DRCFormModel>): boolean {
    const [isValid, setIsValid] = useState<boolean>(false);
    api.useOnAtomStateChanged(
        (s) => checkFormState(s) !== isValid && setIsValid((valid) => !valid)
    );

    return isValid;
}

const MANDATORY_PROPERTIES: (keyof DRCFormModel)[] = ['title', 'description'];

function checkString(value?: string) {
    return !value || value.length <= 0;
}

function checkFormState(
    request: Pick<DRCFormModel, 'title' | 'description' | 'plannedStartDate'>
): boolean {
    if (MANDATORY_PROPERTIES.every((k) => Object.keys(request).includes(k))) {
        /** Validate content */
        switch (true) {
            case checkString(request.title):
                return false;

            case checkString(request.description):
                return false;
            case checkString(request.plannedStartDate):
                return false;
        }

        return true;
    } else {
        return false;
    }
}
