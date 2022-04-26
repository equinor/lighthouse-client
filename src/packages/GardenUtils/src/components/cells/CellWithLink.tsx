import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { CellProps } from 'react-table';
import styled from 'styled-components';

const Link = styled.a`
    display: flex;
    align-items: center;
    gap: 4px;
`;
type CellLinkProps = {
    content: string;
    url: string;
    linkTitle?: string;
};
export const CellWithLink = <T extends Record<string, unknown>>({
    value: { content, url, linkTitle = 'Open package in ProCoSys' },
}: CellProps<T, CellLinkProps>): JSX.Element => {
    return (
        <Link href={url} target={'_blank'} rel="noreferrer" title={linkTitle}>
            {content}
            <Icon
                size={24}
                color={tokens.colors.interactive.primary__resting.hex}
                name="external_link"
            />
        </Link>
    );
};
