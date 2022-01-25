import styled from 'styled-components';
import { CommissioningPackage } from '../../../Types/scopeChangeRequest';

interface ProcosSysCommPkgsProps {
    commPkgs: CommissioningPackage[];
}

export const ProcosSysCommPkgs = ({ commPkgs }: ProcosSysCommPkgsProps): JSX.Element => {
    return (
        <Wrapper>
            {commPkgs &&
                commPkgs.map((x) => (
                    <CommPkgWrapper key={x.id}>
                        {/* TODO: comm pkgs icon */}

                        <Spacer />
                        <Link
                        // href={`https://procosys.equinor.com/JOHAN_CASTBERG/Completion#Tag|${x.procosysId}`}
                        // target="_blank"
                        >
                            CommPkg_{x.procosysNumber}
                        </Link>
                    </CommPkgWrapper>
                ))}
        </Wrapper>
    );
};

const Link = styled.a`
    font-size: 16px;
`;
// text-decoration: none;
// color: ${tokens.colors.interactive.primary__resting.hex};

const CommPkgWrapper = styled.div`
    display: flex;
    font-size: 16px;
    height: 16px;
    justify-content: space-between;
    align-items: center;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Spacer = styled.div`
    width: 5px;
`;
