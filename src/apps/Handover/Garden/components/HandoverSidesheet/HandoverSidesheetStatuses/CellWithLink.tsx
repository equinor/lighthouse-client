import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { CellProps } from 'react-table';
import styled from 'styled-components';

const Link = styled.a`
    display: flex;
    align-items: center;
    gap: 4px;
`;

export const CellWithLink = <T extends Record<string, unknown>>({
    value,
}: CellProps<T, { content: string; url: string }>): JSX.Element => {
    const { content, url } = value;

    return (
        <Link
            style={{ display: 'flex', alignItems: 'center' }}
            href={url}
            target={'_blank'}
            rel="noreferrer"
            title="Open package in ProCoSys"
        >
            {content}
            <Icon
                size={24}
                color={tokens.colors.interactive.primary__resting.hex}
                name="external_link"
            />
        </Link>
    );
};
