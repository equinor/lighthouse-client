import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { Button, CircularProgress, Icon, Progress } from '@equinor/eds-core-react';

import { getScopeChangeById, unVoidRequest, voidRequest } from '../../Api/ScopeChange/Request';
import { Wrapper } from '../../Styles/SidesheetWrapper';
import { ScopeChangeRequest } from '../../Types/scopeChangeRequest';
import { tokens } from '@equinor/eds-tokens';
import { RequestDetailView } from '../DetailView/RequestDetailView';
import { ScopeChangeRequestEditForm } from '../Form/ScopeChangeRequestEditForm';

import { ScopeChangeContext } from './Context/scopeChangeAccessContext';
import { useScopeChangeAccess } from '../../Hooks/useScopeChangeAccess';
import { IconMenu, MenuItem } from '../MenuButton';

import { spawnConfirmationDialog } from '../../../../Core/ConfirmationDialog/Functions/spawnConfirmationDialog';
import { useScopeChangeMutation } from '../../Hooks/React-Query/useScopechangeMutation';
import { usePreloadCaching } from '../../Hooks/React-Query/usePreloadCaching';
import { scopeChangeQueryKeys } from '../../Keys/scopeChangeQueryKeys';
import { scopeChangeMutationKeys } from '../../Keys/scopeChangeMutationKeys';
import { useOctopusErrorHandler } from './useOctopusErrorHandler';
import { useQuery } from 'react-query';

export const ScopeChangeSideSheet = (item: ScopeChangeRequest): JSX.Element => {
    const [editMode, setEditMode] = useState<boolean>(false);

    useOctopusErrorHandler();

    usePreloadCaching();

    const { voidKey, unvoidKey } = scopeChangeMutationKeys(item.id);
    const { baseKey } = scopeChangeQueryKeys(item.id);

    const {
        data: request,
        remove,
        isLoading,
    } = useQuery<ScopeChangeRequest>(baseKey, () => getScopeChangeById(item.id), {
        initialData: item,
    });

    const scopeChangeAccess = useScopeChangeAccess(item.id);

    const { mutate: unvoidMutation } = useScopeChangeMutation(item.id, unvoidKey, unVoidRequest);

    const { mutate: voidMutation } = useScopeChangeMutation(item.id, voidKey, voidRequest);

    const actionMenu: MenuItem[] = useMemo(() => {
        const actions: MenuItem[] = [];

        if (scopeChangeAccess.canUnVoid) {
            if (request?.isVoided) {
                actions.push({
                    label: 'Unvoid request',
                    onClick: () => unvoidMutation({ requestId: item.id }),
                });
            }
        }
        if (scopeChangeAccess.canVoid) {
            if (!request?.isVoided) {
                actions.push({
                    label: 'Void request',
                    onClick: () =>
                        spawnConfirmationDialog(
                            'Are you sure you want to void this request',
                            'Void confirmation',
                            () => voidMutation({ requestId: item.id })
                        ),
                });
            }
        }

        return actions;
    }, [
        request,
        item,
        scopeChangeAccess.canUnVoid,
        scopeChangeAccess.canVoid,
        unvoidMutation,
        voidMutation,
    ]);

    useEffect(() => {
        if (item.id) {
            remove();
        }
    }, [item.id]);

    if (!item.id) {
        return <p>Something went wrong</p>;
    }

    if (isLoading) {
        return (
            <Loading>
                <CircularProgress size={48} value={0} />
            </Loading>
        );
    }
    return (
        <Wrapper>
            <TitleHeader>
                <Title>
                    {request?.sequenceNumber}, {request?.title}
                    {isLoading && <Progress.Dots color="primary" />}
                </Title>
                <ButtonContainer>
                    <IconMenu items={actionMenu} />

                    <Button
                        variant="ghost_icon"
                        onClick={() => setEditMode(!editMode)}
                        disabled={!scopeChangeAccess.canPatch}
                    >
                        <Icon
                            color={
                                scopeChangeAccess.canPatch
                                    ? tokens.colors.interactive.primary__resting.hex
                                    : tokens.colors.interactive.disabled__text.hex
                            }
                            name="edit"
                        />
                    </Button>
                </ButtonContainer>
            </TitleHeader>
            <ScopeChangeContext.Provider
                value={{
                    request: request || item,
                    requestAccess: scopeChangeAccess,
                }}
            >
                {request && (
                    <>
                        {editMode ? (
                            <ScopeChangeRequestEditForm
                                request={request}
                                close={() => setEditMode(false)}
                            />
                        ) : (
                            <RequestDetailView />
                        )}
                    </>
                )}
            </ScopeChangeContext.Provider>
        </Wrapper>
    );
};

const Title = styled.div`
    font-size: 28px;
    max-width: 500px;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.3em;
`;

const TitleHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
`;

const Loading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1200px;
    height: 100vh;
`;
