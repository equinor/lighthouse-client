import styled from 'styled-components';
import { Section, SectionText } from '../../../Styles/Section';

interface FieldProps {
    label: string;
    value: string | number | symbol | JSX.Element | React.FC;
    customLabel?: labelConfig;
    customValue?: valueConfig;
}

interface labelConfig {
    bold?: boolean;
    fontSize?: string;
    faded?: boolean;
}

interface valueConfig {
    bold?: boolean;
    fontSize?: string;
    faded?: boolean;
}

export const Field = ({ label, value, customLabel, customValue }: FieldProps): JSX.Element => {
    return (
        <Section>
            <SectionText
                fontSize={customLabel?.fontSize}
                bold={customLabel?.bold}
                faded={customLabel?.faded}
            >
                {label}
            </SectionText>
            <SectionText
                fontSize={customValue?.fontSize ?? 'x-large'}
                bold={customValue?.bold}
                faded={customValue?.faded}
            >
                <Value>{value}</Value>
            </SectionText>
        </Section>
    );
};

const Value = styled.div`
    display: flex;
`;
