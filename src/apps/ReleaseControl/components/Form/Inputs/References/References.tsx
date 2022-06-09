import { tokens } from '@equinor/eds-tokens';
import { isProduction } from '@equinor/lighthouse-portal-client';
import { useState } from 'react';
import { ActionMeta, GroupBase, MultiValue, OptionsOrGroups, Theme } from 'react-select';
import AsyncSelect from 'react-select/async';
import styled from 'styled-components';
import { useCancellationToken } from '../../../../../../hooks/cancellationToken/useCancellationToken';
import { Table } from '../../../../../../packages/Table/Components/Table';
import { TypedSelectOption } from '../../../../../ScopeChangeRequest/api/Search/searchType';
import {
    applyEdsComponents,
    applyEdsStyles,
    applyEDSTheme,
} from '../../../../../ScopeChangeRequest/Components/Inputs/SearchableDropdown/applyEds';
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
    const { getSignal, abort } = useCancellationToken();

    const { searchFAM } = useFAMSearch();

    async function loadOptions(
        type: ReferenceType,
        inputValue: string,
        callback: (
            options: OptionsOrGroups<TypedSelectOption, GroupBase<TypedSelectOption>>
        ) => void
    ) {
        const items = await searchFAM(inputValue, type, getSignal());

        callback(items);
    }

    const htCableLoadOptions = (
        inputValue: string,
        callback: (
            options: OptionsOrGroups<TypedSelectOption, GroupBase<TypedSelectOption>>
        ) => void
    ) => loadOptions('ht cable', inputValue, callback);

    const tagLoadOptions = (
        inputValue: string,
        callback: (
            options: OptionsOrGroups<TypedSelectOption, GroupBase<TypedSelectOption>>
        ) => void
    ) => loadOptions('famtag', inputValue, callback);

    return (
        <div style={{ height: '700px' }}>
            <SearchReferences
                onChange={updateReferences}
                references={references}
                options={{ referenceTypes: ['punch', 'document'] }}
            />
            <Section>
                <div>Tag involved in this release control</div>
                <SearchWrapper>
                    <Select
                        loadOptions={tagLoadOptions}
                        onChange={(
                            _: MultiValue<TypedSelectOption>,
                            actionMeta: ActionMeta<TypedSelectOption>
                        ) => {
                            if (!actionMeta.option) return;
                            //Typescript????
                            const opt = actionMeta.option;
                            setScope((old) => [...old, opt]);
                        }}
                        onInputChange={abort}
                        value={scope}
                    />
                </SearchWrapper>
                <TagTable
                    tags={
                        scope
                            .filter(({ type }) => type === 'famtag')
                            .map((s) => s.object) as FamTag[]
                    }
                />
            </Section>
            <br />
            <Section>
                <div>Related HT cables</div>
                <SearchWrapper>
                    <Select
                        loadOptions={htCableLoadOptions}
                        onChange={(
                            _: MultiValue<TypedSelectOption>,
                            actionMeta: ActionMeta<TypedSelectOption>
                        ) => {
                            if (!actionMeta.option) return;
                            //Typescript????
                            const opt = actionMeta.option;
                            setScope((old) => [...old, opt]);
                        }}
                        onInputChange={abort}
                        value={scope}
                    />
                </SearchWrapper>

                <HtCableTable
                    tags={
                        scope
                            .filter(({ type }) => type === 'ht cable')
                            .map((s) => s.object) as FamTag[]
                    }
                />
            </Section>
        </div>
    );
};

interface TagTableProps {
    tags: FamTag[];
}

export const TagTable = ({ tags }: TagTableProps): JSX.Element => {
    // if (tags.length === 0) return <></>;

    return (
        <Table
            height={35 + tags.length * 32}
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
    generateColumn<FamTag>('Tag type', ({ register }) => register, 110),
    // generateColumn<FamTag>('Mounted on', ({ actualCompletionDate }) => '???', 90),
    // generateColumn<FamTag>('Related HT cables', ({ description }) => 'Insufficient data', 200),
    generateColumn<FamTag>('Comm', ({ commissioningPackageNo }) => commissioningPackageNo, 90),
    generateColumn<FamTag>(
        'MC',
        ({ mechanicalCompletionPackageNo }) => mechanicalCompletionPackageNo,
        90
    ),
    generateColumn<FamTag>('WO (open)', () => 'No data', 90),
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
    // if (tags.length === 0) return <></>;
    return (
        <Table
            height={35 + tags.length * 32}
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
    generateColumn<FamTag>('Switch board', () => '', 110),
    generateColumn<FamTag>('Circuit', () => '', 90),
    generateColumn<FamTag>('Cable length (m)', () => '', 200),
    generateColumn<FamTag>('Tag heated', () => '', 90),
    generateColumn<FamTag>('Comm', ({ commissioningPackageNo }) => commissioningPackageNo, 90),
    generateColumn<FamTag>(
        'MC',
        ({ mechanicalCompletionPackageNo }) => mechanicalCompletionPackageNo,
        90
    ),
    generateColumn<FamTag>('WO (open)', () => '', 90),
];

const SearchWrapper = styled.div`
    width: 250px;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
`;

interface SelectProps {
    loadOptions: (
        inputValue: string,
        callback: (
            options: OptionsOrGroups<TypedSelectOption, GroupBase<TypedSelectOption>>
        ) => void
    ) => void;
    value: TypedSelectOption[];
    onInputChange: () => void;
    onChange: (
        newValue: MultiValue<TypedSelectOption>,
        actionMeta: ActionMeta<TypedSelectOption>
    ) => void;
}

const Select = ({ loadOptions, onChange, onInputChange, value }: SelectProps) => (
    <AsyncSelect
        cacheOptions={false}
        loadOptions={loadOptions}
        defaultOptions={false}
        components={applyEdsComponents()}
        isMulti={true}
        placeholder={`Type to search..`}
        isClearable={false}
        value={value}
        styles={applyEdsStyles()}
        controlShouldRenderValue={false}
        onInputChange={onInputChange}
        onChange={onChange}
        theme={(theme: Theme) => applyEDSTheme(theme)}
    />
);
