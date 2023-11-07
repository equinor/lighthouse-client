import { HandoverPackage } from '../../models/handoverPackage';
import { Status } from '../../utility/handoverItemMapping';
import {
    CommStatus,
    FlagUnsignedAction,
    IconsContainer,
    PopoverContainer,
    ProjectDescription,
    ProjectTitle,
    Statuses,
    WarningContainer,
    WarningText,
} from './styles';
import { Status as StatusStyle } from '../commonStyles';
import { FlagIcon, SizeIcons, WarningIcon } from '../Icons';

type ItemSize = 'small' | 'medium' | 'large';

export type ItemOptions = {
    size: ItemSize;
    status: Status;
    barColor: string;
    textColor: string;
    mcPackageColor: string;
    commStatusColor: string;
    showWarningIcon: boolean;
};

type PopoverContentProps = {
    data: HandoverPackage;
    itemOptions: ItemOptions;
};
export const PopoverContent = ({
    data,
    itemOptions: {
        barColor,
        commStatusColor,
        mcPackageColor,
        showWarningIcon,
        size,
        status,
        textColor,
    },
}: PopoverContentProps) => {
    return (
        <PopoverContainer>
            <ProjectTitle>Project (ProCoSys)</ProjectTitle>
            <p>
                {data.projectIdentifier}, {data.projectDescription}
            </p>
            <ProjectDescription>{data.description}</ProjectDescription>
            <hr />
            <CommStatus barColor={barColor} textColor={textColor}>
                <strong>{`Milestone: ${status}`}</strong>
                <span>
                    <SizeIcons status={status} size={size} />

                    <strong> {`Volume: ${data.volume} (${size})`}</strong>
                </span>
            </CommStatus>
            <IconsContainer>
                {showWarningIcon && (
                    <WarningContainer>
                        <WarningIcon />
                        <WarningText>
                            <strong>NB:</strong>
                            <p>RFCC with MC status OS</p>
                        </WarningText>
                    </WarningContainer>
                )}
                {data.hasUnsignedActions && (
                    <FlagUnsignedAction>
                        <FlagIcon color={textColor} /> <p>Unsigned actions</p>
                    </FlagUnsignedAction>
                )}
            </IconsContainer>
            <Statuses>
                <h5>MC status</h5>
                <StatusStyle color={mcPackageColor}>
                    {['OS', 'OK', 'PA'].includes(data.mcStatus) ? data.mcStatus : 'PB'}
                </StatusStyle>

                <h5>CommPkg status</h5>
                <StatusStyle color={commStatusColor}>
                    {['OS', 'OK', 'PA'].includes(data.commpkgStatus) ? data.commpkgStatus : 'PB'}
                </StatusStyle>
            </Statuses>
        </PopoverContainer>
    );
};
