import { Button, Progress, TextField } from '@equinor/eds-core-react';
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import styled from 'styled-components';
import { useHttpClient } from '../../../../../Core/Client/Hooks';
import { spawnConfirmationDialog } from '../../../../../Core/ConfirmationDialog/Functions/spawnConfirmationDialog';
import { patchScopeChange, patchWorkflowStep } from '../../../Api';
import { canSign as apiCheckSign } from '../../../Api/ScopeChange/Access/canSign';
import { canVoid as apiCheckCanVoid, canUnVoid } from '../../../Api/ScopeChange/Access/canVoid';
import { canContribute } from '../../../Api/ScopeChange/Access/canContribute';
import { postContribution } from '../../../Api/ScopeChange/postContribution';
import { unVoidRequest, voidRequest } from '../../../Api/ScopeChange/voidRequest';
import {
    Criteria,
    ScopeChangeRequest,
    ScopeChangeRequestFormModel,
} from '../../../Types/scopeChangeRequest';
import { applyEDSTheme } from '../../SearchableDropdown/applyEds';
import { RequestActionsContainer } from '../requestDetailViewStyles';
import { Field } from './Field';

interface RequestActionBarProps {
    request: ScopeChangeRequest;
    refetch: () => Promise<void>;
}

export const RequestActionBar = ({ request, refetch }: RequestActionBarProps): JSX.Element => {
    const [comment, setComment] = useState<string | undefined>(undefined);
    const { scopeChange: scopeChangeApi } = useHttpClient();
    const [selectedCriteria, setSelectedCriteria] = useState<string | undefined>(undefined);
    const [signableCriterias, setSignableCriterias] = useState<Criteria[]>([]);
    const [contributeId, setContributeId] = useState<string | undefined>();

    const appendCriteria = (criteria: Criteria) =>
        setSignableCriterias((prev) => [...prev, criteria]);

    const checkCanVoid = useCallback(async () => {
        // dispatch({ type: 'setCanVoid', value: false });

        const allowed = request.isVoided
            ? await canUnVoid(request.id)
            : await apiCheckCanVoid(request.id);
        dispatch({ type: 'setCanVoid', value: allowed });
    }, [request.isVoided, request.id]);

    const checkCanSign = useCallback(async () => {
        setSignableCriterias([]);
        setSelectedCriteria(undefined);
        if (request.currentWorkflowStep === null) {
            return;
        }

        const unsignedCriterias =
            request.currentWorkflowStep?.criterias.filter((x) => x.signedState === null) || [];
        unsignedCriterias.forEach(async (criteria) => {
            if (!request.currentWorkflowStep?.id) return;
            const allowed = await apiCheckSign(
                request.id,
                request.currentWorkflowStep.id,
                criteria.id
            );

            if (allowed) {
                appendCriteria(criteria);
            }
        });
    }, [request]);

    const checkCanContribute = useCallback(async () => {
        setContributeId(undefined);
        if (request.currentWorkflowStep === null) {
            return;
        }
        request.currentWorkflowStep?.contributors.map(async (x) => {
            if (x.contribution === null) {
                if (!request.currentWorkflowStep?.id) return;
                const allowed = await canContribute(
                    request.id,
                    request.currentWorkflowStep?.id,
                    x.id
                );
                if (allowed) {
                    setContributeId(x.id);
                }
            }
        });
    }, [request]);

    useEffect(() => {
        if (signableCriterias.length === 1) {
            setSelectedCriteria(signableCriterias[0].id);
        } else {
            setSelectedCriteria(undefined);
        }
    }, [signableCriterias]);

    const checkPermissions = useCallback(async () => {
        if (request.currentWorkflowStep === null) return;
        if (request.isVoided === false) {
            await checkCanSign();
            await checkCanContribute();
        }
        await checkCanVoid();
    }, [checkCanContribute, checkCanSign, checkCanVoid, request.isVoided, request.state]);

    useEffect(() => {
        checkPermissions();
    }, [checkPermissions, request]);

    useEffect(() => {
        dispatch({ type: 'setSignLoading', value: false });
        dispatch({ type: 'setContributeLoading', value: false });
        dispatch({ type: 'setInitiateLoading', value: false });
        dispatch({ type: 'setVoidLoading', value: false });
    }, [request.currentWorkflowStep, request.isVoided]);

    const [
        {
            voidLoading,
            signLoading,
            initiateLoading,
            contributeLoading,
            canInitiate,
            canVoid,

            // contributeFailed,
            // initiateFailed,
            // signFailed,
            // voidFailed,
        },
        dispatch,
    ] = useReducer(tasksReducer, initial);

    const onVoidRequest = useCallback(async () => {
        dispatch({ type: 'setVoidLoading', value: true });
        if (request.isVoided) {
            await unVoidRequest(request.id);
        } else {
            await voidRequest(request.id);
        }
        await refetch();
    }, [refetch, request.id, request.isVoided]);

    const onSignStep = useCallback(async () => {
        if (selectedCriteria && request.currentWorkflowStep) {
            const currentStepId = request.currentWorkflowStep.id;
            const unsignedCriterias = request.currentWorkflowStep.criterias.filter(
                (x) => x.signedAtUtc === null
            );
            const sign = async () => {
                try {
                    await patchWorkflowStep(
                        request.id,
                        currentStepId,
                        selectedCriteria,
                        scopeChangeApi,
                        comment
                    );
                } catch (e) {
                    console.error(e);
                } finally {
                    await refetch();
                }
            };
            if (
                request.currentWorkflowStep.contributors &&
                request.currentWorkflowStep.contributors.some((x) => x.contribution === null) &&
                unsignedCriterias.length === 1
            ) {
                spawnConfirmationDialog(
                    'Not all contributors have responded yet, are you sure you want to continue?',
                    'Warning',
                    sign
                );
            } else {
                sign();
            }

            await refetch();
            setComment('');
        }
    }, [
        comment,
        refetch,
        request.currentWorkflowStep,
        request.id,
        scopeChangeApi,
        selectedCriteria,
    ]);

    const sendContribution = useCallback(async () => {
        if (!contributeId) return;
        dispatch({ type: 'setContributeLoading', value: true });
        if (request.currentWorkflowStep) {
            try {
                await postContribution(
                    request.id,
                    request.currentWorkflowStep?.id,
                    contributeId,
                    scopeChangeApi,
                    comment
                );
                setComment('');
            } catch (e) {
                console.error(e);
            } finally {
                await refetch();
            }
        }
    }, [comment, contributeId, refetch, request.currentWorkflowStep, request.id, scopeChangeApi]);

    const onInitiate = useCallback(async () => {
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
    }, [refetch, request, scopeChangeApi]);

    const performingAction = useMemo(() => {
        return voidLoading || signLoading || initiateLoading || contributeLoading;
    }, [contributeLoading, initiateLoading, signLoading, voidLoading]);

    const InitiateButton = useCallback(
        () => (
            <div>
                {canInitiate && (
                    <Button onClick={onInitiate} variant="outlined" disabled={performingAction}>
                        {initiateLoading ? (
                            <Progress.Dots color="primary" />
                        ) : (
                            <span>Initiate request</span>
                        )}
                    </Button>
                )}
            </div>
        ),
        [canInitiate, initiateLoading, onInitiate, performingAction]
    );

    const VoidButton = useCallback(
        () => (
            <div>
                {canVoid && (
                    <span>
                        <Button
                            onClick={async () => await onVoidRequest()}
                            disabled={performingAction}
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
                )}
            </div>
        ),
        [canVoid, onVoidRequest, performingAction, request.isVoided, voidLoading]
    );

    const ContributeButton = useCallback(
        () => (
            <div>
                {contributeId && (
                    <Button onClick={sendContribution} disabled={performingAction}>
                        {contributeLoading ? (
                            <Progress.Dots color="primary" />
                        ) : (
                            <span> Contribute</span>
                        )}
                    </Button>
                )}
            </div>
        ),
        [contributeId, contributeLoading, performingAction, sendContribution]
    );

    const CommentField = () => (
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
    );

    const SignButton = useCallback(
        () => (
            <Inline>
                {signableCriterias && signableCriterias?.length > 1 && (
                    <>
                        <div style={{ minWidth: '250px' }}>
                            <Select
                                isClearable={true}
                                isSearchable={false}
                                options={signableCriterias.map((x): SelectOption => {
                                    return { label: x.value, value: x.id };
                                })}
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
                    disabled={!selectedCriteria || performingAction}
                    onClick={async () => {
                        dispatch({ type: 'setSignLoading', value: true });
                        await onSignStep().then(async () => await refetch());
                    }}
                >
                    {signLoading ? <Progress.Dots color="primary" /> : <div>Sign</div>}
                </Button>
            </Inline>
        ),
        [onSignStep, performingAction, refetch, selectedCriteria, signLoading, signableCriterias]
    );

    const ActionBar = useCallback(() => {
        if (request.isVoided) {
            return (
                <div>
                    <VoidButton />
                </div>
            );
        }

        switch (request.state) {
            case 'Draft': {
                return (
                    <div>
                        <ButtonContainer>
                            <InitiateButton />
                            <VoidButton />
                        </ButtonContainer>
                    </div>
                );
            }

            case 'Open': {
                return (
                    <div>
                        <CommentField />
                        <ButtonContainer>
                            <VoidButton />
                            <ContributeButton />
                            <SignButton />
                        </ButtonContainer>
                    </div>
                );
            }

            case 'Closed': {
                return <></>;
            }
        }
    }, [ContributeButton, InitiateButton, VoidButton, SignButton, request.state, request.isVoided]);

    return (
        <RequestActionsContainer>
            <ActionBar />
        </RequestActionsContainer>
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
    align-items: baseline;
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
    contributeFailed: false,
    initiateFailed: false,
    signFailed: false,
    voidFailed: false,
    canInitiate: false,
    canVoid: false,
};

interface NotifyEvents {
    contributeLoading: boolean;
    contributeFailed: boolean;
    initiateLoading: boolean;
    initiateFailed: boolean;
    voidLoading: boolean;
    voidFailed: boolean;
    signLoading: boolean;
    signFailed: boolean;
    canVoid: boolean;
    canInitiate: boolean;
}

type MutableStates =
    | 'setSignLoading'
    | 'setSignFailed'
    | 'setVoidFailed'
    | 'setInitiateFailed'
    | 'setContributeFailed'
    | 'setVoidLoading'
    | 'setInitiateLoading'
    | 'setContributeLoading'
    | 'setCanVoid'
    | 'setContributeId'
    | 'setCanInitiate';

interface Actions {
    type: MutableStates;
    value: boolean;
}

function tasksReducer(state: NotifyEvents, action: Actions): NotifyEvents {
    switch (action.type) {
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

        case 'setCanVoid': {
            return { ...state, canVoid: action.value };
        }

        case 'setCanInitiate': {
            return { ...state, canInitiate: action.value };
        }

        case 'setContributeFailed': {
            return { ...state, contributeFailed: action.value };
        }

        case 'setVoidFailed': {
            return { ...state, voidFailed: action.value };
        }

        case 'setSignFailed': {
            return { ...state, signFailed: action.value };
        }

        case 'setInitiateFailed': {
            return { ...state, initiateFailed: action.value };
        }

        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}
