import styled from 'styled-components';
import { Field } from '../Field';
import { SectionRow } from '../../../../Styles/Section';
import { useScopeChangeAccessContext } from '../../../Sidesheet/Context/useScopeChangeAccessContext';
import { Workflow } from '../../../Workflow/Workflow';
import { StidDocumentResolver } from '../../Components/StidDocumentResolver';
import { Attachments } from '../../Components/Attachments';
import { RelatedObjects } from '../../Components/RelatedObjects';
import { OriginLink } from '../../Components/OriginLink';

export const SplitView = (): JSX.Element => {
    const { request } = useScopeChangeAccessContext();

    return (
        <SplitScreen>
            <div style={{ display: 'flex', flexBasis: '50%', flexDirection: 'column' }}>
                <h2>Request</h2>
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

                <Field
                    label={'Guesstimate mhrs'}
                    customLabel={{ fontSize: '12px' }}
                    customValue={{ fontSize: '16px' }}
                    value={request.guesstimateHours}
                />

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
                    label="Documents"
                    value={<StidDocumentResolver inputDocuments={request.documents} />}
                />
                <Field
                    customLabel={{ fontSize: '18px', bold: true }}
                    label="Attachments"
                    value={<Attachments attachments={request.attachments} requestId={request.id} />}
                />
            </div>
            <div style={{ display: 'flex', flexBasis: '50%', flexDirection: 'column' }}>
                <div>
                    <h2>Workflow</h2>
                    <Workflow />
                </div>
                <div>
                    <h2>Log</h2>
                    <div></div>
                </div>
            </div>
        </SplitScreen>
    );
};

const SplitScreen = styled.div`
    display: flex;
    flex-direction: row;
    flex-basis: 0;
    overflow: scroll;
`;

/**
 //TODO:
 * Do some CSS magic, Calculate height of DetailViewContainer and subtract RequestActionsContainer to make overflow work properly
 */
