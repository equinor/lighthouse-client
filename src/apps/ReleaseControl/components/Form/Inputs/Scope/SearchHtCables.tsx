import { ActionMeta, GroupBase, MultiValue, OptionsOrGroups } from 'react-select';
import styled from 'styled-components';
import { useCancellationToken } from '../../../../../../hooks/cancellationToken/useCancellationToken';
import { TypedSelectOption } from '../../../../../ScopeChangeRequest/api/Search/searchType';
import {
    FAMTypes,
    useFAMSearch,
} from '../../../../../ScopeChangeRequest/hooks/Search/useFAMSearch';
import { FamTagType } from '../../../../types/releaseControl';
import { HtCableTable } from './HtCableTable';
import { Select } from './ScopeSelect';

interface SearchHtCablesProps {
    onChange: (newHtCables: TypedSelectOption[]) => void;
    htCables: TypedSelectOption[];
}

export const SearchHtCables = ({ onChange, htCables }: SearchHtCablesProps): JSX.Element => {
    const { getSignal, abort } = useCancellationToken();

    const { searchFAM } = useFAMSearch();

    async function loadOptions(
        type: FAMTypes,
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
    ) => loadOptions('htcable', inputValue, callback);

    const addHtCable = (value: TypedSelectOption | TypedSelectOption[]) => {
        const newValues = Array.isArray(value) ? value : [value];
        onChange([...htCables, ...newValues]);
    };

    return (
        <div>
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
                            addHtCable(actionMeta.option);
                        }}
                        onInputChange={abort}
                        value={htCables}
                    />
                </SearchWrapper>
                <div>
                    <HtCableTable
                        htCables={
                            htCables
                                .filter(({ type }) => type === 'htcable')
                                .map((s) => s.object) as FamTagType[]
                        }
                        editMode={true}
                    />
                </div>
            </Section>
        </div>
    );
};

const SearchWrapper = styled.div`
    width: 250px;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
`;
