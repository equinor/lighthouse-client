import { useEffect } from 'react';
import styled from 'styled-components';
import { SidesheetApi, getSidesheetContext } from '@equinor/sidesheet';
import { createAtom } from '@equinor/atom';
import { ReleaseControlProcessForm } from '../Form/ReleaseControlProcessForm';
import { deref } from '@dbeining/react-atom';
import { DRCFormAtomApi } from '../../Atoms/formAtomApi';

interface PipingAndHeatTraceFactoryComponentProps {
  actions: SidesheetApi;
}

export const PipingAndHeatTraceFactoryComponent = ({
  actions,
}: PipingAndHeatTraceFactoryComponentProps): JSX.Element => {
  useEffect(() => {
    pipingAndHeatTraceFactoryContext.updateAtom(actions);
    actions.setHasUnsavedChanges(true);
    actions.setTitle('Create Release control workflow');
    actions.setWidth(1550);

    return () => {
      deref(getSidesheetContext()).SidesheetComponent !== ReleaseControlProcessForm &&
        DRCFormAtomApi.clearState();
    };
  }, []);

  return (
    <>
      {/* <FormBanner /> */}
      <Wrapper>
        <ReleaseControlProcessForm />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  height: calc(100% - 50px);
  justify-content: space-between;
`;

export const pipingAndHeatTraceFactoryContext = createAtom<SidesheetApi>({} as SidesheetApi);
