import { tokens } from '@equinor/eds-tokens';
import { CellProps } from 'react-table';
import styled from 'styled-components';

const Link = styled.a`
    color: ${tokens.colors.interactive.primary__resting.hex};
    text-decoration: none;
    :hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;
type CellLinkProps<T extends Record<string, number | string>> = {
    content: T;
    url: string;
    currentKey: keyof T;
    linkTitle?: string;
};
export const CellWithLink = <T extends Record<string, number | string>>({
    value,
}: CellProps<T, CellLinkProps<T>>): JSX.Element => {
    if (value === null) {
        return <></>;
    }
    const { content, currentKey, url, linkTitle = 'Open in ProCoSys' } = value;

    return (
        <Link href={url} target={'_blank'} rel="noreferrer" title={linkTitle}>
            {content[currentKey]}
        </Link>
    );
};
