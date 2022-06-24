import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    width: fit-content;
    font-weight: 400;
    font-size: 13px;
`;
type StatusCircleProps = {
    statusColor: string;
};
const StatusCircle = styled.div<StatusCircleProps>`
    background-color: ${(props) => props.statusColor};
    height: 12px;
    width: 12px;
    border-radius: 50%;
`;
type StatusProps = {
    content: string;
    statusColor: string;
};
export const Status = ({ content, statusColor }: StatusProps) => {
    return (
        <Wrapper>
            <StatusCircle statusColor={statusColor} />
            <span>{content}</span>
        </Wrapper>
    );
};
