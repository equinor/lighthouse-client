import { tokens } from '@equinor/eds-tokens';
import { ScopeChangeRequest } from '../../../types/scopeChangeRequest';
import { StateCircle } from './cells.styles';
function getStateIcon(state: 'Draft' | 'Open' | 'Voided' | 'Closed') {
    switch (state) {
        case 'Closed': {
            return <StateCircle color={tokens.colors.interactive.success__resting.hex} />;
        }

        case 'Open': {
            return <StateCircle color="#A8C8DE" />;
        }

        case 'Draft': {
            return <StateCircle color={tokens.colors.ui.background__medium.hex} />;
        }

        case 'Voided': {
            return <StateCircle color={tokens.colors.interactive.danger__resting.hex} />;
        }

        default: {
            return <StateCircle color="white" />;
        }
    }
}
type StateCellProps = {
    item: ScopeChangeRequest;
    value: any;
};
export function StateCell({ item, value }: StateCellProps) {
    return (
        <div style={{ display: 'flex', gap: '0.4em', alignItems: 'center' }}>
            <div>{getStateIcon(value)}</div>
            <div>{value}</div>
        </div>
    );
}
