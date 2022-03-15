import { CircularProgress, Icon, Input } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useState } from 'react';
import styled from 'styled-components';
import { useHttpClient } from '../../../../../Core/Client/Hooks/useApiClient';

interface SelectPunchProps {
    setOriginId: (originId: string | undefined) => void;
    originId?: string | null;
}

export const SelectPunch = ({ setOriginId, originId }: SelectPunchProps): JSX.Element => {
    const [isValidPunch, setIsValidPunch] = useState<boolean>(false);
    const [isChecking, setIsChecking] = useState<boolean>();
    const [hasChecked, setHasChecked] = useState<boolean>();

    const { procosys } = useHttpClient();

    async function validatePunch(plNumber) {
        setIsChecking(true);

        try {
            const res = await procosys.fetch(
                `api/PunchListItem?plantId=PCS%24JOHAN_CASTBERG&punchItemId=${plNumber}&api-version=4.1`
            );

            if (!res.ok) {
                throw new Error('Invalid punch');
            }
            setIsValidPunch(true);
            setOriginId(plNumber);
        } catch (e) {
            setIsValidPunch(false);
        }

        setHasChecked(true);
        setIsChecking(false);
    }

    return (
        <Inline>
            <Input
                placeholder={'Pl item no, 7 characters'}
                maxLength={7}
                defaultValue={originId ?? undefined}
                onChange={async (e) => {
                    setOriginId(undefined);
                    setIsChecking(false);
                    setHasChecked(false);
                    if (e.target.value.length === 7) {
                        await validatePunch(e.target.value);
                    }
                }}
            />
            <IconWrapper>
                {isChecking && <CircularProgress value={0} size={24} />}
                {hasChecked && isValidPunch && (
                    <Icon name="check" color={tokens.colors.interactive.primary__resting.hex} />
                )}
                {hasChecked && !isValidPunch && (
                    <Icon
                        name="close_circle_outlined"
                        color={tokens.colors.infographic.primary__energy_red_100.hex}
                    />
                )}
            </IconWrapper>
        </Inline>
    );
};

const IconWrapper = styled.div`
    width: 32px;
    height: 32px;
`;

const Inline = styled.div`
    display: flex;
    width: -webkit-fill-available;
    align-items: center;
    flex-direction: row;
`;
