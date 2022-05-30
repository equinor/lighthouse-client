import {
    PopoverContainer,
    PopoverProgressBar,
    PopoverStatus,
    SizeIcons,
} from '@equinor/GardenUtils';
import { CommissioningStatus, McPackage, TagSize } from '../../types';
import { ProjectDescription, ProjectTitle, Statuses } from './PopoverContent.styles';
export type ItemOptions = {
    status: CommissioningStatus;
    backgroundColor: string;
    contentsColor: string;
    size: TagSize;
    mcDotColor: string;
    commDotColor: string;
};
type PopoverContentProps = {
    data: McPackage;
    options: ItemOptions;
};
export const PopoverContent = ({
    data,
    options: { backgroundColor, contentsColor, size, status, commDotColor, mcDotColor },
}: PopoverContentProps) => {
    return (
        <PopoverContainer>
            <ProjectTitle>Project (ProCoSys)</ProjectTitle>
            <p>
                {data.projectIdentifier}, {data.projectDescription}
            </p>
            <ProjectDescription>{data.description}</ProjectDescription>
            <hr />
            <PopoverProgressBar barColor={backgroundColor} textColor={contentsColor}>
                <span>
                    <strong>Milestone: {status}</strong>
                </span>
                <span>
                    <SizeIcons color={contentsColor} size={size} />
                    <strong>
                        Volume: {data.tagVolume} ({size})
                    </strong>
                </span>
            </PopoverProgressBar>
            <Statuses>
                <h5>MC status</h5>
                <PopoverStatus color={mcDotColor}>
                    {['OS', 'OK', 'PA'].includes(data.mcStatus) ? data.mcStatus : 'PB'}
                </PopoverStatus>

                <h5>Comm status</h5>
                <PopoverStatus color={commDotColor}>
                    {['OS', 'OK', 'PA'].includes(data.commPkgStatus) ? data.commPkgStatus : 'PB'}
                </PopoverStatus>
            </Statuses>
        </PopoverContainer>
    );
};
