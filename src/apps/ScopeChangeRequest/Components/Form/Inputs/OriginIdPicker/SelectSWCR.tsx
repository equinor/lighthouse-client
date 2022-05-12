import { CircularProgress, Icon, Input } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useCancellationToken } from '@equinor/hooks';
import { useHttpClient } from '@equinor/portal-client';
import { useState } from 'react';
import styled from 'styled-components';

interface SelectSWCRProps {
    setOriginId: (originId: string | undefined) => void;
    originId?: string;
}

export const SelectSWCR = ({ setOriginId, originId }: SelectSWCRProps): JSX.Element => {
    const [isValidSWCR, setIsValidSWCR] = useState<boolean>(false);
    const [isChecking, setIsChecking] = useState<boolean>();
    const [hasChecked, setHasChecked] = useState<boolean>();

    const { FAM } = useHttpClient();

    const { abort, getSignal } = useCancellationToken();

    async function validateSWCR(swcrNo: string) {
        setIsChecking(true);
        abort();

        const body = {
            andParameters: [
                {
                    columnName: 'SoftwareChangeRecordNo',
                    value: `${swcrNo}`,
                    operator: 'Equals',
                },
            ],
        };
        try {
            const res = await FAM.fetch(
                `v0.1/dynamic/completion/completionsoftwareChangeRecord/JCA `,
                {
                    method: 'POST',
                    signal: getSignal(),
                    body: JSON.stringify(body),
                }
            );

            if (!res.ok) {
                throw new Error('Invalid SWCR');
            }
            const data: { softwareChangeRecordNo: string }[] = await res.json();
            if (data.length > 0) {
                if (data[0].softwareChangeRecordNo === swcrNo) {
                    setIsValidSWCR(true);
                    setOriginId(swcrNo);
                }
            }
        } catch (e) {
            setIsValidSWCR(false);
        } finally {
            setHasChecked(true);
            setIsChecking(false);
        }
    }

    return (
        <Inline>
            <Input
                placeholder={'Enter SWCR number'}
                defaultValue={originId}
                onChange={async (e) => {
                    setIsValidSWCR(false);
                    setOriginId(undefined);
                    setIsChecking(false);
                    setHasChecked(false);
                    await validateSWCR(e.target.value);
                }}
            />
            <IconWrapper>
                {isChecking && <CircularProgress value={0} size={24} />}
                {hasChecked && isValidSWCR && (
                    <Icon name="check" color={tokens.colors.interactive.primary__resting.hex} />
                )}
                {hasChecked && !isValidSWCR && (
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
