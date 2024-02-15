import { Button, Icon } from '@equinor/eds-core-react-old';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

const Header = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
`;

const LinkContent = styled.a`
    display: flex;
    align-items: center;
    text-decoration: none;
`;

const Title = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

type SidesheetHeaderContentProps = {
    title: string;

    /** URL to current package. Should redirect to test env if not prod */
    url: string;

    /** Text to be displayed in button
     * @default- Open in ProCoSys
     */
    buttonContent?: string;
};
/**
 * Component for displaying a header in a Garden sidesheet
 * containing a title, button and redirect icon.
 */
export const SidesheetHeaderContent = ({
    title,
    url,
    buttonContent = 'Open in ProCoSys',
}: SidesheetHeaderContentProps) => {
    return (
        <Header>
            <Title>{title}</Title>
            <LinkContent target="_BLANK" href={url} rel="noreferrer">
                <Button key="linkToProcosys" variant="ghost">
                    {buttonContent}
                </Button>
                <Icon
                    size={24}
                    color={tokens.colors.interactive.primary__resting.hex}
                    name="external_link"
                />
            </LinkContent>
        </Header>
    );
};
