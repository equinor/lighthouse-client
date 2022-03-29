import { Accordion } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { Icon, MarkdownViewer } from '@equinor/lighthouse-components';
import { FC } from 'react';
import { ContextErrorType, useErrorMessage } from '../../Hooks/useErrorMessage';
import {
    AccordionWrapper,
    ErrorWrapper,
    Heading,
    HeadingWrapper,
    RequirementsWrapper
} from './ReportErrorMessageStyles';

interface ReportErrorMessageProps {
    reportId: string;
    contextErrorType: ContextErrorType;
    message?: string;
}

const { Item, Header, Panel } = Accordion;

export const ReportErrorMessage: FC<ReportErrorMessageProps> = (props) => {
    const { errorHeader, description, requirements, noAccessMessage } = useErrorMessage(props);
    return (
        <ErrorWrapper>
            <HeadingWrapper>
                <Icon
                    name={'warning_outlined'}
                    color={tokens.colors.interactive.warning__resting.rgba}
                    size={48}
                />
                <Heading>{errorHeader}</Heading>
            </HeadingWrapper>
            <MarkdownViewer markdown={description || ''} />
            {noAccessMessage}

            <AccordionWrapper>
                <Item>
                    <Header>Access control description</Header>
                    <Panel>
                        <RequirementsWrapper>
                            <MarkdownViewer markdown={requirements || ''} />
                        </RequirementsWrapper>
                    </Panel>
                </Item>
            </AccordionWrapper>
        </ErrorWrapper>
    );
};
