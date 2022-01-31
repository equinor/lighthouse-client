import { Button, Progress, TextField } from '@equinor/eds-core-react';
import { useCallback, useEffect, useReducer, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import styled from 'styled-components';
import { useClientContext, useHttpClient } from '../../../../../Core/Client/Hooks';
import { spawnConfirmationDialog } from '../../../../../Core/ConfirmationDialog/Functions/spawnConfirmationDialog';
import { patchScopeChange, patchWorkflowStep } from '../../../Api';
import { canSign as apiCheckSign } from '../../../Api/ScopeChange/Access/canSign';
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
    const { internal } = useClientContext();
    const [comment, setComment] = useState<string | undefined>(undefined);
    const { scopeChange: scopeChangeApi } = useHttpClient();
    const [selectedCriteria, setSelectedCriteria] = useState<string | undefined>(undefined);
    const [userId, setUserId] = useState<string | undefined>();
    const [signableCriterias, setSignableCriterias] = useState<Criteria[] | undefined>();
    const [contributeId, setContributeId] = useState<string | undefined>();

    async function checkCanSign(): Promise<Criteria[]> {
        if (!request.currentWorkflowStep || !request.currentWorkflowStep.criterias) return [];
        const validCriterias: Criteria[] = [];
        const unsignedCriterias = request.currentWorkflowStep.criterias.filter(
            (x) => x.signedState === null
        );
        unsignedCriterias.forEach(async (criteria) => {
            if (!request.currentWorkflowStep?.id) return;
            const allowed = await apiCheckSign(
                request.id,
                request.currentWorkflowStep.id,
                criteria.id
            );
            if (allowed.canPatch) {
                validCriterias.push(criteria);
            }
        });
        return validCriterias;
    }

    async function checkCanContribute(): Promise<void> {
        if (!request.currentWorkflowStep || !request.currentWorkflowStep.criterias || !userId)
            return;
        setContributeId(
            request.currentWorkflowStep.contributors.find(
                (x) => x.person.oid === userId && x.contribution === null
            )?.id
        );
    }

    const checkPermissions = useCallback(async () => {
        const availableToSign = await checkCanSign();
        if (availableToSign.length === 1) {
            setSelectedCriteria(availableToSign[0].id);
        }
        setSignableCriterias(availableToSign);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [request]);

    useEffect(() => {
        checkPermissions();
    }, [checkPermissions, request]);

    useEffect(() => {
        setUserId(internal.authProvider.getCurrentUser()?.localAccountId);
        checkCanContribute();
    }, [internal]);

    const [
        {
            voidLoading,
            signLoading,
            initiateLoading,
            contributeLoading,
            canInitiate,
            canSign,
            canVoid,
            // contributeFailed,
            // initiateFailed,
            // signFailed,
            // voidFailed,
        },
        dispatch,
    ] = useReducer(tasksReducer, initial);

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
            const sign = async () =>
                await patchWorkflowStep(
                    request.id,
                    currentStepId,
                    selectedCriteria,
                    scopeChangeApi,
                    comment
                );
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
                            {canInitiate && (
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
                            )}
                        </>
                    )}
                    {contributeId && (
                        <Button onClick={sendContribution} disabled={contributeLoading}>
                            {contributeLoading ? (
                                <Progress.Dots color="primary" />
                            ) : (
                                <span> Contribute</span>
                            )}
                        </Button>
                    )}

                    {canVoid && (
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
                    )}

                    {canSign && (
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
                                disabled={!selectedCriteria || signLoading}
                                onClick={onSignStep}
                            >
                                {signLoading ? <Progress.Dots color="primary" /> : <div>Sign</div>}
                            </Button>
                        </Inline>
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
    contributeFailed: false,
    initiateFailed: false,
    signFailed: false,
    voidFailed: false,
    canInitiate: false,
    canSign: false,
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
    canSign: boolean;
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
