import styled from 'styled-components';
import { HandoverPackage } from '../../models/handoverPackage';

type SidesheetHeaderProps = {
    handoverPackage: HandoverPackage;
};

const Description = styled.div`
    margin: 0 8px 8px;
`;

const Title = styled.h2`
    height: 5px;
    display: flex;
    align-items: center;
    margin-top: 0px;
`;

export const SidesheetHeader = ({ handoverPackage }: SidesheetHeaderProps): JSX.Element => {
    const { description } = handoverPackage;

    return (
        <>
            <Title>
                {/* {commpkgNo} */}
                {/* <a href={url} target={'_blank'} rel="noreferrer">
                    <Button variant="ghost">
                        <Icon
                            color={tokens.colors.interactive.primary__resting.hex}
                            name="external_link"
                        />
                    </Button>
                </a> */}
            </Title>
            <Description>{description}</Description>
        </>
    );
};
