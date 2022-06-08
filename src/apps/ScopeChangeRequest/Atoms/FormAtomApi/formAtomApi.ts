import { createAtom } from '@equinor/atom';
import { useState } from 'react';
import { DefaultAtomAPI } from '../../../../Core/Atom/types/atom';
import { TypedSelectOption } from '../../api/Search/searchType';
import { ReferenceType } from '../../hooks/Search/useReferencesSearch';
import { ScopeChangeCreateEditModel } from '../../types/scopeChangeRequest';

type ScopeChangeFormModel = Partial<ScopeChangeCreateEditModel>;

interface ScopeChangeReferences {
    tagNumbers: string[];
    commissioningPackageNumbers: string[];
    systemIds: number[];
    areaCodes: string[];
    documentNumbers: string[];
    punchListIds: number[];
}

interface FormAtomApi extends DefaultAtomAPI<ScopeChangeFormModel> {
    unPackReferences: () => ScopeChangeReferences;
    useIsValid: () => boolean;
    prepareRequest: () => ScopeChangeCreateEditModel;
    clearState: () => void;
}

export const scopeChangeFormAtomApi = createAtom<ScopeChangeFormModel, FormAtomApi>({}, (api) => ({
    unPackReferences: () => unPackReferences(api),
    useIsValid: () => useIsValid(api),
    prepareRequest: () => prepareRequest(),
    clearState: () =>
        api.updateAtom({
            areaCodes: [],
            changeCategory: { id: '', name: '' },
            changeCategoryId: undefined,
            commissioningPackageNumbers: [],
            description: undefined,
            disciplineGuesstimates: [],
            documentNumbers: [],
            id: undefined,
            newAttachments: [],
            originSource: undefined,
            originSourceId: undefined,
            phase: undefined,
            potentialWarrantyCase: false,
            references: [],
            scope: null,
            scopeId: undefined,
            setAsOpen: false,
            systemIds: [],
            tagNumbers: [],
            title: '',
            materialsIdentifiedInStorage: false,
            materialsNote: '',
            materialsToBeBoughtByContractor: false,
        }),
}));

function useIsValid(api: DefaultAtomAPI<ScopeChangeFormModel>): boolean {
    const [isValid, setIsValid] = useState<boolean>(false);
    api.useOnAtomStateChanged(
        (s) => checkFormState(s) !== isValid && setIsValid((valid) => !valid)
    );

    return isValid;
}

function unPackReferences(api: DefaultAtomAPI<ScopeChangeFormModel>): ScopeChangeReferences {
    const references = api.readAtomValue().references ?? [];

    return {
        areaCodes: unpackByType(references, 'area'),
        commissioningPackageNumbers: unpackByType(references, 'commpkg'),
        documentNumbers: unpackByType(references, 'document'),
        systemIds: unpackByType(references, 'system') as unknown as number[],
        tagNumbers: unpackByType(references, 'tag'),
        punchListIds: unpackByType(references, 'punch').map((s): number => Number(s)),
    };
}

function unpackByType(list: TypedSelectOption[], referenceType: ReferenceType): string[] {
    return list.filter(({ type }) => type === referenceType).map(({ value }) => value);
}

function prepareRequest(): ScopeChangeCreateEditModel {
    const { readAtomValue, unPackReferences } = scopeChangeFormAtomApi;

    const newReq = { ...readAtomValue(), ...unPackReferences() };
    newReq.scopeId = newReq?.scope?.id;
    newReq.changeCategoryId = newReq?.changeCategory?.id;
    newReq.disciplineGuesstimates =
        newReq.disciplineGuesstimates?.filter(({ disciplineCode }) => disciplineCode !== '') ?? [];
    return newReq as ScopeChangeCreateEditModel;
}

const MANDATORY_PROPERTIES: (keyof ScopeChangeFormModel)[] = [
    'title',
    'originSource',
    'description',
    'phase',
    'changeCategory',
];

function checkString(value?: string) {
    return !value || value.length <= 0;
}

function checkFormState(
    request: Pick<
        ScopeChangeFormModel,
        'title' | 'originSource' | 'description' | 'changeCategory' | 'phase' | 'originSourceId'
    >
): boolean {
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
