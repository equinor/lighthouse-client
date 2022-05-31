import { createAtom, DefaultAtomAPI } from '@equinor/atom';
import { useState } from 'react';
import { TypedSelectOption } from '../../ScopeChangeRequest/api/Search/searchType';
import { CreateReleaseControlStepModel } from '../types/releaseControl';

export interface DRCCreateModel {
    id?: string;
    title?: string;
    description?: string;
    plannedDueDate?: string;
    phase?: string;
    allowContributors?: boolean;
    tagNumbers?: string[];
    commissioningPackageNumbers: string[];
    systemIds: number[];
    areaCodes: string[];
    documentNumbers: string[];
    references?: TypedSelectOption[];
    workflowSteps?: CreateReleaseControlStepModel[];
}

export type DRCFormModel = Partial<DRCCreateModel>;

interface FormAtomApi extends DefaultAtomAPI<DRCFormModel> {
    useIsValid: () => boolean;
    clearState: () => void;
    prepareRequest: () => DRCFormModel;
}

export const DRCFormAtomApi = createAtom<DRCFormModel, FormAtomApi>({}, (api) => ({
    useIsValid: () => useIsValid(api),
    prepareRequest: () => prepareRequest(),
    clearState: () =>
        api.updateAtom({
            areaCodes: [],
            commissioningPackageNumbers: [],
            description: undefined,
            allowContributors: true,
            documentNumbers: [],
            plannedDueDate: undefined,
            systemIds: [],
            tagNumbers: [],
            workflowSteps: [],
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

function prepareRequest(): DRCFormModel {
    const { readAtomValue } = DRCFormAtomApi;

    const newReq: DRCCreateModel = {
        ...readAtomValue(),
        areaCodes: [],
        commissioningPackageNumbers: [],
        systemIds: [],
        documentNumbers: [],
    };
    return newReq as DRCFormModel;
}

function checkFormState(
    request: Pick<DRCFormModel, 'title' | 'description' | 'plannedDueDate' | 'phase'>
): boolean {
    if (MANDATORY_PROPERTIES.every((k) => Object.keys(request).includes(k))) {
        /** Validate content */
        switch (true) {
            case checkString(request.title):
                return false;

            case checkString(request.description):
                return false;
            case checkString(request.plannedDueDate):
                return false;
        }

        return true;
    } else {
        return false;
    }
}
