import styled from 'styled-components';

export const PopoverContainer = styled.div`
    white-space: nowrap;

    hr {
        border: 1px solid #dcdcdc;
    }

    h5 {
        margin-top: 0;
        margin-bottom: 0;
    }

    p {
        margin: 0;
        font-size: 12px;
    }
`;
export const ProjectTitle = styled.p`
    font-weight: bold;
`;
export const ProjectDescription = styled.p`
    word-break: break-word;
    white-space: break-spaces;
`;
export const Statuses = styled.div`
    margin-top: 24px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 10px;

    > div {
        margin-right: 16px;

        &:last-child {
            margin: 0;
        }
    }
`;
