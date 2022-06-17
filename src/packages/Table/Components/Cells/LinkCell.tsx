import React, { HTMLAttributes, useCallback } from 'react';
import { CellProps } from 'react-table';
import { CellRenderProps, TableData } from '../../Types/types';
import { Icon } from '@equinor/eds-core-react';
import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';
const LinkCell = <T extends TableData>(props: CellProps<T, CellRenderProps<T>>) => {
    const {
        value: { content },
    } = props;

    const handleOnClick = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            window.open(content as unknown as string);
        },
        [content]
    );

    return (
        <Icon
            onClick={(e) => handleOnClick(e)}
            name="external_link"
            style={{ cursor: 'pointer' }}
        ></Icon>
    );
};

const LinkStyle = styled.a`
    color: ${tokens.colors.interactive.primary__resting.hex};
    text-decoration: none;
    :hover {
        text-decoration: underline;
        cursor: pointer;
    }
`;
type CustomLinkCellWithTextDecorationProps<T extends string | number | boolean | null> = {
    contentToBeDisplayed: T;
    cellAttributeFunction?: (content: T) => HTMLAttributes<HTMLElement>;
    url: string;
};
const CustomLinkCellWithTextDecoration = <T extends string | number | boolean | null>({
    contentToBeDisplayed,
    url,
    cellAttributeFunction,
}: CustomLinkCellWithTextDecorationProps<T>) => {
    const handleOnClick = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            window.open(url);
        },
        [url]
    );
    return (
        <LinkStyle onClick={handleOnClick} href={url} target={'_blank'}>
            {contentToBeDisplayed}
        </LinkStyle>
    );
};

export { CustomLinkCellWithTextDecoration, LinkCell };
