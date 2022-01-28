import { HandoverPackage } from '../../models/HandoverPackage';
import { FC, memo } from 'react';

import { Popover } from '@equinor/eds-core-react';
import { Status } from '../../utility/handoverItemMapping';
import {
    CommStatus,
    FlagUnsignedAction,
    IconsContainer,
    PopoverContainer,
    Status as StatusStyle,
    Statuses,
    WarningContainer,
    WarningText,
} from './styles';
import { WarningIcon } from '../WarningIcon';
import { SizeIcons } from '../SizeIcons';
import { FlagIcon } from '../FlagIcon';

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

type HandoverItemPopoverProps = {
    data: HandoverPackage;
    itemOptions: ItemOptions;
    anchorRef: React.RefObject<HTMLDivElement>;
    setOpenState: React.Dispatch<React.SetStateAction<boolean>>;
    isOpen: boolean;
};

const HandoverItemPopoverWrapper: FC<HandoverItemPopoverProps> = ({
    data,
    itemOptions,
    anchorRef,
    setOpenState,
    isOpen,
}) => {
    const { size, status, barColor, textColor, showWarningIcon, commStatusColor, mcPackageColor } =
        itemOptions;

    return (
        <Popover
            id="hover-popover"
            anchorEl={anchorRef.current}
            onClose={() => setOpenState(false)}
            open={isOpen}
            placement="bottom"
        >
            <Popover.Title>{`Comm.pkg: ${data.commpkgNo}`} </Popover.Title>
            <Popover.Content>
                <PopoverContainer>
                    <p style={{ fontWeight: 'bold' }}>Project (ProCoSys)</p>
                    <p>
                        {data.projectIdentifier}, {data.projectDescription}
                    </p>
                    <hr />
                    <CommStatus barColor={barColor} textColor={textColor}>
                        <strong>{`Milestone: ${status}`}</strong>
                        <span>
                            <SizeIcons status={status} size={size} />
                        </span>
                        <strong> {`Volume: ${data.volume} (${size})`}</strong>
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
                            {['OS', 'OK', 'PA'].includes(data.commpkgStatus)
                                ? data.commpkgStatus
                                : 'PB'}
                        </StatusStyle>
                    </Statuses>
                </PopoverContainer>
            </Popover.Content>
        </Popover>
    );
};

export const HandoverItemPopover = memo(HandoverItemPopoverWrapper);
