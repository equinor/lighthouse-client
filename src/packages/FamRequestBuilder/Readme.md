# Fam Request Builder
Utility for generating typesafe, valid FAM requests.

```ts
export const checklistColumnNames = [
    'ChecklistID',
    'Facility',
    'Project',
    'FormularType',
    'FormularGroup',
    'MechanicalCompletionPackageNo',
    'MechanicalCompletionPackageId',
    'MechanicalCompletionStatus',
    'CommissioningPackageNo',
    'CommissioningPackageId',
    'Responsible',
];
const expressions = generateExpressions('checklistID', 'Equals', [checklistId]);
const requestArgs = generateFamRequest(checklistColumnNames, 'Or', expressions);
const { data, isLoading, error } = useQuery(['checklists', checklistId], ({ signal }) =>
        getChecklistsForLoop(requestArgs, signal)
    );

export const getChecklistsForLoop = async (famFilter: FamRequest, signal?: AbortSignal) => {
    const { FAM } = httpClient();
    const res = await FAM.post(`v0.1/dynamic/completion/custom_loopsidesheetchecklists/JCA`, {
        body: JSON.stringify(famFilter),
        signal,
    });

    if (!res.ok) {
        throw 'Not found';
    }

    return await res.json();
};
```