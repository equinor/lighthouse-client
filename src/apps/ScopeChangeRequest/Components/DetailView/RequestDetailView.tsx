import { Button, CircularProgress, TextField } from '@equinor/eds-core-react';
import { SectionRow } from '../../Styles/Section';
import { ScopeChangeRequest, ScopeChangeRequestFormModel } from '../../Types/scopeChangeRequest';
import { Workflow } from '../Workflow/Workflow';
import { Field } from './Components/Field';
import { useEffect, useMemo, useState } from 'react';
import { patchScopeChange, patchWorkflowStep } from '../../Api';
import { postContribution } from '../../Api/ScopeChange/postContribution';
import { StidDocumentResolver } from './Components/StidDocumentResolver';
import { Attachments } from './Components/Attachments';
import { RelatedObjects } from './Components/RelatedObjects';
import {
    RequestActionsContainer,
    LogMessage,
    HorizontalDivider,
    DetailViewContainer,
    ButtonContainer,
} from './requestDetailViewStyles';
import styled from 'styled-components';
import Select, { SingleValue } from 'react-select';
import { applyEDSTheme } from '../SearchableDropdown/applyEds';
import { useClientContext } from '@equinor/portal-client';
import { useHttpClient } from '@equinor/portal-client';
import { spawnConfirmationDialog } from '../../../../Core/ConfirmationDialog/Functions/spawnConfirmationDialog';

interface RequestDetailViewProps {
    request: ScopeChangeRequest;
    setEditMode: () => void;
    refetch: () => Promise<void>;
}

export const RequestDetailView = ({ request, refetch }: RequestDetailViewProps): JSX.Element => {
    const [comment, setComment] = useState<string | undefined>(undefined);
    const { scopeChange: scopeChangeApi } = useHttpClient();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedCriteria, setSelectedCriteria] = useState<string | undefined>(undefined);

    const { internal } = useClientContext();

    const [userId, setUserId] = useState<string | undefined>();

    const onInitiate = async () => {
        setIsLoading(true);
        const scopeChange: ScopeChangeRequestFormModel = {
            ...request,
            actualChangeHours: request.actualChangeHours,
            estimatedChangeHours: request.estimatedChangeHours,
            category: request.category,
            description: request.description,
            guesstimateDescription: request.guesstimateDescription,
            guesstimateHours: request.guesstimateHours,
            id: request.id,
            origin: request.origin,
            phase: request.phase,
            title: request.title,
            commissioningPackageNumbers:
                request.commissioningPackages.map((x) => x.procosysNumber) || [],
            systemIds: request.systems.map((x) => x.procosysId) || [],
            tagNumbers: request.tags.map((x) => x.procosysNumber) || [],
            documentNumbers: request.documents.map((x) => x.stidDocumentNumber) || [],
        };
        const payload = {
            ...scopeChange,
            setAsOpen: true,
        };

        await patchScopeChange(payload, scopeChangeApi);
        await refetch();
        setIsLoading(false);
    };

    interface LogEntry {
        value: string;
        date: string;
        name: string;
    }

    const logValues: LogEntry[] = useMemo(() => {
        const logArray: LogEntry[] = [];

        if (!request.workflowSteps) {
            return [];
        }
        request.workflowSteps.map((x) => {
            x.criterias.map((x) => {
                x.signedComment &&
                    logArray.push({
                        value: x.signedComment,
                        date: x.signedAtUtc,
                        name: `${x.signedBy.firstName} ${x.signedBy.lastName}`,
                    });
            });
        });
        return logArray;
    }, [request]);

    interface SelectOption {
        label: string;
        value: string;
    }

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

    const onSignStep = async () => {
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
    };

    const sendContribution = async () => {
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
    };

    useEffect(() => {
        setUserId(internal.authProvider.getCurrentUser()?.localAccountId);
    }, [internal]);

    return (
        <Wrapper>
            <DetailViewContainer>
                <Field
                    label={'Title'}
                    customLabel={{ fontSize: '12px' }}
                    customValue={{ fontSize: '16px' }}
                    value={request.title}
                />
                <SectionRow>
                    <Field
                        label={'Phase'}
                        customLabel={{ fontSize: '12px' }}
                        customValue={{ fontSize: '16px' }}
                        value={request.phase}
                    />
                    <Field
                        label={'Status'}
                        customLabel={{ fontSize: '12px' }}
                        customValue={{ fontSize: '16px' }}
                        value={request.state}
                    />
                </SectionRow>
                <SectionRow>
                    <Field
                        label={'Change category'}
                        customLabel={{ fontSize: '12px' }}
                        customValue={{ fontSize: '16px' }}
                        value={request.category}
                    />
                    <Field
                        label={'Change origin'}
                        customLabel={{ fontSize: '12px' }}
                        customValue={{ fontSize: '16px' }}
                        value={request.origin}
                    />
                </SectionRow>
                <Field
                    label={'Description'}
                    customLabel={{ fontSize: '12px' }}
                    customValue={{ fontSize: '16px' }}
                    value={request.description}
                />
                <SectionRow>
                    <Field
                        label={'Guesstimate mhrs'}
                        customLabel={{ fontSize: '12px' }}
                        customValue={{ fontSize: '16px' }}
                        value={request.guesstimateHours}
                    />
                    <Field
                        label={'Guesstimate description'}
                        customLabel={{ fontSize: '12px' }}
                        customValue={{ fontSize: '16px' }}
                        value={request.guesstimateDescription}
                    />
                </SectionRow>

                <Field
                    label={'Related objects'}
                    value={
                        <RelatedObjects
                            systems={request.systems}
                            commPkgs={request.commissioningPackages}
                            tags={request.tags}
                        />
                    }
                />

                <Field
                    customLabel={{ fontSize: '18px', bold: true }}
                    label={'Workflow'}
                    value={<Workflow request={request} refetch={refetch} />}
                />
                <Field
                    customLabel={{ fontSize: '18px', bold: true }}
                    label="Documents"
                    value={<StidDocumentResolver inputDocuments={request.documents} />}
                />
                <Field
                    customLabel={{ fontSize: '18px', bold: true }}
                    label="Attachments"
                    value={<Attachments attachments={request.attachments} requestId={request.id} />}
                />

                <Field
                    customLabel={{ fontSize: '18px', bold: true }}
                    label="Log"
                    value={
                        <div>
                            {logValues.map((x) => {
                                return (
                                    <LogMessage key={x.value + x.date}>
                                        <span style={{ fontSize: '10px' }}>
                                            {new Date(x.date).toLocaleDateString()} by {x.name}
                                        </span>
                                        <span style={{ fontSize: '16px' }}>
                                            &quot;{x.value}&quot;
                                        </span>
                                    </LogMessage>
                                );
                            })}
                        </div>
                    }
                />
            </DetailViewContainer>

            {request.state !== 'Closed' && (
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
                                <Button onClick={onInitiate} variant="outlined">
                                    Initiate request
                                </Button>
                            </>
                        )}
                        {request.currentWorkflowStep?.contributors.some(
                            (x) => x.person.oid === userId && x.contribution === null
                        ) && <Button onClick={sendContribution}>Contribute</Button>}
                        {request.state === 'Open' && (
                            <>
                                <span>
                                    {/* <Button variant="outlined" color="danger">
                                            Void Request
                                        </Button> */}
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
                                                    onChange={(
                                                        newValue: SingleValue<SelectOption>
                                                    ) => {
                                                        setSelectedCriteria(newValue?.value);
                                                    }}
                                                    theme={applyEDSTheme}
                                                />
                                            </div>
                                        </>
                                    )}
                                    <Button
                                        disabled={!selectedCriteria || isLoading}
                                        onClick={onSignStep}
                                    >
                                        {isLoading ? (
                                            <CircularProgress value={0} size={48} />
                                        ) : (
                                            <div>Sign</div>
                                        )}
                                    </Button>
                                </Inline>
                            </>
                        )}
                    </ButtonContainer>
                </RequestActionsContainer>
            )}
        </Wrapper>
    );
};

const Inline = styled.div`
    display: flex;
    align-items: flex-end;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

/**
 //TODO:
 * Do some CSS magic, Calculate height of DetailViewContainer and subtract RequestActionsContainer to make overflow work properly
 */
