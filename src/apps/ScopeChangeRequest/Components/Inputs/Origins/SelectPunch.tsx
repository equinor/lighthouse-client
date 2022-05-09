import { CircularProgress, Icon, Input } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { validatePunch } from '../../../api/PCS/validatePunch';

interface SelectPunchProps {
    setOriginId: (originId: string | undefined) => void;
    originId?: string;
}

export const SelectPunch = ({ setOriginId, originId }: SelectPunchProps): JSX.Element => {
    const [plNumber, setPlNumber] = useState<string | null>(null);

    return (
        <Inline>
            <Input
                placeholder={'Pl item no, 7 characters'}
                maxLength={7}
                defaultValue={originId}
                onChange={async (e) => {
                    setOriginId(undefined);

                    if (e.target.value.length === 7) {
                        setPlNumber(e.target.value);
                    } else {
                        setPlNumber(null);
                    }
                }}
            />
            <IconWrapper>
                {plNumber && <CheckPunchIcon plNumber={plNumber} setOriginId={setOriginId} />}
            </IconWrapper>
        </Inline>
    );
};

interface CheckPunchIconProps {
    plNumber: string;
    setOriginId: (originId: string | undefined) => void;
}
export function CheckPunchIcon({ plNumber, setOriginId }: CheckPunchIconProps): JSX.Element {
    const { data } = useQuery(
        ['punch', plNumber],
        ({ signal }) => validatePunch(plNumber, signal),
        {
            onSuccess: (isValid) => {
                if (isValid) {
                    setOriginId(plNumber);
                }
            },
        }
    );

    if (data === undefined) {
        return <CircularProgress value={0} size={24} />;
    }

    return (
        <>
            {data ? (
                <Icon name="check" color={tokens.colors.interactive.primary__resting.hex} />
            ) : (
                <Icon
                    name="close_circle_outlined"
                    color={tokens.colors.infographic.primary__energy_red_100.hex}
                />
            )}
        </>
    );
}

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
