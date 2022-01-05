import styled from 'styled-components';
import { Section, SectionText } from '../Styles/Section';

interface FieldProps {
    label: string;
    value: string | number | symbol | JSX.Element | React.FC;
    customLabel?: labelConfig;
    customValue?: valueConfig;
}

interface labelConfig {
    bold?: boolean;
    fontSize?: 'x-large' | 'large' | 'xx-large' | 'x-small';
    faded?: boolean;
    meta: string;
}

interface valueConfig {
    bold?: boolean;
    fontSize?: 'x-large' | 'large' | 'xx-large' | 'x-small';
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
                <span>{label}</span>
                <MetaText>{customLabel?.meta}</MetaText>
            </SectionText>
            <SectionText
                fontSize={customValue?.fontSize ?? 'x-large'}
                bold={customValue?.bold}
                faded={customValue?.faded}
            >
                {value}
            </SectionText>
        </Section>
    );
};

const MetaText = styled.span`
    font-size: 0.7em;
`;
