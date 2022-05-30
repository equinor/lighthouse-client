import { tokens } from '@equinor/eds-tokens';
import { MouseEvent, useCallback } from 'react';
import styled from 'styled-components';
type TextLinkCellProps = {
    url: string;
    cellContent: string;
};
const Link = styled.a`
    color: ${tokens.colors.interactive.primary__resting.hex};
    cursor: pointer;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;
export const TextLinkCell = ({ cellContent, url }: TextLinkCellProps): JSX.Element | null => {
    const handleOnClick = useCallback(
        (e: MouseEvent) => {
            e.preventDefault();
            window.open(url);
        },
        [url]
    );

    if (cellContent === undefined) return null;

    return (
        <Link onClick={handleOnClick} href={url}>
            {cellContent}
        </Link>
    );
};
