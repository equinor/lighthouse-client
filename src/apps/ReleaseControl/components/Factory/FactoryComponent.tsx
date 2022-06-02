import { useEffect } from 'react';
import styled from 'styled-components';
import { SidesheetApi } from '@equinor/sidesheet';
import { createAtom } from '@equinor/atom';
import { ReleaseControlProcessForm } from '../Form/ReleaseControlProcessForm';

interface DisciplineReleaseControlFactoryComponentProps {
    actions: SidesheetApi;
}

export const DisciplineReleaseControlFactoryComponent = ({
    actions,
}: DisciplineReleaseControlFactoryComponentProps): JSX.Element => {
    useEffect(() => {
        disciplineReleaseControlFactoryContext.updateAtom(actions);
        actions.setTitle('Create Release control workflow');
        actions.setWidth(1550);
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

export const disciplineReleaseControlFactoryContext = createAtom<SidesheetApi>({} as SidesheetApi);
