import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

interface LinkGroupProps {
    maxLinks: number;
    links: JSX.Element[];
    overflowLink: string;
}

export const LinkGroup = ({ links, maxLinks, overflowLink }: LinkGroupProps): JSX.Element => {
    
    const renderedLinks = links.slice(0, maxLinks);

    return (
        <>
            { links.length >= maxLinks ? (
                <Link href={overflowLink} target="_blank" hideUnderline>
                    <span>{links.length} links</span>
                </Link> ): renderedLinks 
            }
        </>
    );
};


const Link = styled.a`
    color: ${tokens.colors.interactive.primary__resting.hex};
    text-decoration: ${({ hideUnderline }: { hideUnderline: boolean }) =>
        hideUnderline ? 'none' : 'underline'};
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;