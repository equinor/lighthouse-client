// import { useState } from 'react';
// import { useAtom } from '@dbeining/react-atom';
// import { Modal } from '@equinor/modal';
// import { Contributor, Criteria, CriteriaStatus } from '@equinor/Workflow';

// interface CriteriaRenderProps {
//     name: string;
//     criteria: Criteria;
//     contributors: Contributor[];
//     stepIndex: number;
//     stepStatus: CriteriaStatus;
//     order: number;
//     isLastCriteria: boolean;
//     stepId: string;
//     hideOptions?: boolean;
// }

// export const CriteriaRender = ({
//     isLastCriteria,
//     name,
//     contributors,
//     criteria,
//     stepIndex,
//     stepStatus,
//     order,
//     stepId,
//     hideOptions,
// }: CriteriaRenderProps): JSX.Element => {
//     const { workflowStepsLength, isPast } = useReleaseControlContext(
//         ({ releaseControl: { id, workflowSteps, currentWorkflowStep } }) => ({
//             requestId: id,
//             workflowStepsLength: workflowSteps.length,
//             isPast:
//                 (currentWorkflowStep?.order ?? 0) >
//                 (workflowSteps?.find(({ id }) => id === stepId)?.order ?? 0),
//         })
//     );

//     const state = useAtom(actionWithCommentAtom);

//     const date = convertUtcToLocalDate(new Date(criteria.signedAtUtc || new Date()));
//     const formattedDate = dateToDateTimeFormat(date);

//     const [showAddContributor, setShowAddContributor] = useState(false);
//     return (
//         <WorkflowWrapper key={criteria.id}>
//             <WorklowIconAndLine>
//                 <WorkflowIcon status={stepStatus} number={order + 1} />

//                 {stepIndex !== workflowStepsLength - 1 && <VerticalLine active={isPast} />}
//             </WorklowIconAndLine>
//             <WorkflowRow>
//                 <RowContent>
//                     {state && state.criteriaId === criteria.id && state.action === 'Reassign' ? (
//                         <CriteriaActionOverlay />
//                     ) : (
//                         <>
//                             {state &&
//                                 state.criteriaId === criteria.id &&
//                                 state.action !== 'Reassign' && (
//                                     <Modal
//                                         title={'Write a comment'}
//                                         content={
//                                             <SignWithCommentModal
//                                                 action={state.action}
//                                                 buttonText={state.buttonText}
//                                                 criteriaId={state.criteriaId}
//                                                 stepId={state.stepId}
//                                             />
//                                         }
//                                     />
//                                 )}
//                             <span>
//                                 <div>{name}</div>
//                                 {criteria.signedAtUtc ? (
//                                     <DetailText>
//                                         <div>{`${formattedDate} - ${criteria?.signedBy?.firstName} ${criteria?.signedBy?.lastName} `}</div>
//                                         {criteria.signedComment && <q>{criteria.signedComment}</q>}
//                                     </DetailText>
//                                 ) : (
//                                     <DetailText>{criteria.valueDescription}</DetailText>
//                                 )}
//                             </span>
//                             {!hideOptions && (
//                                 <CriteriaActionBar
//                                     stepId={stepId}
//                                     criteriaId={criteria.id}
//                                     stepOrder={order}
//                                     setShowAddContributor={() => setShowAddContributor(true)}
//                                 />
//                             )}
//                         </>
//                     )}
//                 </RowContent>
//             </WorkflowRow>
//             {showAddContributor && (
//                 <WorkflowRow>
//                     <AddContributor close={() => setShowAddContributor(false)} stepId={stepId} />
//                 </WorkflowRow>
//             )}
//             {isLastCriteria && !isPast && (
//                 <>
//                     {contributors.map((contributor) => (
//                         <WorkflowRow key={contributor.id}>
//                             <ContributorRender
//                                 key={contributor.id}
//                                 contributor={contributor}
//                                 stepId={stepId}
//                             />
//                         </WorkflowRow>
//                     ))}
//                 </>
//             )}
//         </WorkflowWrapper>
//     );
// };

//TODO - replace with code above (build fails without this)
export const Criteria = (): JSX.Element => {
    return <>TEMP</>;
};