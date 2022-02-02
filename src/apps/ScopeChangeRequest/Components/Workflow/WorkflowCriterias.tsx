import { Button, Progress, Tooltip } from '@equinor/eds-core-react';
import { DateTime } from 'luxon';
import styled from 'styled-components';
import { Criteria, WorkflowStep } from '../../Types/scopeChangeRequest';
import { WorkflowIcon } from './WorkflowIcon';
import { convertUtcToLocalDate } from './Utils/utcDateToLocal';
import { useState } from 'react';
import { searchPcs, SelectOption } from '../../Api/Search/PCS';
import { reassignCriteria } from '../../Api/ScopeChange/reassignPerson';
import { useScopeChangeAccessContext } from '../Sidesheet/Context/useScopeChangeAccessContext';
import AsyncSelect from 'react-select/async';
import { applyEdsComponents, applyEdsStyles, applyEDSTheme } from '../SearchableDropdown/applyEds';
import { SingleValue, Theme } from 'react-select';
import { useMutation } from 'react-query';

interface WorkflowCriteriasProps {
    step: WorkflowStep;
    criteria: Criteria;
}

export const WorkflowCriterias = ({ step, criteria }: WorkflowCriteriasProps): JSX.Element => {
    const stepStatus = statusFunc(step);

    const { setPerformingAction, performingAction, request, refetch } =
        useScopeChangeAccessContext();
    const [showReassign, setShowReassign] = useState<boolean>(false);

    const loadOptions = async (inputValue: string, callback: (options: SelectOption[]) => void) => {
        callback(await searchPcs(inputValue, 'person'));
    };

    interface ReassignArgs {
        value: string;
        type: 'RequireProcosysUserSignature';
    }
    const reassign = async ({ value, type }: ReassignArgs) => {
        await reassignCriteria(request.id, step.id, criteria.id, {
            type: type,
            value: value,
        });
    };

    const { mutateAsync, isLoading } = useMutation(reassign, {
        onSuccess: async () => {
            setShowReassign(false);
            await refetch();
        },
    });
    const date = convertUtcToLocalDate(new Date(criteria.signedAtUtc));
    const { day, month, year, hour, minute } = DateTime.fromJSDate(date).toObject();
    const paddedMinutes = minute.toString().length === 1 ? `0${minute}` : minute;

    return (
        <>
            <WorkflowStepViewContainer key={criteria.id}>
                <SplitInline>
                    <WorkflowIcon
                        status={stepStatus === 'Active' ? criteriaStatus(criteria) : stepStatus}
                        number={step.order + 1}
                    />
                    <Divider />
                    <WorkflowText>
                        <Tooltip
                            title={
                                !step.isCompleted
                                    ? `Signature from ${criteria.value} required.`
                                    : `Signed by ${criteria.signedBy.firstName} ${criteria.signedBy.lastName}`
                            }
                        >
                            <span>{step.name}</span>
                        </Tooltip>
                        {criteria.signedAtUtc ? (
                            <div
                                style={{ fontSize: '14px' }}
                            >{`${day}/${month}/${year} ${hour}:${paddedMinutes} - ${criteria.signedBy.firstName} ${criteria.signedBy.lastName} `}</div>
                        ) : (
                            <div style={{ fontSize: '14px' }}>{criteria.value}</div>
                        )}
                    </WorkflowText>
                </SplitInline>
                <div>
                    {step.isCurrent && (
                        <>
                            <Divider />
                            <Button
                                disabled={performingAction}
                                onClick={() => setShowReassign(!showReassign)}
                            >
                                Reassign
                            </Button>
                        </>
                    )}
                </div>
            </WorkflowStepViewContainer>
            {isLoading && <Progress.Dots color="primary" />}

            {showReassign && (
                <div
                    style={{
                        width: '600px',
                        borderBottom: '5px solid #6F6F6F',
                        fontSize: '16px',
                        margin: '0.5rem 0rem',
                    }}
                >
                    <AsyncSelect
                        cacheOptions={false}
                        loadOptions={loadOptions}
                        defaultOptions={false}
                        styles={applyEdsStyles()}
                        controlShouldRenderValue={true}
                        components={{ ...applyEdsComponents() }}
                        placeholder={`Type to search..`}
                        noOptionsMessage={(obj: { inputValue: string }) => {
                            if (!obj.inputValue || obj.inputValue.length === 0) {
                                return <></>;
                            } else {
                                return <div>No results</div>;
                            }
                        }}
                        isClearable
                        onChange={async (newValue: SingleValue<SelectOption>) => {
                            if (!newValue?.value) return;
                            setPerformingAction(true);
                            await mutateAsync({
                                type: 'RequireProcosysUserSignature',
                                value: newValue.value,
                            });
                            setPerformingAction(false);
                        }}
                        theme={(theme: Theme) => applyEDSTheme(theme)}
                    />
                </div>
            )}
        </>
    );
};

const SplitInline = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const statusFunc = (item: WorkflowStep): WorkflowStatus => {
    if (item.isCompleted) {
        return 'Completed';
    } else if (item.isCurrent) {
        return 'Active';
    } else {
        return 'Inactive';
    }
};

const criteriaStatus = (criteria: Criteria): WorkflowStatus => {
    if (criteria.signedAtUtc === null) {
        return 'Active';
    } else {
        return 'Completed';
    }
};

type WorkflowStatus = 'Completed' | 'Active' | 'Inactive' | 'Failed';

const WorkflowText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const Divider = styled.div`
    height: 9px;
    width: 0.5rem;
`;

const WorkflowStepViewContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
    width: -webkit-fill-available;
`;
