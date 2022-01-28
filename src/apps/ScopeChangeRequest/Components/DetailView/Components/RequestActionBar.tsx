import { Button, Progress, TextField } from '@equinor/eds-core-react';
import { useEffect, useMemo, useReducer, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import styled from 'styled-components';
import { useClientContext, useHttpClient } from '../../../../../Core/Client/Hooks';
import { spawnConfirmationDialog } from '../../../../../Core/ConfirmationDialog/Functions/spawnConfirmationDialog';
import { patchScopeChange, patchWorkflowStep } from '../../../Api';
import { canSign as apiCheckSign } from '../../../Api/ScopeChange/Access/canSign';
import { postContribution } from '../../../Api/ScopeChange/postContribution';
import { unVoidRequest, voidRequest } from '../../../Api/ScopeChange/voidRequest';
import { ScopeChangeRequest, ScopeChangeRequestFormModel } from '../../../Types/scopeChangeRequest';
import { applyEDSTheme } from '../../SearchableDropdown/applyEds';
import { RequestActionsContainer } from '../requestDetailViewStyles';
import { Field } from './Field';

interface RequestActionBarProps {
    request: ScopeChangeRequest;
    refetch: () => Promise<void>;
}

export const RequestActionBar = ({ request, refetch }: RequestActionBarProps) => {
    const { internal } = useClientContext();
    const [comment, setComment] = useState<string | undefined>(undefined);
    const { scopeChange: scopeChangeApi } = useHttpClient();
    const [selectedCriteria, setSelectedCriteria] = useState<string | undefined>(undefined);
    const [userId, setUserId] = useState<string | undefined>();

    const checkCanSign = async () => {
        if (!request.currentWorkflowStep || !request.currentWorkflowStep?.criterias) return;
        const criteriaId = request.currentWorkflowStep.criterias
            .filter((x) => x.signedState === null)
            .map((x) => x.id);

        if (criteriaId.length > 0) {
            const signAllowed = await apiCheckSign(
                request.id,
                request.currentWorkflowStep?.id || '',
                criteriaId[0]
            );
            console.log(signAllowed);
        }
    };

    useEffect(() => {
        checkCanSign();
    }, [request]);

    useEffect(() => {
        setUserId(internal.authProvider.getCurrentUser()?.localAccountId);
    }, [internal]);

    const [
        {
            hasErrored,
            voidLoading,
            signLoading,
            initiateLoading,
            contributeLoading,
            canInitiate,
            canSign,
            canContribute,
            canVoid,
        },
        dispatch,
    ] = useReducer(tasksReducer, initial);

    const availableActions: SelectOption[] | undefined = useMemo(() => {
        if (
            request.state === 'Open' &&
            request.currentWorkflowStep &&
            request.currentWorkflowStep.criterias.length > 0
        ) {
            const activeCriterias = request.currentWorkflowStep.criterias
                .filter((x) => x.signedAtUtc === null)
                .map((x) => {
                    return {
                        value: x.id,
                        label: x.value,
                    };
                });
            if (activeCriterias.length === 1) {
                setSelectedCriteria(activeCriterias[0].value);
            }
            return activeCriterias;
        }
    }, [request]);

    const onVoidRequest = async () => {
        dispatch({ type: 'setVoidLoading', value: true });
        if (request.isVoided) {
            await unVoidRequest(request.id);
        } else {
            await voidRequest(request.id);
        }
        await refetch();
        dispatch({ type: 'setVoidLoading', value: false });
    };

    const onSignStep = async () => {
        dispatch({ type: 'setSignLoading', value: true });
        if (selectedCriteria && request.currentWorkflowStep) {
            const currentStepId = request.currentWorkflowStep.id;
            const unsignedCriterias = request.currentWorkflowStep.criterias.filter(
                (x) => x.signedAtUtc === null
            );

            if (
                request.currentWorkflowStep.contributors &&
                request.currentWorkflowStep.contributors.some((x) => x.contribution === null) &&
                unsignedCriterias.length === 1
            ) {
                spawnConfirmationDialog(
                    'Not all contributors have responded yet, are you sure you want to continue?',
                    'Warning',
                    async () =>
                        await patchWorkflowStep(
                            request.id,
                            currentStepId,
                            selectedCriteria,
                            scopeChangeApi,
                            comment
                        )
                );
            } else {
                await patchWorkflowStep(
                    request.id,
                    currentStepId,
                    selectedCriteria,
                    scopeChangeApi,
                    comment
                );
            }

            await refetch();
            setComment('');
        }
        dispatch({ type: 'setSignLoading', value: false });
    };

    const sendContribution = async () => {
        dispatch({ type: 'setContributeLoading', value: true });
        const contributionId = request.currentWorkflowStep?.contributors.find(
            (x) => x.person.oid === userId
        )?.id;
        if (request.currentWorkflowStep && contributionId) {
            await postContribution(
                request.id,
                request.currentWorkflowStep?.id,
                contributionId,
                scopeChangeApi,
                comment
            );
            setComment('');
        }
        dispatch({ type: 'setContributeLoading', value: false });
    };

    const onInitiate = async () => {
        dispatch({ type: 'setInitiateLoading', value: true });
        const scopeChange: ScopeChangeRequestFormModel = {
            ...request,
            actualChangeHours: request.actualChangeHours,
            estimatedChangeHours: request.estimatedChangeHours,
            category: request.category,
            description: request.description,
            guesstimateDescription: request.guesstimateDescription,
            guesstimateHours: request.guesstimateHours,
            id: request.id,
            originSource: request.originSource,
            originSourceId: request.originSourceId,
            phase: request.phase,
            title: request.title,
            commissioningPackageNumbers:
                request.commissioningPackages.map((x) => x.procosysNumber) || [],
            systemIds: request.systems.map((x) => x.procosysId) || [],
            tagNumbers: request.tags.map((x) => x.procosysNumber) || [],
            documentNumbers: request.documents.map((x) => x.stidDocumentNumber) || [],
            areaCodes: [],
            disciplineCodes: [],
        };
        const payload = {
            ...scopeChange,
            setAsOpen: true,
        };

        await patchScopeChange(payload, scopeChangeApi);
        await refetch();
        dispatch({ type: 'setInitiateLoading', value: false });
    };

    return (
        <div>
            <RequestActionsContainer>
                <Field
                    label="Comment"
                    value={
                        <TextField
                            style={{ width: '630px' }}
                            id={'Comment'}
                            multiline
                            value={comment}
                            onChange={(e) => {
                                setComment(e.target.value);
                            }}
                        />
                    }
                />
                <ButtonContainer>
                    {request.state === 'Draft' && (
                        <>
                            {/* <Button onClick={setEditMode}>Edit</Button> */}
                            <HorizontalDivider />
                            <Button
                                onClick={onInitiate}
                                variant="outlined"
                                disabled={initiateLoading}
                            >
                                {initiateLoading ? (
                                    <Progress.Dots color="primary" />
                                ) : (
                                    <span>Initiate request</span>
                                )}
                            </Button>
                        </>
                    )}
                    {request.currentWorkflowStep?.contributors.some(
                        (x) => x.person.oid === userId && x.contribution === null
                    ) && (
                            <Button onClick={sendContribution} disabled={contributeLoading}>
                                {contributeLoading ? (
                                    <Progress.Dots color="primary" />
                                ) : (
                                    <span> Contribute</span>
                                )}
                            </Button>
                        )}
                    {request.state === 'Open' && (
                        <>
                            <span>
                                <Button
                                    onClick={async () => await onVoidRequest()}
                                    disabled={voidLoading}
                                    variant="outlined"
                                    color="danger"
                                >
                                    {voidLoading ? (
                                        <Progress.Dots color="tertiary" />
                                    ) : (
                                        <>{request.isVoided ? 'Unvoid request' : 'Void request'}</>
                                    )}
                                </Button>
                            </span>

                            <Inline>
                                {availableActions && availableActions?.length > 1 && (
                                    <>
                                        <div style={{ minWidth: '250px' }}>
                                            <Select
                                                isClearable={true}
                                                isSearchable={false}
                                                options={availableActions}
                                                placeholder="Sign as"
                                                onChange={(newValue: SingleValue<SelectOption>) => {
                                                    setSelectedCriteria(newValue?.value);
                                                }}
                                                theme={applyEDSTheme}
                                            />
                                        </div>
                                    </>
                                )}
                                <Button
                                    disabled={!selectedCriteria || signLoading}
                                    onClick={onSignStep}
                                >
                                    {signLoading ? (
                                        <Progress.Dots color="primary" />
                                    ) : (
                                        <div>Sign</div>
                                    )}
                                </Button>
                            </Inline>
                        </>
                    )}
                </ButtonContainer>
            </RequestActionsContainer>
        </div>
    );
};

const Inline = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0.2em;
`;

export const ButtonContainer = styled.div`
    display: flex;
    padding: 0em 1em 1em 1em;
    justify-content: space-between;
`;

export const HorizontalDivider = styled.div`
    margin: 0.2em;
`;
interface SelectOption {
    label: string;
    value: string;
}

const initial: NotifyEvents = {
    signLoading: false,
    voidLoading: false,
    initiateLoading: false,
    contributeLoading: false,
    hasErrored: false,
    canContribute: false,
    canInitiate: false,
    canSign: false,
    canVoid: false,
};

interface NotifyEvents {
    contributeLoading: boolean;
    initiateLoading: boolean;
    voidLoading: boolean;
    signLoading: boolean;
    hasErrored: boolean;
    canSign: boolean;
    canVoid: boolean;
    canContribute: boolean;
    canInitiate: boolean;
}

type MutableStates =
    | 'setSignLoading'
    | 'setVoidLoading'
    | 'setInitiateLoading'
    | 'setContributeLoading'
    | 'hasErrored'
    | 'setCanSign'
    | 'setCanVoid'
    | 'setCanContribute'
    | 'setCanInitiate';

interface Actions {
    type: MutableStates;
    value: boolean;
}

function tasksReducer(state: NotifyEvents, action: Actions): NotifyEvents {
    switch (action.type) {
        case 'hasErrored': {
            return { ...state, hasErrored: action.value };
        }

        case 'setContributeLoading': {
            return { ...state, contributeLoading: action.value };
        }

        case 'setInitiateLoading': {
            return { ...state, initiateLoading: action.value };
        }

        case 'setSignLoading': {
            return { ...state, signLoading: action.value };
        }

        case 'setVoidLoading': {
            return { ...state, voidLoading: action.value };
        }

        case 'setCanContribute': {
            return { ...state, canContribute: action.value };
        }

        case 'setCanVoid': {
            return { ...state, canVoid: action.value };
        }

        case 'setCanSign': {
            return { ...state, canSign: action.value };
        }

        case 'setCanInitiate': {
            return { ...state, canInitiate: action.value };
        }

        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}
