import { statusColorMap } from '@equinor/GardenUtils';
import { Loop } from '../../types';
import { NoStatus } from '../NoStatus';
import {
    PopoverContainer,
    ProjectDescription,
    ProjectTitle,
    Statuses,
} from './popoverContent.styles';
import { Status } from './Status';
type PopoverContentProps = {
    loop: Loop;
};
export const PopoverContent = ({ loop }: PopoverContentProps) => {
    return (
        <PopoverContainer>
            <ProjectTitle> Project (ProCoSys)</ProjectTitle>
            <p>{loop.project}</p>
            <ProjectDescription>{loop.description}</ProjectDescription>
            <hr />

            <Statuses>
                <h5>MC content status</h5>
                {loop.loopContentStatus ? (
                    <Status color={statusColorMap[loop.loopContentStatus]}>
                        {loop.loopContentStatus}
                    </Status>
                ) : (
                    <NoStatus size="medium" />
                )}
                <h5>Loop checklist status</h5>
                {loop.status ? (
                    <Status color={statusColorMap[loop.status]}>{loop.status}</Status>
                ) : (
                    <NoStatus size="medium" />
                )}
            </Statuses>
        </PopoverContainer>
    );
};
