import { tokens } from '@equinor/eds-tokens';
import { isProduction } from '@equinor/lighthouse-portal-client';
import { useEffect, useState } from 'react';
import { GroupBase, OptionsOrGroups } from 'react-select';
import styled from 'styled-components';
import { Table } from '../../../../../../packages/Table/Components/Table';
import { TypedSelectOption } from '../../../../../ScopeChangeRequest/api/Search/searchType';
import { SearchableSingleSelect } from '../../../../../ScopeChangeRequest/Components/Inputs/SearchableSingleSelect';
import { SearchReferences } from '../../../../../ScopeChangeRequest/Components/SearchReferences/SearchReferences';
import { generateColumn } from '../../../../../ScopeChangeRequest/Components/WorkOrderTable/Utils/generateColumn';
import { FamTag, useFAMSearch } from '../../../../../ScopeChangeRequest/hooks/Search/useFAMSearch';
import { ReferenceType } from '../../../../../ScopeChangeRequest/hooks/Search/useReferencesSearch';
import { DRCFormAtomApi } from '../../../../Atoms/formAtomApi';

const { updateAtom, useAtomState } = DRCFormAtomApi;

const updateReferences = (newVals: TypedSelectOption[]) => {
    updateAtom({ references: newVals });
};

export const ReferencesInput = (): JSX.Element => {
    const references = useAtomState((s) => s.references) ?? [];

    const [scope, setScope] = useState<TypedSelectOption[]>([]);

    const { searchFAM } = useFAMSearch();

    async function loadOptions(
        type: ReferenceType,
        inputValue: string,
        signal: AbortSignal,
        callback: (
            options: OptionsOrGroups<TypedSelectOption, GroupBase<TypedSelectOption>>
        ) => void
    ) {
        const items = await searchFAM(inputValue, 'ht cable', signal);

        callback(items);
    }

    const htCableLoadOptions = (
        inputValue: string,
        signal: AbortSignal,
        callback: (
            options: OptionsOrGroups<TypedSelectOption, GroupBase<TypedSelectOption>>
        ) => void
    ) => loadOptions('ht cable', inputValue, signal, callback);

    const tagLoadOptions = (
        inputValue: string,
        signal: AbortSignal,
        callback: (
            options: OptionsOrGroups<TypedSelectOption, GroupBase<TypedSelectOption>>
        ) => void
    ) => loadOptions('tag', inputValue, signal, callback);

    useEffect(() => {
        console.log(scope);
    }, [scope]);

    return (
        <div>
            <div>
                <SearchableSingleSelect
                    loadOptions={htCableLoadOptions}
                    onChange={(a) => {
                        setScope((old) => [
                            ...old.filter((v, i, a) => a.indexOf(v) === i),
                            a as TypedSelectOption,
                        ]);
                    }}
                />

                <HtCableTable
                    tags={
                        scope.filter((s) => s.type === 'ht cable').map((s) => s.object) as FamTag[]
                    }
                />
            </div>
            <SearchReferences onChange={updateReferences} references={references} />
            <div>
                <SearchableSingleSelect
                    loadOptions={tagLoadOptions}
                    onChange={(a) => {
                        setScope((old) => [...old, a as TypedSelectOption]);
                    }}
                />

                <TagTable
                    tags={scope.filter((s) => s.type === 'famtag').map((s) => s.object) as FamTag[]}
                />
            </div>
        </div>
    );
};

interface TagTableProps {
    tags: FamTag[];
}

export const TagTable = ({ tags }: TagTableProps): JSX.Element => {
    return null;

    return (
        <Table
            options={{
                data: tags,
                columns: makeColumns(),
            }}
        />
    );
};

const makeColumns = () => [
    generateColumn<FamTag>(
        'Tag number',
        ({ tagNo, tagId }) => (
            <Link
                hideUnderline
                onClick={() => {
                    window.open(
                        `https://${isProduction() ? 'procosys' : 'procosystest'
                        }.equinor.com/JOHAN_CASTBERG/Completion#Tag|${tagId}`,
                        '_blank'
                    );
                }}
            >
                {tagNo}
            </Link>
        ),
        90
    ),
    generateColumn<FamTag>('Tag description', ({ description }) => description, 200),
    generateColumn<FamTag>('Tag type', ({ tagCategory }) => tagCategory, 110),
    generateColumn<FamTag>('Mounted on', ({ actualCompletionDate }) => '???', 90),
    generateColumn<FamTag>('Related HT cables', ({ description }) => 'Insufficient data', 200),
    generateColumn<FamTag>('Comm', ({ commissioningPackageNo }) => commissioningPackageNo, 90),
    generateColumn<FamTag>(
        'MC',
        ({ mechanicalCompletionPackageNo }) => mechanicalCompletionPackageNo,
        90
    ),
    generateColumn<FamTag>('WO (open)', ({ workOrders }) => workOrders, 90),
];

const Link = styled.div`
    color: ${tokens.colors.interactive.primary__resting.hex};
    text-decoration: ${({ hideUnderline }: { hideUnderline: boolean }) =>
        hideUnderline ? 'none' : 'underline'};
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

interface HtCableTableProps {
    tags: FamTag[];
}

export const HtCableTable = ({ tags }: HtCableTableProps): JSX.Element => {
    if (tags.length === 0) return <></>;
    return (
        <Table
            options={{
                data: tags,
                columns: makeHtCableColumns(),
            }}
        />
    );
};

const makeHtCableColumns = () => [
    generateColumn<FamTag>(
        'HT cable number',
        ({ tagNo, tagId }) => (
            <Link
                hideUnderline
                onClick={() => {
                    window.open(
                        `https://${isProduction() ? 'procosys' : 'procosystest'
                        }.equinor.com/JOHAN_CASTBERG/Completion#Tag|${tagId}`,
                        '_blank'
                    );
                }}
            >
                {tagNo}
            </Link>
        ),
        90
    ),
    generateColumn<FamTag>('Tag description', ({ description }) => 'description', 200),
    generateColumn<FamTag>(
        'Switch board',
        ({ actualCompletionDate }) => 'actualCompletionDate',
        110
    ),
    generateColumn<FamTag>('Circuit', ({ actualCompletionDate }) => '???', 90),
    generateColumn<FamTag>('Cable length (m)', ({ description }) => 'Insufficient data', 200),
    generateColumn<FamTag>(
        'Tag heated',
        ({ commissioningPackageNo }) => 'commissioningPackageNo',
        90
    ),
    generateColumn<FamTag>(
        'Comm',
        ({ mechanicalCompletionPackageNo }) => 'mechanicalCompletionPackageNo',
        90
    ),
    generateColumn<FamTag>('MC', ({ workOrders }) => 'workOrders', 90),
    generateColumn<FamTag>('WO (open)', ({ workOrders }) => 'workOrders', 90),
];
