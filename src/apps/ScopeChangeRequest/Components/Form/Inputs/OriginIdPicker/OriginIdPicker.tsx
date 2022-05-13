import { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { SearchOrigin } from './SearchOrigin';
import { SelectPunch } from './SelectPunch';
import { SelectSWCR } from './SelectSWCR';
import { MultiSelect, TextField } from '@equinor/eds-core-react';
import { scopeChangeFormAtomApi } from '../../../../Atoms/FormAtomApi/formAtomApi';

export const OriginIdPicker = (): JSX.Element => {
    const { useAtomState } = scopeChangeFormAtomApi;

    const { originSource, originSourceId } = useAtomState(({ originSource, originSourceId }) => ({
        originSource: originSource,
        originSourceId: originSourceId,
    }));

    const handleOriginIdChange = useCallback((inputOriginId: string | undefined) => {
        const { updateAtom } = scopeChangeFormAtomApi;
        updateAtom({ originSourceId: inputOriginId });
    }, []);

    const setOriginId = useCallback(
        (inputOriginId: string | undefined) => {
            if (originSource) {
                handleOriginIdChange(inputOriginId);
            } else {
                handleOriginIdChange(undefined);
            }
        },
        [handleOriginIdChange, originSource]
    );

    const SelectedComponent = useMemo(() => {
        switch (originSource) {
            case 'NCR':
                return (
                    <SearchOrigin
                        setOriginId={setOriginId}
                        originId={originSourceId}
                        type={'NCR'}
                    />
                );

            case 'DCR': {
                return (
                    <TextField
                        id="DCR"
                        value={originSourceId}
                        onInput={(e) =>
                            scopeChangeFormAtomApi.updateAtom({ originSourceId: e.target.value })
                        }
                    />
                );
            }

            case 'Query':
                return (
                    <SearchOrigin
                        setOriginId={setOriginId}
                        originId={originSourceId}
                        type={'Query'}
                    />
                );

            case 'Punch':
                return <SelectPunch setOriginId={setOriginId} originId={originSourceId} />;

            case 'SWCR':
                return <SelectSWCR setOriginId={setOriginId} originId={originSourceId} />;
            default:
                return (
                    <MultiSelect disabled={true} items={[]} meta="(Required)" label={'Origin ID'} />
                );
        }
    }, [originSource, originSourceId, setOriginId]);

    return <Wrapper>{SelectedComponent}</Wrapper>;
};

const Wrapper = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 0.14em 0em;
`;
