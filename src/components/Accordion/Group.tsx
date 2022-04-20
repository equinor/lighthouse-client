import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { ClickableIcon } from '../Icon/ClickableIcon';

interface GroupProps {
    onChevronClick: () => void;
    isExpanded: boolean;
    title: string;
    headerIcon?: JSX.Element;
}

export const Group = ({
    isExpanded,
    onChevronClick,
    title,
    headerIcon,
}: GroupProps): JSX.Element => {
    return (
        <GroupHeader>
            <LeftSection>
                {headerIcon}
                <div>{title}</div>
            </LeftSection>
            <ClickableIcon
                onClick={onChevronClick}
                name={isExpanded ? 'chevron_up' : 'chevron_down'}
            />
        </GroupHeader>
    );
};

const LeftSection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1em;
`;

const GroupHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    border-top: 1px solid ${tokens.colors.interactive.disabled__border.hex};
    border-bottom: 1px solid ${tokens.colors.interactive.disabled__border.hex};
`;
