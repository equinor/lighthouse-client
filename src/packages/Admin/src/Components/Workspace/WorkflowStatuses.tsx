import { ButtonText, Loading, NewButton } from '../../../styles/styles';
import { getWorkflowStatuses, workflowStatusesKey } from '@equinor/Workflow';
import { StatusesTable } from './StatusesTable';
import { useState } from 'react';
import { Modal } from '@equinor/modal';
import { CreateStatusModal } from '../Modal/CreateStatusModal';
import { EditStatusModal } from '../Modal/EditStatusModal';
import { useQuery } from 'react-query';
import { useAdminContext } from '../../Hooks/useAdminContext';
import { DeleteWorkflowStatusModal } from '../Modal/DeleteWorkflowStatusModal';

export const WorkflowStatuses = (): JSX.Element | null => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const workflowOwner = useAdminContext((s) => s.workflowOwner);
  const { data, error } = useQuery(workflowStatusesKey(), () => getWorkflowStatuses(workflowOwner));

  const isDeleting = useAdminContext((s) => s.deletingStatus);

  if (error) {
    return (
      <Loading>
        <div>Failed to load statuses</div>
      </Loading>
    );
  }

  return (
    <>
      <NewButton onClick={() => setIsCreating(true)}>
        <ButtonText>Add status</ButtonText>
      </NewButton>
      <StatusesTable statuses={data ?? []} setIsEditing={setIsEditing} />
      {isCreating && (
        <Modal
          title={'Create workflow status'}
          content={<CreateStatusModal setIsCreating={setIsCreating} />}
        />
      )}
      {isEditing && (
        <Modal
          title={'Edit workflow status'}
          content={<EditStatusModal setIsEditing={setIsEditing} />}
        />
      )}
      {isDeleting && (
        <Modal title={'Delete workflow status?'} content={<DeleteWorkflowStatusModal />} />
      )}
    </>
  );
};
