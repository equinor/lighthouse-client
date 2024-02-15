import { Checkbox } from '@equinor/eds-core-react-old';
import styled from 'styled-components';
import { useScopeChangeContext } from '../../hooks/context/useScopeChangeContext';

export const AtsDetailCheckbox = (): JSX.Element => {
    const potentialAtsScope = useScopeChangeContext((s) => s.request.potentialAtsScope);

    return (
        <CheckboxWrapper>
            <Checkbox
                crossOrigin={undefined}
                readOnly={true}
                disabled
                checked={potentialAtsScope}
            />{' '}
            Potential ATS scope
        </CheckboxWrapper>
    );
};

export const CheckboxWrapper = styled.div`
    margin-left: -15px;
    font-size: 14px;
    line-height: 16px;
    text-align: left;
    display: flex;
    align-items: center;
`;
