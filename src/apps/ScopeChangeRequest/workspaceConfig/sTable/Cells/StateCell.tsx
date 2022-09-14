import { ScopeChangeRequest } from '../../../types/scopeChangeRequest';
import { StateCircle } from './cells.styles';
function getStateIcon(state: 'Draft' | 'Open' | 'Voided' | 'Closed') {
    switch (state) {
        case 'Closed': {
            return <StateCircle color="#4BB748" />;
        }

        case 'Open': {
            return <StateCircle color="#A8C8DE" />;
        }

        case 'Draft': {
            return <StateCircle color="#DCDCDC" />;
        }

        case 'Voided': {
            return <StateCircle color="#EB0000" />;
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
