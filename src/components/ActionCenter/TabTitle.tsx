import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

interface TabTitleProps {
    titleName: string;
    count: number;
}
export const TabTitle = ({ count, titleName }: TabTitleProps): JSX.Element => {
    count = 88;
    return (
        <Header>
            {titleName}
            <GreenCircle>{count > 99 ? '∞' : count}</GreenCircle>
        </Header>
    );
};

const Header = styled.div`
    display: flex;
    width: 100%;
    gap: 0.5em;
    justify-content: center;
`;

const GreenCircle = styled.div`
    justify-content: center;
    align-items: center;
    display: flex;
    border-radius: 50%;
    width: 14px;
    height: 12px;
    border: 2px solid ${tokens.colors.interactive.primary__resting.hex};
    padding-top: 2px;
    font-size: 12px;
    color: white;
    background: ${tokens.colors.interactive.primary__resting.hex};
`;
