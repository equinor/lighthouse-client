import { tokens } from '@equinor/eds-tokens';
import { isProduction } from '@equinor/lighthouse-portal-client';
import { useState } from 'react';
import { GroupBase, OptionsOrGroups } from 'react-select';
import styled from 'styled-components';
import { Table } from '../../../../../../packages/Table/Components/Table';
import { TypedSelectOption } from '../../../../../ScopeChangeRequest/api/Search/searchType';
import { SearchableSingleSelect } from '../../../../../ScopeChangeRequest/Components/Inputs/SearchableSingleSelect';
import { SearchReferences } from '../../../../../ScopeChangeRequest/Components/SearchReferences/SearchReferences';
import { generateColumn } from '../../../../../ScopeChangeRequest/Components/WorkOrderTable/Utils/generateColumn';
import { FamTag, useFAMSearch } from '../../../../../ScopeChangeRequest/hooks/Search/useFAMSearch';
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
        inputValue: string,
        signal: AbortSignal,
        callback: (
            options: OptionsOrGroups<TypedSelectOption, GroupBase<TypedSelectOption>>
        ) => void
    ) {
        const items = await searchFAM(inputValue, 'ht cable', signal);

        callback(items);
    }

    return (
        <div>
            <SearchReferences onChange={updateReferences} references={references} />
            <div>
                <SearchableSingleSelect
                    loadOptions={loadOptions}
                    onChange={(a) => {
                        setScope((old) => [...old, a as TypedSelectOption]);
                    }}
                />
                {scope.length}
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
    generateColumn<FamTag>('Tag description', ({ description }) => description, 200),
    generateColumn<FamTag>('Switch board', ({ actualCompletionDate }) => tagCategory, 110),
    generateColumn<FamTag>('Circuit', ({ actualCompletionDate }) => '???', 90),
    generateColumn<FamTag>('Cable length (m)', ({ description }) => 'Insufficient data', 200),
    generateColumn<FamTag>(
        'Tag heated',
        ({ commissioningPackageNo }) => commissioningPackageNo,
        90
    ),
    generateColumn<FamTag>(
        'Comm',
        ({ mechanicalCompletionPackageNo }) => mechanicalCompletionPackageNo,
        90
    ),
    generateColumn<FamTag>('MC', ({ workOrders }) => workOrders, 90),
    generateColumn<FamTag>('WO (open)', ({ workOrders }) => workOrders, 90),
];
