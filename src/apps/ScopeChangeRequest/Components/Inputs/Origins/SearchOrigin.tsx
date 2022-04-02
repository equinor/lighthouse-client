import styled from 'styled-components';
import { GroupBase, OptionsOrGroups } from 'react-select';
import { PCSOrigins } from '../../../types/ProCoSys/ProCoSysTypes';

import { useState } from 'react';
import { TypedSelectOption } from '../../../api/Search/searchType';
import { SearchableSingleSelect } from '../SearchableSingleSelect';
import { usePcsSearch } from '../../../hooks/search/usePcsSearch';

interface PCSLinkProps {
    setOriginId: (originId: string | undefined) => void;
    originId?: string;
    type: PCSOrigins;
}

export const SearchOrigin = ({ setOriginId, originId, type }: PCSLinkProps): JSX.Element => {
    const [apiErrors, setApiErrors] = useState<string[]>([]);
    const { searchPCS } = usePcsSearch();

    const origin: TypedSelectOption | null = originId
        ? {
            label: originId,
            value: originId,
            type: type,
            searchValue: originId,
            object: originId,
        }
        : null;

    const loadOptions = async (
        inputValue: string,
        signal: AbortSignal,
        callback: (
            options: OptionsOrGroups<TypedSelectOption, GroupBase<TypedSelectOption>>
        ) => void
    ) => {
        const options: TypedSelectOption[] = [];

        try {
            await (await searchPCS(inputValue, type, signal)).map((x) => options.push(x));
        } catch (e) {
            setApiErrors((prev) => [...prev, type]);
        }
        if (options.length > 0) {
            callback(options);
        }
    };

    return (
        <>
            {apiErrors &&
                apiErrors.length > 0 &&
                apiErrors.map((name) => {
                    return <ErrorWrapper key={name}>Failed to fetch {name}</ErrorWrapper>;
                })}

            <Inline>
                <SearchableSingleSelect
                    defaultValue={origin}
                    loadOptions={loadOptions}
                    onChange={(change) => {
                        if (change) {
                            setOriginId(change.value);
                        } else {
                            setOriginId(undefined);
                        }
                    }}
                />
            </Inline>
        </>
    );
};

const Inline = styled.span`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
`;

const ErrorWrapper = styled.div`
    font-size: 12px;
    color: red;
`;
