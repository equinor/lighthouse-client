import { useMemo } from 'react';

import { SectionRow } from '../../Styles/Section';
import { ScopeChangeRequest } from '../../Types/scopeChangeRequest';
import { Workflow } from '../Workflow/Workflow';
import { Field } from './Components/Field';
import { StidDocumentResolver } from './Components/StidDocumentResolver';
import { Attachments } from './Components/Attachments';
import { RelatedObjects } from './Components/RelatedObjects';
import { LogMessage, DetailViewContainer } from './requestDetailViewStyles';
import styled from 'styled-components';
import { OriginLink } from './Components/OriginLink';
import { RequestActionBar } from './Components/RequestActionBar';

interface RequestDetailViewProps {
    request: ScopeChangeRequest;
    setEditMode?: React.Dispatch<React.SetStateAction<boolean>>;
    refetch: () => Promise<void>;
}

export const RequestDetailView = ({ request, refetch }: RequestDetailViewProps): JSX.Element => {
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
                        value={
                            <OriginLink type={request.originSource} id={request.originSourceId} />
                        }
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
                    customLabel={{ fontSize: '18px', bold: true }}
                    label={'References'}
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

            {request.state !== 'Closed' && <RequestActionBar request={request} refetch={refetch} />}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

/**
 //TODO:
 * Do some CSS magic, Calculate height of DetailViewContainer and subtract RequestActionsContainer to make overflow work properly
 */
