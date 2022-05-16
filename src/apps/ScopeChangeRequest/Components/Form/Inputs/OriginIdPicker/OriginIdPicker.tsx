import { useCallback } from 'react';
import styled from 'styled-components';
import { SearchOrigin } from './SearchOrigin';
import { SelectPunch } from './SelectPunch';
import { SelectSWCR } from './SelectSWCR';
import { MultiSelect, TextField } from '@equinor/eds-core-react';
import { scopeChangeFormAtomApi } from '../../../../Atoms/FormAtomApi/formAtomApi';
import { Case, Switch } from '@equinor/JSX-Switch';

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

    return (
        <Wrapper>
            <Switch
                defaultCase={
                    <MultiSelect disabled={true} items={[]} meta="(Required)" label={'Origin ID'} />
                }
            >
                <Case when={originSource === 'DCR'}>
                    <TextField
                        id="DCR"
                        value={originSourceId}
                        onInput={(e) =>
                            scopeChangeFormAtomApi.updateAtom({ originSourceId: e.target.value })
                        }
                    />
                </Case>
                <Case when={originSource === 'NCR'}>
                    <SearchOrigin
                        setOriginId={setOriginId}
                        originId={originSourceId}
                        type={'NCR'}
                    />
                </Case>
                <Case when={originSource === 'Query'}>
                    <SearchOrigin
                        setOriginId={setOriginId}
                        originId={originSourceId}
                        type={'Query'}
                    />
                </Case>
                <Case when={originSource === 'Punch'}>
                    <SelectPunch setOriginId={setOriginId} originId={originSourceId} />
                </Case>
                <Case when={originSource === 'SWCR'}>
                    <SelectSWCR setOriginId={setOriginId} originId={originSourceId} />
                </Case>
            </Switch>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 0.14em 0em;
`;
